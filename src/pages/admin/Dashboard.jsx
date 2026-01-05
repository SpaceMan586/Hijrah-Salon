import React from 'react';
import { Card } from 'flowbite-react';
import { useAdmin } from '../../context/AdminContext';
import { HiUserGroup, HiCurrencyDollar, HiCalendar } from 'react-icons/hi';

export default function Dashboard() {
  const { bookings } = useAdmin();

  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
  const completedBookings = bookings.filter(b => b.status === 'Completed').length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-xl font-bold leading-none text-gray-900">Pending Bookings</h5>
              <p className="text-gray-500 mt-2">Action needed</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
               <HiCalendar className="w-8 h-8" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mt-4">{pendingBookings}</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-xl font-bold leading-none text-gray-900">Confirmed</h5>
              <p className="text-gray-500 mt-2">Upcoming appointments</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
               <HiUserGroup className="w-8 h-8" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mt-4">{confirmedBookings}</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-xl font-bold leading-none text-gray-900">Completed</h5>
              <p className="text-gray-500 mt-2">Total served</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full text-green-600">
               <HiCurrencyDollar className="w-8 h-8" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mt-4">{completedBookings}</div>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Service</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.slice(0, 5).map((booking) => (
                            <tr key={booking.id} className="bg-white border-b">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{booking.name}</td>
                                <td className="px-6 py-4">{booking.service}</td>
                                <td className="px-6 py-4">{booking.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                        ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                          booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
      </div>
    </div>
  );
}
