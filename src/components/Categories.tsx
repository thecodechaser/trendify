import React from 'react';
import { categories } from '../data/products';

interface CategoriesProps {
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

export const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-6 py-2 rounded-full transition-colors ${
            selectedCategory === null
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedCategory === category.id
                ? `${category.color} text-white`
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};