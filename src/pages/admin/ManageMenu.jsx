import React, { useState } from 'react';
import { TextInput, Label, ToggleSwitch } from 'flowbite-react';
import { useAdmin } from '../../context/AdminContext';
import { HiPencil, HiTrash, HiPlus, HiBan, HiCheck, HiX } from 'react-icons/hi';

export default function ManageMenu() {
  const { menu, updateMenu } = useAdmin();
  const [editingItem, setEditingItem] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    
    const newMenu = menu.map((category, idx) => {
      if (idx !== currentCategoryIndex) return category;
      
      const newItems = [...category.items];
      const newItemData = {
          name: editingItem.name,
          price: editingItem.price,
          prices: editingItem.prices,
          available: editingItem.available
      };

      if (editingItem.index !== undefined) {
         newItems[editingItem.index] = newItemData;
      } else {
         newItems.push(newItemData);
      }
      
      return { ...category, items: newItems };
    });

    updateMenu(newMenu);
    setShowEditor(false);
    setEditingItem(null);
  };

  const openEditModal = (categoryIndex, item, itemIndex) => {
      setCurrentCategoryIndex(categoryIndex);
      setEditingItem({ 
          ...item, 
          index: itemIndex, 
          price: item.price || (item.prices ? item.prices.join(', ') : ''),
          available: item.available !== false
      });
      setShowEditor(true);
  };

  const openAddModal = (categoryIndex) => {
      setCurrentCategoryIndex(categoryIndex);
      setEditingItem({ name: '', price: '', available: true });
      setShowEditor(true);
  };
  
  const handleDelete = (categoryIndex, itemIndex) => {
      if(window.confirm("Are you sure you want to delete this item?")) {
        const newMenu = menu.map((category, idx) => {
            if (idx !== categoryIndex) return category;
            return {
                ...category,
                items: category.items.filter((_, i) => i !== itemIndex)
            };
        });
        updateMenu(newMenu);
      }
  };

  const handleToggleAvailability = (categoryIndex, itemIndex) => {
    const newMenu = menu.map((category, idx) => {
        if (idx !== categoryIndex) return category;
        const newItems = [...category.items];
        const currentItem = newItems[itemIndex];
        const currentStatus = currentItem.available !== false;
        newItems[itemIndex] = { ...currentItem, available: !currentStatus };
        return { ...category, items: newItems };
    });
    updateMenu(newMenu);
  };

  return (
    <div className="space-y-8 pb-10">
      <h1 className="text-2xl font-semibold text-gray-800">Menu Management</h1>

      {menu.map((category, catIndex) => (
        <div key={catIndex} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-pink-600">{category.title}</h2>
            <button 
                onClick={() => openAddModal(catIndex)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 transition-colors"
            >
                <HiPlus className="w-4 h-4" /> Add Item
            </button>
          </div>
          
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Item Name</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {category.items.map((item, itemIndex) => (
                  <tr key={itemIndex} className={`bg-white border-b hover:bg-gray-50 ${item.available === false ? 'bg-gray-100 opacity-60' : ''}`}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {item.name}
                        {item.available === false && <span className="ml-2 text-xs font-bold text-red-500">(Unavailable)</span>}
                    </td>
                    <td className="px-6 py-4">
                        {item.price ? item.price : (item.prices ? item.prices.join(' / ') : '-')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4 items-center">
                        <div title={item.available === false ? "Turn On" : "Turn Off"} className="flex items-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={item.available !== false}
                                    onChange={() => handleToggleAvailability(catIndex, itemIndex)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                                    {item.available !== false ? 'On' : 'Off'}
                                </span>
                            </label>
                        </div>
                        <div className="flex gap-2 border-l pl-4 border-gray-100">
                            <button 
                                onClick={() => openEditModal(catIndex, item, itemIndex)}
                                className="p-2 text-gray-700 bg-white border border-gray-200 shadow-sm rounded-lg hover:bg-gray-50 hover:text-pink-600 transition-colors"
                            >
                              <HiPencil className="h-4 w-4" />
                            </button>
                            <button 
                                onClick={() => handleDelete(catIndex, itemIndex)}
                                className="p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 shadow-md transition-colors"
                            >
                              <HiTrash className="h-4 w-4" />
                            </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Editor Overlay */}
      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingItem?.index !== undefined ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button 
                onClick={() => setShowEditor(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleSave} className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="name" value="Item Name" />
                  <TextInput 
                    id="name" 
                    value={editingItem?.name || ''} 
                    onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="price" value="Price" />
                  <TextInput 
                    id="price" 
                    value={editingItem?.price || ''} 
                    onChange={(e) => setEditingItem({...editingItem, price: e.target.value})} 
                    required 
                  />
                </div>
                
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="available" 
                        checked={editingItem?.available !== false}
                        onChange={(e) => setEditingItem({...editingItem, available: e.target.checked})}
                        className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                    />
                    <Label htmlFor="available" value="Item is Available" />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button 
                        type="button"
                        onClick={() => setShowEditor(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-200"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 focus:ring-4 focus:ring-pink-300"
                    >
                        Save
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
