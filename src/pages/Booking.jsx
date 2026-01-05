import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';
import { formatIDR } from '../utils/currency';
import { Button } from 'flowbite-react';
import { HiCheckCircle, HiX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
  const { addBooking } = useAdmin();
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });

  useEffect(() => {
    if (cart.length > 0) {
        setFormData(prev => ({ ...prev, service: `Custom Package (${cart.length} Items)` }));
    }
  }, [cart]);

  const inputClass = "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5";
  const labelClass = "block mb-2 text-sm font-medium text-gray-900";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let finalMessage = formData.message;
    if (cart.length > 0) {
        const cartDetails = cart.map((item, idx) => 
            `${idx + 1}. ${item.name} ${item.variant ? `(${item.variant})` : ''} - ${item.qty}x`
        ).join('\n');
        
        finalMessage = `--- ORDER FROM CART ---\n${cartDetails}\nTotal: ${formatIDR(cartTotal)}\n\n--- USER MESSAGE ---\n${formData.message}`;
    }

    const success = await addBooking({
        ...formData,
        message: finalMessage,
        time: '09:00' 
    });
    
    if (success) {
        if (cart.length > 0) clearCart();
        setShowSuccess(true);
    } else {
        alert("Gagal mengirim booking. Silakan cek koneksi atau hubungi admin.");
    }
  };

  const handleClose = () => {
      setShowSuccess(false);
      navigate('/');
  };

  return (
    <section className="py-20 flex items-center justify-center min-h-screen">
       <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-pink-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Book Your Appointment</h2>
            <p className="text-gray-500 mt-2">Fill out the form below and we will confirm your slot.</p>
          </div>
          
          {cart.length > 0 && (
            <div className="mb-8 p-4 bg-pink-50 rounded-xl border border-pink-100">
                <h3 className="font-bold text-pink-600 mb-2 flex items-center gap-2">
                    🛍️ Selected Treatments
                </h3>
                <ul className="space-y-2 mb-3 text-sm text-gray-700">
                    {cart.map((item, idx) => (
                        <li key={idx} className="flex justify-between border-b border-pink-100 pb-1 last:border-0">
                            <span>{item.qty}x {item.name} <small className="text-gray-500">{item.variant}</small></span>
                            <span className="font-medium">{formatIDR(item.price * item.qty)}</span>
                        </li>
                    ))}
                </ul>
                <div className="text-right font-bold text-gray-900 pt-2 border-t border-pink-200">
                    Total: {formatIDR(cartTotal)}
                </div>
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="name" className={labelClass}>Your Name</label>
                    <input id="name" type="text" className={inputClass} placeholder="Jane Doe" required value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email" className={labelClass}>Your Email</label>
                    <input id="email" type="email" className={inputClass} placeholder="name@example.com" required value={formData.email} onChange={handleChange} />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                     <label htmlFor="phone" className={labelClass}>Phone Number</label>
                    <input id="phone" type="tel" className={inputClass} placeholder="+1 234 567 890" required value={formData.phone} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="service" className={labelClass}>Select Service</label>
                    {cart.length > 0 ? (
                        <input 
                            id="service" 
                            type="text" 
                            className={`${inputClass} bg-gray-100 text-gray-500 cursor-not-allowed`} 
                            value={formData.service} 
                            readOnly 
                        />
                    ) : (
                        <select id="service" className={inputClass} required value={formData.service} onChange={handleChange}>
                            <option value="">Select a service...</option>
                            <option value="Hair Styling">Hair Styling</option>
                            <option value="Hair Coloring">Hair Coloring</option>
                            <option value="Facial Treatment">Facial Treatment</option>
                            <option value="Manicure/Pedicure">Manicure/Pedicure</option>
                            <option value="Bridal Makeup">Bridal Makeup</option>
                        </select>
                    )}
                </div>
            </div>

            <div>
                 <label htmlFor="date" className={labelClass}>Preferred Date</label>
                <input id="date" type="date" className={inputClass} required value={formData.date} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="message" className={labelClass}>Special Requests (Optional)</label>
                <textarea id="message" className={inputClass} placeholder="Any allergies or specific preferences..." rows={4} value={formData.message} onChange={handleChange} />
            </div>

            <div className="flex items-center gap-2">
                <input id="agree" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-pink-300" required />
                <label htmlFor="agree" className="ml-2 text-sm font-medium text-gray-900">
                I agree with the&nbsp;
                <a href="#" className="text-pink-600 hover:underline">
                    terms and conditions
                </a>
                </label>
            </div>
            
            <button type="submit" className="w-full mt-4 px-5 py-2.5 text-sm font-bold text-pink-600 bg-white border border-pink-500 rounded-lg shadow-md hover:bg-pink-500 hover:text-white hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                Confirm Booking
            </button>
          </form>
       </div>

       {/* Custom Success Modal */}
       {showSuccess && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <button onClick={handleClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-900">
                    <HiX className="w-6 h-6" />
                </button>
                <div className="text-center">
                    <HiCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-400" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500">
                    Booking Submitted Successfully!
                    </h3>
                    <p className="mb-5 text-sm text-gray-500">
                        We will contact you shortly to confirm your appointment time.
                    </p>
                    <div className="flex justify-center">
                        <Button color="success" onClick={handleClose}>
                            Back to Home
                        </Button>
                    </div>
                </div>
            </div>
         </div>
       )}
    </section>
  );
}