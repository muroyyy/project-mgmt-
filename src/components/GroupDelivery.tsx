import React, { useState } from 'react';
import { Users, Clock, MapPin, ChevronLeft, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryFee: number;
  minOrder: number;
  image: string;
  timeLeft: string;
  currentOrders: number;
  minGroupSize: number;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const GroupDelivery: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [cart, setCart] = useState<{[key: string]: number}>({});

  const [restaurants] = useState<Restaurant[]>([
    {
      id: '1',
      name: 'Green Garden',
      cuisine: 'Healthy Bowls',
      rating: 4.8,
      deliveryFee: 3.99,
      minOrder: 25,
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      timeLeft: '1h 45m',
      currentOrders: 8,
      minGroupSize: 10
    },
    {
      id: '2',
      name: 'Pizza Corner',
      cuisine: 'Italian',
      rating: 4.6,
      deliveryFee: 2.99,
      minOrder: 30,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      timeLeft: '2h 15m',
      currentOrders: 12,
      minGroupSize: 15
    }
  ]);

  const [menuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Buddha Bowl',
      price: 12.99,
      description: 'Quinoa, avocado, sweet potato, tahini dressing',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg'
    },
    {
      id: '2',
      name: 'Green Smoothie Bowl',
      price: 9.99,
      description: 'Spinach, mango, banana, chia seeds, coconut',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'
    }
  ]);

  const updateCartItem = (itemId: string, change: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const getTotalAmount = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(item => item.id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  if (selectedRestaurant) {
    const restaurant = restaurants.find(r => r.id === selectedRestaurant);
    
    return (
      <div className="pb-20 px-4 pt-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setSelectedRestaurant(null)} 
            className="mr-3 p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{restaurant?.name}</h1>
            <p className="text-gray-600">{restaurant?.cuisine}</p>
          </div>
        </div>

        {/* Group Status */}
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Group Order Status</h2>
              <p className="text-accent-100 text-sm">
                {restaurant?.currentOrders} / {restaurant?.minGroupSize} people joined
              </p>
            </div>
            <Clock className="w-8 h-8 text-accent-200" />
          </div>
          <div className="bg-accent-400/30 rounded-full h-3 mb-2">
            <div 
              className="bg-secondary-300 h-3 rounded-full"
              style={{ 
                width: `${Math.min(100, (restaurant?.currentOrders || 0) / (restaurant?.minGroupSize || 1) * 100)}%` 
              }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-accent-100">Order closes in {restaurant?.timeLeft}</span>
            <span className="text-accent-100">
              {Math.max(0, (restaurant?.minGroupSize || 0) - (restaurant?.currentOrders || 0))} more needed
            </span>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex">
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 text-xs">{item.description}</p>
                    </div>
                    <span className="font-bold text-primary-600">${item.price}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateCartItem(item.id, -1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="font-semibold text-gray-900 min-w-[20px] text-center">
                        {cart[item.id] || 0}
                      </span>
                      <button
                        onClick={() => updateCartItem(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {getCartItemCount() > 0 && (
          <div className="fixed bottom-20 left-4 right-4 bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">
                  {getCartItemCount()} items • ${getTotalAmount().toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  + ${restaurant?.deliveryFee} delivery fee
                </p>
              </div>
              <button
                onClick={() => alert('Order placed! You\'ll be notified when the group order is complete.')}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200"
              >
                Join Group Order
              </button>
            </div>
          </div>
        )}
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
          <h1 className="text-2xl font-bold text-gray-900">Group Delivery</h1>
          <p className="text-gray-600">Order together, save more</p>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 mb-6 text-white">
        <h2 className="text-lg font-semibold mb-2">How Group Delivery Works</h2>
        <div className="space-y-2 text-sm text-purple-100">
          <p>• Join or start a group order from participating restaurants</p>
          <p>• Split delivery costs with other students</p>
          <p>• Orders are delivered to a central campus location</p>
        </div>
      </div>

      {/* Active Group Orders */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Available Group Orders</h2>
        {restaurants.map((restaurant, index) => (
          <div
            key={restaurant.id}
            onClick={() => setSelectedRestaurant(restaurant.id)}
            className="cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex">
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                    <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-500 text-sm mb-1">
                      <span>★ {restaurant.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      ${restaurant.deliveryFee} delivery
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                    <span>Group Progress</span>
                    <span>
                      {restaurant.currentOrders} / {restaurant.minGroupSize} people
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ 
                        width: `${Math.min(100, restaurant.currentOrders / restaurant.minGroupSize * 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{restaurant.timeLeft}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      <span>{restaurant.currentOrders} joined</span>
                    </div>
                  </div>
                  <button
                    className="bg-primary-500 hover:bg-primary-600 text-white text-xs px-4 py-2 rounded-full font-semibold transition-colors duration-200"
                  >
                    Join Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Start New Group */}
      <div className="mt-8 bg-gray-50 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-gray-900 mb-2">Don't see your favorite restaurant?</h3>
        <p className="text-gray-600 text-sm mb-4">
          Start a new group order and invite others to join
        </p>
        <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200">
          Start New Group
        </button>
      </div>
    </div>
  );
};

export default GroupDelivery;