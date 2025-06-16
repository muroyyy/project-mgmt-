import React, { useState } from 'react';
import { Package, Users, Clock, ChevronLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FoodItem {
  id: string;
  title: string;
  restaurant: string;
  quantity: number;
  expiry: string;
  claimed: number;
  total: number;
  image: string;
  category: string;
}

const FoodBank: React.FC = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const [availableFood] = useState<FoodItem[]>([
    {
      id: '1',
      title: 'Fresh Bread & Pastries',
      restaurant: 'Campus Bakery',
      quantity: 15,
      expiry: 'Today 6:00 PM',
      claimed: 8,
      total: 15,
      image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg',
      category: 'Bakery'
    },
    {
      id: '2',
      title: 'Prepared Sandwiches',
      restaurant: 'Green Deli',
      quantity: 12,
      expiry: 'Today 8:00 PM',
      claimed: 5,
      total: 12,
      image: 'https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg',
      category: 'Ready Meals'
    },
    {
      id: '3',
      title: 'Fresh Fruits & Vegetables',
      restaurant: 'Organic Market',
      quantity: 20,
      expiry: 'Tomorrow',
      claimed: 12,
      total: 20,
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      category: 'Produce'
    }
  ]);

  const handleClaim = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const submitClaim = () => {
    alert(`Successfully claimed ${selectedItems.length} items! You'll receive pickup instructions shortly.`);
    setSelectedItems([]);
  };

  if (!isRegistered) {
    return (
      <div className="pb-20 px-4 pt-8">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate('/')} className="mr-3 p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Food Bank</h1>
            <p className="text-gray-600">Free meals for students in need</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <Package className="w-16 h-16 text-primary-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Registration Required</h2>
          <p className="text-gray-600 mb-6">
            To access our food bank, please register with your student ID. This helps us ensure food goes to students who need it most.
          </p>
          
          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Student ID"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Student Email"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <textarea
              placeholder="Brief reason for assistance (optional)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          <button
            onClick={() => setIsRegistered(true)}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-semibold transition-colors duration-200"
          >
            Register for Food Bank
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Your information is kept confidential and only used to prevent abuse of the system.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 px-4 pt-8">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/')} className="mr-3 p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Food Bank</h1>
          <p className="text-gray-600">Available donations</p>
        </div>
      </div>

      {/* Registration Success */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
        <div className="flex items-center">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          <p className="text-green-800 text-sm">
            Registration successful! You can now claim available food items.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <Package className="w-6 h-6 text-primary-500 mx-auto mb-2" />
          <div className="text-xl font-bold text-gray-900">47</div>
          <div className="text-xs text-gray-500">Items Available</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <Users className="w-6 h-6 text-secondary-500 mx-auto mb-2" />
          <div className="text-xl font-bold text-gray-900">156</div>
          <div className="text-xs text-gray-500">Students Helped</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
          <Clock className="w-6 h-6 text-accent-500 mx-auto mb-2" />
          <div className="text-xl font-bold text-gray-900">2h</div>
          <div className="text-xs text-gray-500">Avg Wait Time</div>
        </div>
      </div>

      {/* Available Food */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-bold text-gray-900">Available Food</h2>
        {availableFood.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex">
              <div className="w-20 h-20 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                    <p className="text-gray-600 text-xs">{item.restaurant}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Expires: {item.expiry}</p>
                    <p className="text-xs text-primary-600 font-medium">
                      {item.quantity - item.claimed} of {item.quantity} left
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${((item.total - item.claimed) / item.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleClaim(item.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-200 ${
                      selectedItems.includes(item.id)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedItems.includes(item.id) ? 'Selected' : 'Claim'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Claim Button */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-20 left-4 right-4 bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">{selectedItems.length} items selected</p>
              <p className="text-xs text-gray-500">Pickup within 2 hours</p>
            </div>
            <button
              onClick={submitClaim}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200"
            >
              Claim Items
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodBank;