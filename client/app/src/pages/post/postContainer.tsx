import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavigateFunction, useLocation } from 'react-router-dom';
import { postArticle } from '../../store/article';
import { rootState } from '../../store';
import { Editor } from '@toast-ui/editor';
import PostPresenter from './postPresenter';
import { getCategory } from '../../store/category';
import { EMAIL } from '../../env';
import queryString from 'query-string';
import { patchArticle } from '../../store/article';
import { useLoading } from '../../hooks';
import { Loading } from '../../components';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { useTheme } from '@emotion/react';

const useEditor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [ editor, setEditor ] = useState<any>(null);
  const theme = useTheme();

  useEffect(() => {
    const mql = window.matchMedia(theme.device.tablet);

    const html = new Editor({
      el: ref.current as HTMLElement,
      previewStyle: mql.matches ? 'vertical' : 'tab',
      height: '700px',
      initialValue: '',
      plugins: [[ codeSyntaxHighlight, { highlighter: Prism } ]]
    });

    setEditor(html);

    const changetViewStyle = (e: any) => {
      if (e.matches) {
        html.changePreviewStyle('vertical');
      } else {
        html.changePreviewStyle('tab');
      }
    };
    mql.addEventListener('change', changetViewStyle);

    return () => mql.removeEventListener('change', changetViewStyle);
  }, []);

  return { ref, editor };
}
const useInformation = (editor: any, article_id?: string) => {
  const dispatch = useDispatch();
  const { category, article } = useSelector((state: rootState) => state);
  const [ title, setTitle ] = useState<string>('');
  const [ categoryId, setCategoryId ] = useState<number>(-1);

  /*
    TODO: critical error, ????????? 2?????? dispatch??? ???????????? editor????????? ????????? ?????? ????????? ????????????.
    ?????????????????? 2?????? ???????????? ??????????????? 2?????? ?????? ?????????, ????????? ??????????????? ???????????? ???????????? ??????????????? ??????
  */
  useEffect(() => {
    dispatch(getCategory(EMAIL)); 
    // if (article_id) dispatch(getArticle(article_id));
  }, [ article_id ]);

  useEffect(() => {
    if (!editor) return;
    if (!article_id) return;
    if (!article.data) return;

    setCategoryId(article.data.article.category_id);
    setTitle(article.data.article.title);
    editor.setMarkdown(article.data.article.content);
  }, [ category.data ]) /* ?????? ???????????? ????????? ????????? */

  return {
    loading: category.loading && article.loading,
    title,
    setTitle,
    category,
    categoryId,
    setCategoryId,
  };
};
const useAutosave = (
  title: string,
  categoryId: number,
  setTitle: Function,
  setCategoryId: Function,
  editor: any,
  article_id?: string
) => {
  const callback = useRef<Function|null>(null);

  useEffect(() => {
    callback.current = () => {
      const str = JSON.stringify({
        title,
        categoryId,
        content: editor.getMarkdown(),
      });

      window.localStorage.setItem(`blog_post_temp_save`, str);
    };
  }, [ title, categoryId, editor ]);

  useEffect(() => {
    if (!editor) return;
    if (article_id) return;
    
    const saved = window.localStorage.getItem('blog_post_temp_save');
    if (saved && saved !== '') {
      alert('?????? ?????? ????????? ???????????????');
      const { title, categoryId, content } = JSON.parse(saved);
      setTitle(title);
      setCategoryId(categoryId);
      editor.setMarkdown(content);
    };

    const tick = () => {
      if (callback?.current) callback.current()
    }
    let id = setInterval(tick, 60 * 1000);
    return () => clearInterval(id);
  }, [ editor ]);
};

const useSubmit = (navigate: NavigateFunction, title: string, category_id: number, article_id?: string) => {
  const { data } = useSelector((state: rootState) => state.auth);
  const { loading } = useLoading('postarticle');
  const dispatch = useDispatch();
  const changefile = (md: string) => {
    const file = new Blob([md], { type: 'text/plain' });
    return file;
  }
  const postfile = async (md: string, category_id: number, article_id?: string) => {
    if (!data) {
      alert('???????????????????????????. ??? ???????????? ???????????????');
      navigate('/login');
    }
    const file = changefile(md);
    const formData = new FormData();
    formData.append('file', file, title);

    if (article_id) {
      dispatch(patchArticle(
        article_id, category_id, data.access_token, EMAIL, formData,
        loading
      ));
    } else {
      dispatch(postArticle(data.access_token, EMAIL, category_id, formData, loading))
    }
  }
  const submit = (editor: any) => {
    postfile(editor.getMarkdown(), category_id, article_id);
  }

  return { submit };
};

const PostContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const article_id = queryString.parse(location.search).article_id as string;
  const { editor, ref } = useEditor();
  const { loading, title, category, setTitle, categoryId, setCategoryId } = useInformation(editor, article_id);;
  useAutosave(title, categoryId, setTitle, setCategoryId, editor, article_id);
  const { submit } = useSubmit(navigate, title, categoryId, article_id);

  const openModal = () => {
    navigate('/modal/category?type=post', { state: { backgroundLocation: location }});
  }

  if (loading) return <Loading />
  return ( 
    <PostPresenter
      ref={ref} submit={(e: React.MouseEvent) => {
        submit(editor);
      }}
      title={title} setTitle={setTitle}
      categories={category.data ? category.data.categories : []}
      categoryId={categoryId} setCategoryId={setCategoryId}
      openModal={openModal}
    />
  );
};

export default PostContainer;