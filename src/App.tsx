import React, { useState, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Wishlist } from './components/Wishlist';
import { AuthModal } from './components/AuthModal';
import { Categories } from './components/Categories';
import { Footer } from './components/Footer';
import { ProductDetails } from './components/ProductDetails';
import { products } from './data/products';
import { CartItem, Product } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success('Added to cart');
  }, []);

  const handleUpdateCartQuantity = useCallback((id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      toast.success('Removed from cart');
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  }, []);

  const handleRemoveFromCart = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Removed from cart');
  }, []);

  const handleToggleWishlist = useCallback((product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        toast.success('Removed from wishlist');
        return prev.filter((item) => item.id !== product.id);
      }
      toast.success('Added to wishlist');
      return [...prev, product];
    });
  }, []);

  const handleCheckout = useCallback(() => {
    toast.success('Order placed successfully!');
    setCartItems([]);
    setShowCart(false);
  }, []);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
    setShowAuth(false);
    toast.success('Logged in successfully!');
  }, []);

  const handleSignup = useCallback(() => {
    setIsLoggedIn(true);
    setShowAuth(false);
    toast.success('Account created successfully!');
  }, []);

  const handleRemoveFromWishlist = useCallback((id: number) => {
    const item = wishlistItems.find((item) => item.id === id);
    if (item) {
      handleToggleWishlist(item);
    }
  }, [wishlistItems, handleToggleWishlist]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesCategory = selectedCategory
        ? product.categoryId === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Navbar
        cartCount={cartItems.length}
        wishlistCount={wishlistItems.length}
        onLoginClick={() => setShowAuth(true)}
        onCartClick={() => setShowCart(true)}
        onWishlistClick={() => setShowWishlist(true)}
        onSearch={handleSearch}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistItems.some((item) => item.id === product.id)}
                onAddToCart={() => handleAddToCart(product)}
                onToggleWishlist={() => handleToggleWishlist(product)}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {showCart && (
        <Cart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}

      {showWishlist && (
        <Wishlist
          items={wishlistItems}
          onClose={() => setShowWishlist(false)}
          onRemoveItem={handleRemoveFromWishlist}
          onAddToCart={handleAddToCart}
        />
      )}

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      )}

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          isWishlisted={wishlistItems.some((item) => item.id === selectedProduct.id)}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => handleAddToCart(selectedProduct)}
          onToggleWishlist={() => handleToggleWishlist(selectedProduct)}
        />
      )}
    </div>
  );
}

export default App;