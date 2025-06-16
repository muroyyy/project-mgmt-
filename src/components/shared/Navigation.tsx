import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, TrendingDown, Target, Package, Users, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/deals', icon: TrendingDown, label: 'Deals' },
    { path: '/challenges', icon: Target, label: 'Challenges' },
    { path: '/food-bank', icon: Package, label: 'Food Bank' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-inset-bottom">
      <div className="flex justify-around items-center max-w-sm mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? 'text-primary-600' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-primary-600' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-primary-600 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;