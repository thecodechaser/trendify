import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, User, Search, X } from 'lucide-react';
import { useDebounce } from 'use-debounce';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onLoginClick: () => void;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onSearch: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onLoginClick,
  onCartClick,
  onWishlistClick,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedValue] = useDebounce(searchQuery, 300);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">ModernShop</h1>
          </div>
          <div className="flex-1 max-w-xl px-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-2.5 p-0.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onWishlistClick}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={onLoginClick}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};