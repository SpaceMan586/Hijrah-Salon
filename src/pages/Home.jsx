import React from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { HiSparkles, HiScissors, HiUserGroup } from 'react-icons/hi';

export default function Home() {
  const { siteContent } = useAdmin();
  const { home } = siteContent;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="mb-6 text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg" style={{ fontFamily: "'Pacifico', cursive", lineHeight: '1.3' }}>
            {home.heroTitle}
          </h1>
          <p className="mb-8 text-xl md:text-2xl font-light text-gray-100 drop-shadow-md">
            {home.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
                <Button size="xl" gradientDuoTone="pinkToOrange" className="border-2 border-white shadow-xl hover:scale-105 transition-transform duration-300">
                Book Appointment
                </Button>
            </Link>
            <Link to="/menu">
                <Button size="xl" color="light" className="bg-white/90 hover:bg-white text-gray-800 border-2 border-pink-500 shadow-xl hover:scale-105 transition-transform duration-300">
                View Pricelist
                </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome / Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{home.welcomeTitle}</h2>
                <div className="h-1 w-20 bg-pink-500 mx-auto mb-8"></div>
                <p className="text-gray-600 leading-relaxed text-lg">
                    {home.welcomeText}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {home.features.map((feature, idx) => (
                    <div key={idx} className="text-center p-8 rounded-2xl bg-pink-50 hover:bg-pink-100 transition-colors duration-300">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500 shadow-md">
                            {idx === 0 && <HiSparkles size={32} />}
                            {idx === 1 && <HiScissors size={32} />}
                            {idx === 2 && <HiUserGroup size={32} />}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                        <p className="text-gray-600">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
