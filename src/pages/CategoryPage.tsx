import React from 'react';
import { useParams } from 'react-router-dom';
import SearchResultsPage from './SearchResultsPage';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  return <SearchResultsPage />;
};

export default CategoryPage;