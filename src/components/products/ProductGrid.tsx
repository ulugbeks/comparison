import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types';

interface ProductGridProps {
  products: Product[];
  onToggleFavorite?: (id: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onToggleFavorite }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
          price={product.price}
          oldPrice={product.oldPrice}
          currency={product.currency}
          vendorCount={product.vendorCount}
          rating={product.rating}
          reviewCount={product.reviewCount}
          category={product.category}
          isFavorite={product.isFavorite}
          priceChange={product.priceChange}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default ProductGrid;