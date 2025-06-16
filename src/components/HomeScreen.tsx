import React from 'react';
import { TrendingDown, Target, Package, Users, Award, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'deals',
      title: 'End-of-Day Deals',
      description: 'Save money on fresh meals',
      icon: TrendingDown,
      color: 'bg-gradient-to-br from-primary-500 to-primary-600',
      path: '/deals',
      badge: '12 new'
    },
    {
      id: 'challenges',
      title: 'Sustainable Challenges',
      description: 'Earn eco points & rewards',
      icon: Target,
      color: 'bg-gradient-to-br from-secondary-500 to-secondary-600',
      path: '/challenges',
      badge: 'Active'
    },
    {
      id: 'food-bank',
      title: 'Claim Unsold Food',
      description: 'Free meals for students',
      icon: Package,
      color: 'bg-gradient-to-br from-accent-500 to-accent-600',
      path: '/food-bank',
      badge: '8 available'
    },
    {
      id: 'group-delivery',
      title: 'Group Delivery',
      description: 'Order together, save more',
      icon: Users,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      path: '/group-delivery',
      badge: '2h left'
    }
  ];

  return (
    <div className="pb-20 px-4 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600">Let's make today more sustainable</p>
        </div>
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Eco Points Card */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-1">Your Eco Points</h2>
            <p className="text-3xl font-bold">1,247</p>
            <p className="text-primary-100 text-sm">+42 this week</p>
          </div>
          <Award className="w-12 h-12 text-primary-200" />
        </div>
        <div className="mt-4 bg-primary-400/30 rounded-full h-2">
          <div className="bg-secondary-300 h-2 rounded-full w-3/4"></div>
        </div>
        <p className="text-xs text-primary-100 mt-2">753 points to next reward</p>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4">
          {quickActions.map((action, index) => (
            <div
              key={action.id}
              onClick={() => navigate(action.path)}
              className="cursor-pointer group transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`${action.color} rounded-2xl p-6 text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                <div className="flex items-center justify-between mb-3">
                  <action.icon className="w-8 h-8" />
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full font-medium">
                    {action.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                <p className="text-white/80 text-sm">{action.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Impact */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Today's Impact</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">3</div>
            <div className="text-xs text-gray-500">Meals Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-600">$12</div>
            <div className="text-xs text-gray-500">Money Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-600">2.1kg</div>
            <div className="text-xs text-gray-500">CO₂ Reduced</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;