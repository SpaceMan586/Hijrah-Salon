import React from 'react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { HiScissors, HiSparkles, HiColorSwatch, HiEye, HiHand, HiPlus } from 'react-icons/hi';
import { RiMentalHealthLine } from 'react-icons/ri';

export default function MenuSalon() {
  const { addToCart } = useCart();
  const { menu: menuCategories } = useAdmin();
  
  const getIcon = (type) => {
    switch(type) {
      case 'hair': return <HiScissors className="w-6 h-6" />;
      case 'sparkle': return <HiSparkles className="w-6 h-6" />;
      case 'color': return <HiColorSwatch className="w-6 h-6" />;
      case 'face': return <RiMentalHealthLine className="w-6 h-6" />;
      case 'eye': return <HiEye className="w-6 h-6" />;
      case 'hand': return <HiHand className="w-6 h-6" />;
      default: return <HiSparkles className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-20 min-h-screen bg-pink-50/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Pacifico', cursive" }}>Menu & Pricelist</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Klik tombol (+) untuk menambahkan layanan ke keranjang.</p>
          <div className="h-1 w-20 bg-pink-500 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-100 flex flex-col">
              <div className="bg-pink-500 p-4 flex items-center justify-center">
                 <div className="bg-white/20 p-2 rounded-full text-white mr-3">
                    {getIcon(category.icon)}
                 </div>
                 <h3 className="text-xl font-bold text-white tracking-wide">{category.title}</h3>
              </div>
              
              <div className="p-6 flex-grow">
                {(() => {
                  const sortedItems = [...category.items].sort((a, b) => {
                    const aAvail = a.available !== false ? 1 : 0;
                    const bAvail = b.available !== false ? 1 : 0;
                    return bAvail - aAvail;
                  });

                  return (
                    <>
                      {/* Check if category has multiple price columns */}
                      {category.columnHeaders ? (
                        <div className="w-full">
                          <div className="flex justify-end mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider pr-8">
                             {category.columnHeaders.map((header, hIdx) => (
                               <span key={hIdx} className="w-14 text-center ml-1">{header}</span>
                             ))}
                          </div>
                          <ul className="space-y-4">
                            {sortedItems.map((item, idx) => {
                              const isAvailable = item.available !== false;
                              return (
                              <li key={idx} className={`flex justify-between items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0 rounded px-2 transition-colors ${!isAvailable ? 'opacity-50 grayscale' : 'hover:bg-pink-50/50'}`}>
                                <span className="text-gray-700 font-medium flex-grow text-sm">
                                    {item.name}
                                    {!isAvailable && <span className="ml-2 text-[10px] text-red-500 font-bold border border-red-500 rounded px-1">HABIS</span>}
                                </span>
                                <div className="flex items-center">
                                  {item.prices ? (
                                    item.prices.map((p, pIdx) => {
                                      const variantName = category.columnHeaders[pIdx];
                                      // Disable button if price is "-" or item unavailable
                                      const isDisabled = p === "-" || p === "" || !isAvailable;
                                      return (
                                        <button
                                          key={pIdx}
                                          disabled={isDisabled}
                                          onClick={() => !isDisabled && addToCart(item, variantName, p)}
                                          className={`w-14 text-center ml-1 text-xs font-bold py-1 rounded transition-colors shadow-sm border ${
                                            isDisabled 
                                              ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed' 
                                              : 'bg-white border-pink-200 text-pink-600 hover:bg-pink-500 hover:text-white hover:border-pink-500 cursor-pointer'
                                          }`}
                                        >
                                          {p}
                                        </button>
                                      );
                                    })
                                  ) : (
                                    // Single price in multi-col category
                                    <div className="flex items-center ml-2">
                                      <span className="text-pink-600 font-bold text-sm mr-2">{item.price}</span>
                                      <button 
                                        disabled={!isAvailable}
                                        onClick={() => isAvailable && addToCart(item)}
                                        className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 shadow-sm border ${
                                          !isAvailable 
                                            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                                            : 'bg-white border-pink-200 hover:bg-pink-500 text-pink-500 hover:text-white hover:border-pink-500'
                                        }`}
                                      >
                                        <HiPlus size={12} />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </li>
                            )})}
                          </ul>
                        </div>
                      ) : (
                        <ul className="space-y-4">
                          {sortedItems.map((item, idx) => {
                            const isAvailable = item.available !== false;
                            return (
                            <li key={idx} className={`flex justify-between items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0 rounded px-2 transition-colors ${!isAvailable ? 'opacity-50 grayscale' : 'hover:bg-pink-50/50'}`}>
                              <span className="text-gray-700 font-medium text-sm flex-grow">
                                  {item.name}
                                  {!isAvailable && <span className="ml-2 text-[10px] text-red-500 font-bold border border-red-500 rounded px-1">HABIS</span>}
                              </span>
                              <div className="flex items-center ml-2 flex-shrink-0">
                                  <span className="text-pink-600 font-bold text-sm whitespace-nowrap mr-3">{item.price}</span>
                                  <button 
                                      disabled={!isAvailable}
                                      onClick={() => isAvailable && addToCart(item)}
                                      className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 shadow-sm border ${
                                          !isAvailable 
                                          ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                                          : 'bg-white border-pink-200 text-pink-600 hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:shadow-md'
                                      }`}
                                  >
                                      <HiPlus />
                                  </button>
                              </div>
                            </li>
                          )})}
                        </ul>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
