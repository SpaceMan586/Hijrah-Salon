import React from 'react';
import { Link } from 'react-router-dom';

export default function MyFooter() {
  return (
    <footer className="bg-white/80 border-t border-pink-100 mt-auto">
      <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex flex-col mb-4 sm:mb-0">
            <span className="text-xl font-bold text-pink-600" style={{ fontFamily: "'Pacifico', cursive", lineHeight: '1.2' }}>
              Hijrah Salon
            </span>
            <span className="text-[8px] uppercase tracking-widest text-gray-500 mt-1 font-medium">
              Perawatan Khusus Wanita
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">About</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-pink-100 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 text-center">
          © 2026 <Link to="/" className="hover:underline">Luxe Beauty™</Link>. All Rights Reserved.
          <br />
          <span className="text-gray-400 text-xs">123 Beauty Lane, Glamour City, GC 45678</span>
        </span>
      </div>
    </footer>
  );
}