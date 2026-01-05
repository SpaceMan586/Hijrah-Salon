import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { menuCategories as initialMenuData } from '../data/menuData';
import { initialSiteContent } from '../data/siteContent';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuth') === 'true';
  });

  const [bookings, setBookings] = useState([]);
  const [menu, setMenu] = useState([]);
  const [siteContent, setSiteContent] = useState(initialSiteContent);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;
      
      // Map DB columns to app state
      const formattedBookings = (bookingsData || []).map(b => ({
          ...b,
          date: b.booking_date || b.date, // Handle both just in case
      }));
      setBookings(formattedBookings);

      // 2. Fetch Menu
      const { data: menuData } = await supabase
        .from('menu_store')
        .select('data')
        .eq('id', 1)
        .single();

      if (menuData) setMenu(menuData.data);
      else setMenu(initialMenuData);

      // 3. Fetch Site Content
      const { data: contentData } = await supabase
        .from('content_store')
        .select('data')
        .eq('id', 1)
        .single();

      if (contentData) setSiteContent(contentData.data);
      else setSiteContent(initialSiteContent);

    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
        // Try real Supabase Auth first
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });

        if (!error && data.user) {
            setIsAuthenticated(true);
            localStorage.setItem('adminAuth', 'true');
            return true;
        }

        // Fallback: Simple client-side check (Won't verify DB permissions)
        if (username === 'admin' && password === 'admin123') {
            console.warn("Using insecure client-side admin login. Database updates may fail if RLS is enabled.");
            setIsAuthenticated(true);
            localStorage.setItem('adminAuth', 'true');
            return true;
        }
    } catch (err) {
        console.error("Login error:", err);
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  const updateBookingStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    } catch (err) {
      console.error("Error updating booking", err);
    }
  };

  const updateBookingDetails = async (id, updates) => {
    try {
      // Map updates to DB columns
      const dbUpdates = { ...updates };
      if (dbUpdates.date) {
          dbUpdates.booking_date = dbUpdates.date;
          delete dbUpdates.date;
      }

      const { error } = await supabase
        .from('bookings')
        .update(dbUpdates)
        .eq('id', id);

      if (error) throw error;

      setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
      return true;
    } catch (err) {
      console.error("Error updating booking details", err);
      return false;
    }
  };

  const deleteBooking = async (id) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error("Error deleting booking", err);
    }
  };

  const addBooking = async (newBooking) => {
    try {
      // Remove local-only or undefined fields before sending to DB if necessary
      const bookingPayload = {
        name: newBooking.name,
        email: newBooking.email,
        phone: newBooking.phone,
        service: newBooking.service,
        booking_date: newBooking.date, // Mapped to DB column
        time: newBooking.time || '09:00', // Assuming DB column is 'time' or we might need to check this too
        message: newBooking.message || '',
        status: 'Pending'
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingPayload])
        .select()
        .single();

      if (error) throw error;

      setBookings(prev => [data, ...prev]);
      return true;
    } catch (err) {
      console.error("Error creating booking", err);
      alert(`Gagal membuat booking: ${err.message || "Error tidak diketahui"}`);
      return false;
    }
  };

  const updateMenu = async (newMenu) => {
    // Optimistic update
    const previousMenu = menu;
    setMenu(newMenu);

    try {
      const { error } = await supabase
        .from('menu_store')
        .upsert({ id: 1, data: newMenu });

      if (error) throw error;
      // No need to setMenu here as it's already set
    } catch (err) {
      console.error("Error updating menu", err);
      setMenu(previousMenu); // Revert on error
      alert(`Failed to update menu: ${err.message || "Unknown error"}. Check console for details.`);
    }
  };

  const updateSiteContent = async (newContent) => {
    try {
      const { error } = await supabase
        .from('content_store')
        .upsert({ id: 1, data: newContent });

      if (error) throw error;
      setSiteContent(newContent);
    } catch (err) {
      console.error("Error updating site content", err);
    }
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      bookings,
      updateBookingStatus,
      updateBookingDetails,
      deleteBooking,
      addBooking,
      menu,
      updateMenu,
      siteContent,
      updateSiteContent,
      loading
    }}>
      {children}
    </AdminContext.Provider>
  );
};
