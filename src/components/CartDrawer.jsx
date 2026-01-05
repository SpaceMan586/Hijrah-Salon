import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatIDR } from '../utils/currency';
import { HiX, HiTrash, HiPlus, HiMinus } from 'react-icons/hi';
import { BsWhatsapp } from 'react-icons/bs';

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQty, cartTotal, clearCart } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    toggleCart();
    navigate('/booking');
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={toggleCart}
      ></div>

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-pink-50">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <span className="mr-2">🛍️</span> Keranjang Belanja
          </h2>
          <button onClick={toggleCart} className="p-2 hover:bg-pink-200 rounded-full transition-colors text-gray-600">
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p className="text-lg">Keranjang masih kosong.</p>
              <p className="text-sm">Yuk pilih perawatan favoritmu!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 border border-gray-100 rounded-lg bg-white shadow-sm">
                 {/* Placeholder Image (optional) */}
                 <div className="w-16 h-16 bg-pink-100 rounded-md flex items-center justify-center text-2xl flex-shrink-0">
                    💇‍♀️
                 </div>
                 
                 <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                    {item.variant && (
                        <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full mb-1 inline-block">
                            {item.variant}
                        </span>
                    )}
                    <div className="text-pink-600 font-bold text-sm">{formatIDR(item.price)}</div>
                 </div>

                 <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                        <HiTrash />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1">
                        <button onClick={() => updateQty(item.id, -1)} className="text-gray-600 hover:text-pink-600 text-xs p-1">
                            <HiMinus />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="text-gray-600 hover:text-pink-600 text-xs p-1">
                            <HiPlus />
                        </button>
                    </div>
                 </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Total Estimasi</span>
                <span className="text-2xl font-bold text-pink-600">{formatIDR(cartTotal)}</span>
            </div>
            <button 
                onClick={handleCheckout}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
                <span>📅</span>
                Lanjut ke Booking
            </button>
            <button onClick={clearCart} className="w-full mt-2 text-xs text-gray-400 hover:text-red-500 underline text-center">
                Kosongkan Keranjang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
