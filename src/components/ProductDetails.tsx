import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
  isWishlisted: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  isWishlisted,
  onClose,
  onAddToCart,
  onToggleWishlist,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 pt-0">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-3xl font-bold text-gray-900 mb-4">${product.price}</p>
              <div className="space-y-4">
                <button
                  onClick={onAddToCart}
                  className="w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={onToggleWishlist}
                  className={`w-full py-3 px-4 rounded-lg border-2 transition-colors ${
                    isWishlisted
                      ? 'border-red-500 text-red-500 hover:bg-red-50'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>High-quality materials</li>
                  <li>Carefully crafted design</li>
                  <li>Perfect for modern lifestyle</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Shipping Information</h3>
                <p className="text-gray-600">
                  Free shipping on orders over $50. Estimated delivery: 3-5 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};