import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { HiShoppingBag } from 'react-icons/hi';

export default function MyNavbar() {
  const path = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();

  const navLinkClass = (isActive) => 
    `block py-2 pr-4 pl-3 rounded md:p-0 transition-all duration-300 ${isActive ? 'text-pink-700 font-bold scale-105' : 'text-gray-700 hover:text-pink-600 hover:scale-105'}`;

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-pink-100 px-2 sm:px-4 py-2.5 w-full transition-all duration-500">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex flex-col group">
          <span className="text-2xl font-bold text-pink-600 transition-transform duration-300 group-hover:scale-105" style={{ fontFamily: "'Pacifico', cursive", lineHeight: '1.2' }}>
            Hijrah Salon
          </span>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-1 font-medium">
            Perawatan Khusus Wanita
          </span>
        </Link>
        <div className="flex md:order-2 items-center gap-2">
          {/* Cart Button */}
          <button 
            onClick={toggleCart}
            className="relative p-2 text-gray-600 hover:text-pink-600 transition-colors mr-2"
          >
            <HiShoppingBag className="w-7 h-7" />
            {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-pink-600 rounded-full">
                    {cartCount}
                </span>
            )}
          </button>

          <Link to="/booking" className="hidden md:block">
              <Button color="pink" className="bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105">
              Book Appointment
              </Button>
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            type="button" 
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} justify-between items-center w-full md:flex md:w-auto md:order-1`}>
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link to="/" className={navLinkClass(path === '/')}>Home</Link>
            </li>
            <li>
              <Link to="/menu" className={navLinkClass(path === '/menu')}>Pricelist</Link>
            </li>
            <li>
              <Link to="/gallery" className={navLinkClass(path === '/gallery')}>Gallery</Link>
            </li>
            <li>
              <Link to="/procedure" className={navLinkClass(path === '/procedure')}>Procedure</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
