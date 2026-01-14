import React, { useState } from 'react';
import { HiChartPie, HiShoppingBag, HiTable, HiLogout, HiViewBoards, HiMenu } from 'react-icons/hi';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLayout() {
  const { logout } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItemClass = (path) => 
    `flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100 group ${location.pathname === path ? 'bg-gray-100 font-semibold' : ''}`;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 fixed h-full z-10 border-r border-gray-200 bg-white" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-white flex flex-col justify-between">
          <div>
            <Link to="/admin" className="flex items-center ps-2.5 mb-5">
              <img src="/vite.svg" className="h-8 me-4 sm:h-9" alt="Salon Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap">Admin Panel</span>
            </Link>
            <ul className="space-y-2 font-medium">
              <li>
                <Link to="/admin" className={navItemClass('/admin')}>
                  <HiChartPie className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/bookings" className={navItemClass('/admin/bookings')}>
                  <HiViewBoards className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                  <span className="ms-3">Bookings</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/menu" className={navItemClass('/admin/menu')}>
                  <HiTable className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                  <span className="ms-3">Menu Management</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/content" className={navItemClass('/admin/content')}>
                  <HiMenu className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                  <span className="ms-3">Page Content</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 font-medium border-t pt-4 border-gray-200">
               <li>
                <button onClick={handleLogout} className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-red-50 group w-full text-left">
                  <HiLogout className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-red-600" />
                  <span className="ms-3 group-hover:text-red-600">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      
      {/* Mobile Header & Content */}
      <div className="md:ml-64 w-full flex flex-col min-h-screen">
        <div className="md:hidden flex justify-between items-center bg-white p-4 border-b border-gray-200 sticky top-0 z-20">
             <div className="flex items-center gap-4">
                 <img src="/vite.svg" className="h-6" alt="Logo" />
                 <span className="font-bold">Admin Panel</span>
             </div>
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600 rounded-lg hover:bg-gray-100">
                <HiMenu className="w-6 h-6" />
             </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-b border-gray-200 shadow-lg absolute top-16 left-0 w-full z-20 p-4">
                <ul className="space-y-2">
                    <li><Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 hover:bg-gray-50 rounded">Dashboard</Link></li>
                    <li><Link to="/admin/bookings" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 hover:bg-gray-50 rounded">Bookings</Link></li>
                    <li><Link to="/admin/menu" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 hover:bg-gray-50 rounded">Menu Management</Link></li>
                    <li><button onClick={handleLogout} className="block w-full text-left p-2 text-red-600 hover:bg-red-50 rounded">Logout</button></li>
                </ul>
            </div>
        )}

        <div className="p-6 flex-grow">
             <Outlet />
        </div>
      </div>
    </div>
  );
}
