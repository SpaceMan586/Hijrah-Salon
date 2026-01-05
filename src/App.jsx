import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import MyFooter from './components/MyFooter';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import MenuSalon from './pages/MenuSalon';
import Procedure from './pages/Procedure';
import Booking from './pages/Booking';
import ErrorBoundary from './components/ErrorBoundary';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import { AdminProvider } from './context/AdminContext';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageBookings from './pages/admin/ManageBookings';
import ManageMenu from './pages/admin/ManageMenu';
import ManageContent from './pages/admin/ManageContent';

const PublicLayout = () => (
  <div className="min-h-screen flex flex-col relative">
    <MyNavbar />
    <CartDrawer />
    <main className="flex-grow">
      <Outlet />
    </main>
    <MyFooter />
  </div>
);

function App() {
  console.log("App is rendering");
  return (
    <ErrorBoundary>
      <AdminProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin">
                <Route path="login" element={<Login />} />
                <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                  <Route index element={<Dashboard />} />
                  <Route path="bookings" element={<ManageBookings />} />
                  <Route path="menu" element={<ManageMenu />} />
                  <Route path="content" element={<ManageContent />} />
                </Route>
              </Route>

              {/* Public Routes */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="menu" element={<MenuSalon />} />
                <Route path="procedure" element={<Procedure />} />
                <Route path="booking" element={<Booking />} />
                <Route path="*" element={<div className="text-center py-20"><h1>404 - Page Not Found</h1></div>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AdminProvider>
    </ErrorBoundary>
  );
}

export default App;