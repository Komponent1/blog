import React from 'react';
import { getArticlePropsFromLocal } from '../../srcs/article/article.props';
import ArticlesPage from '../../srcs/article/article.page';
import { Article } from '../../srcs/article/dto/article';

type Props = {
  articles: Article[];
};
const Articles: React.FC<Props> = ({articles}) => (
  <ArticlesPage articles={articles} />
);

export default Articles;

export async function getServerSideProps() {
  return getArticlePropsFromLocal();
}
