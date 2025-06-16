import React, { useState } from 'react';
import { Clock, MapPin, Star, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Deal {
  id: string;
  restaurant: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  rating: number;
  distance: string;
  timeLeft: string;
  image: string;
  tags: string[];
}

const EndOfDayDeals: React.FC = () => {
  const navigate = useNavigate();
  const [deals] = useState<Deal[]>([
    {
      id: '1',
      restaurant: 'Green Bistro',
      title: 'Fresh Garden Salad Bowl',
      originalPrice: 12.99,
      discountedPrice: 6.50,
      discount: 50,
      rating: 4.8,
      distance: '0.3 km',
      timeLeft: '2h 15m',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      tags: ['Vegetarian', 'Healthy']
    },
    {
      id: '2',
      restaurant: 'Campus Deli',
      title: 'Gourmet Sandwich Combo',
      originalPrice: 15.99,
      discountedPrice: 8.00,
      discount: 50,
      rating: 4.6,
      distance: '0.5 km',
      timeLeft: '1h 45m',
      image: 'https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg',
      tags: ['Popular', 'Filling']
    },
    {
      id: '3',
      restaurant: 'Eco Kitchen',
      title: 'Organic Quinoa Buddha Bowl',
      originalPrice: 14.50,
      discountedPrice: 7.25,
      discount: 50,
      rating: 4.9,
      distance: '0.7 km',
      timeLeft: '3h 20m',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
      tags: ['Vegan', 'Organic']
    }
  ]);

  const handleReserve = (dealId: string) => {
    alert(`Reserved deal ${dealId}! You'll receive pickup instructions shortly.`);
  };

  return (
    <div className="pb-20 px-4 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={() => navigate('/')} className="mr-3 p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">End-of-Day Deals</h1>
            <p className="text-gray-600">Fresh meals at great prices</p>
          </div>
        </div>
      </div>

      {/* Real-time Update Banner */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-4 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">🔥 Live Updates</p>
            <p className="text-sm text-primary-100">12 new deals added in the last hour</p>
          </div>
          <div className="animate-pulse">
            <div className="w-3 h-3 bg-secondary-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Deals List */}
      <div className="space-y-4">
        {deals.map((deal, index) => (
          <div
            key={deal.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex">
              <div className="relative w-24 h-24 flex-shrink-0">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  -{deal.discount}%
                </div>
              </div>
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{deal.title}</h3>
                    <p className="text-gray-600 text-xs">{deal.restaurant}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <span className="line-through text-gray-400 text-xs mr-1">
                        ${deal.originalPrice}
                      </span>
                      <span className="font-bold text-primary-600">
                        ${deal.discountedPrice}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 mr-1" />
                      <span>{deal.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{deal.distance}</span>
                    </div>
                    <div className="flex items-center text-red-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{deal.timeLeft}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {deal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleReserve(deal.id)}
                    className="bg-primary-500 hover:bg-primary-600 text-white text-xs px-4 py-2 rounded-full font-semibold transition-colors duration-200"
                  >
                    Reserve Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 bg-secondary-50 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-gray-900 mb-2">Want more deals?</h3>
        <p className="text-gray-600 text-sm mb-4">
          Enable notifications to be first to know about new deals
        </p>
        <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200">
          Enable Notifications
        </button>
      </div>
    </div>
  );
};

export default EndOfDayDeals;