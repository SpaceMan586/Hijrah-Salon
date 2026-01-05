import React, { useState } from 'react';
import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { useAdmin } from '../../context/AdminContext';
import { HiCheck, HiX, HiTrash, HiPencil } from 'react-icons/hi';

export default function ManageBookings() {
  const { bookings, updateBookingStatus, updateBookingDetails, deleteBooking } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [editFormData, setEditFormData] = useState({ date: '', time: '' });

  const handleEditClick = (booking) => {
      setCurrentBooking(booking);
      setEditFormData({ date: booking.date, time: booking.time });
      setIsModalOpen(true);
  };

  const handleSaveUpdate = async () => {
      if (!currentBooking) return;
      
      const success = await updateBookingDetails(currentBooking.id, editFormData);
      if (success) {
          setIsModalOpen(false);
          setCurrentBooking(null);
      } else {
          alert("Failed to update booking. Please check permissions.");
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Booking Management</h1>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Customer Name</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Service</th>
              <th scope="col" className="px-6 py-3">Date & Time</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
                 <tr className="bg-white border-b"><td colSpan="6" className="px-6 py-4 text-center">No bookings found</td></tr>
            ) : bookings.map((booking) => (
              <tr key={booking.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {booking.name}
                </td>
                <td className="px-6 py-4">{booking.phone}</td>
                <td className="px-6 py-4">{booking.service}</td>
                <td className="px-6 py-4">{booking.date} at {booking.time}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold
                        ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : 
                          booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {booking.status}
                    </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button size="xs" color="light" className="shadow-md border border-gray-200" onClick={() => handleEditClick(booking)}>
                        <HiPencil className="h-4 w-4" />
                    </Button>
                    {booking.status === 'Pending' && (
                        <>
                            <Button size="xs" color="success" className="shadow-md" onClick={() => updateBookingStatus(booking.id, 'Confirmed')}>
                                <HiCheck className="mr-1 h-4 w-4" /> Confirm
                            </Button>
                            <Button size="xs" color="failure" className="shadow-md" onClick={() => updateBookingStatus(booking.id, 'Cancelled')}>
                                <HiX className="mr-1 h-4 w-4" /> Cancel
                            </Button>
                        </>
                    )}
                     {booking.status === 'Confirmed' && (
                         <Button size="xs" color="success" className="shadow-md" onClick={() => updateBookingStatus(booking.id, 'Completed')}>
                            Complete
                         </Button>
                     )}
                     <Button size="xs" color="gray" className="shadow-md border border-gray-200" onClick={() => deleteBooking(booking.id)}>
                        <HiTrash className="h-4 w-4" />
                     </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Reschedule Booking</Modal.Header>
        <Modal.Body>
            <div className="space-y-6">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="date" value="New Date" />
                    </div>
                    <TextInput 
                        id="date" 
                        type="date" 
                        value={editFormData.date} 
                        onChange={(e) => setEditFormData({...editFormData, date: e.target.value})} 
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="time" value="New Time" />
                    </div>
                    <TextInput 
                        id="time" 
                        type="time" 
                        value={editFormData.time} 
                        onChange={(e) => setEditFormData({...editFormData, time: e.target.value})} 
                    />
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button color="pink" onClick={handleSaveUpdate}>Save Changes</Button>
            <Button color="gray" onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
