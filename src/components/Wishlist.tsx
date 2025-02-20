import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../types';

interface WishlistProps {
  items: Product[];
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

export const Wishlist: React.FC<WishlistProps> = ({
  items,
  onClose,
  onRemoveItem,
  onAddToCart,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Wishlist</h2>
          <button onClick={onClose} className="p-2">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 flex flex-col h-[calc(100vh-100px)] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Your wishlist is empty</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 py-4 border-b"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="mt-2 px-4 py-1 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-gray-500 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};