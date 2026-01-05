import React from 'react';
import { useAdmin } from '../context/AdminContext';

export default function Gallery() {
  const { siteContent } = useAdmin();
  const { gallery } = siteContent;

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Pacifico', cursive" }}>
              {gallery.title}
          </h1>
          <p className="text-gray-600">{gallery.subtitle}</p>
          <div className="h-1 w-20 bg-pink-500 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.images.map((imgSrc, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg aspect-square">
              <img 
                src={imgSrc} 
                alt={`Gallery ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <span className="text-white font-bold text-lg tracking-wider border border-white px-4 py-2 rounded">
                    HIJRAH SALON
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}