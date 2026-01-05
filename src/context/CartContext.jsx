import React, { createContext, useState, useContext, useEffect } from 'react';
import { parsePrice } from '../utils/currency';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('hijrahCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hijrahCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, variant = null, specificPrice = null) => {
    setCart((prevCart) => {
      // Create a unique ID for the item based on name and variant
      const itemId = variant ? `${item.name}-${variant}` : item.name;
      
      const existingItem = prevCart.find((i) => i.id === itemId);

      if (existingItem) {
        return prevCart.map((i) =>
          i.id === itemId ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        // Determine price
        let finalPrice = 0;
        if (specificPrice) {
            finalPrice = parsePrice(specificPrice);
        } else {
            finalPrice = parsePrice(item.price);
        }

        return [...prevCart, {
          id: itemId,
          name: item.name,
          variant: variant, // e.g., "Short", "Med", "Long" or null
          price: finalPrice,
          originalPriceStr: specificPrice || item.price,
          qty: 1
        }];
      }
    });
    setIsCartOpen(true); // Auto open cart when adding
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== itemId));
  };

  const updateQty = (itemId, delta) => {
    setCart((prevCart) => {
      return prevCart.map((i) => {
        if (i.id === itemId) {
          const newQty = i.qty + delta;
          return newQty > 0 ? { ...i, qty: newQty } : i;
        }
        return i;
      });
    });
  };

  const clearCart = () => setCart([]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQty, 
      clearCart, 
      cartTotal, 
      cartCount,
      isCartOpen,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
