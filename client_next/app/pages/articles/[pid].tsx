import React from 'react';
import { getArticleProps, getArticlesListPath } from '../../legacy/articles/articles.pid.local..props';
import ArticlesPidPage from '../../srcs/articles/articles.pid.page';
import { Article } from '../../srcs/articles/dto/article';

type Props = {
  article: Article;
  content: string;
};
const ArticlesPid: React.FC<Props> = ({article, content}) => (
  <ArticlesPidPage article={article} content={content} />
);

export function getStaticPaths() {
  return getArticlesListPath();
}
export async function getStaticProps({params}: {params: {pid: string}}) {
  const {pid} = params;
  const props = await getArticleProps({pid});
  return props;
}

export default ArticlesPid;