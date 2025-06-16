import React, { useState } from 'react';
import { User, Award, History, Settings, ChevronLeft, Leaf, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HistoryItem {
  id: string;
  type: 'deal' | 'challenge' | 'food-bank' | 'group-delivery';
  title: string;
  date: string;
  points?: number;
  savings?: number;
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');

  const [userStats] = useState({
    name: 'Sarah Chen',
    studentId: 'SC2024001',
    ecoPoints: 1247,
    weeklyPoints: 42,
    totalSavings: 156.75,
    mealsReclaimed: 23,
    co2Reduced: 45.2,
    joinDate: 'September 2024'
  });

  const [history] = useState<HistoryItem[]>([
    {
      id: '1',
      type: 'deal',
      title: 'Fresh Garden Salad Bowl from Green Bistro',
      date: '2 hours ago',
      points: 15,
      savings: 6.49
    },
    {
      id: '2',
      type: 'challenge',
      title: 'Completed: Bring Your Own Container',
      date: 'Yesterday',
      points: 50
    },
    {
      id: '3',
      type: 'food-bank',
      title: 'Claimed: Fresh Bread & Pastries',
      date: '2 days ago',
      points: 10
    },
    {
      id: '4',
      type: 'group-delivery',
      title: 'Group order from Pizza Corner',
      date: '3 days ago',
      savings: 4.99
    }
  ]);

  const getHistoryIcon = (type: string) => {
    switch (type) {
      case 'deal': return '💰';
      case 'challenge': return '🎯';
      case 'food-bank': return '📦';
      case 'group-delivery': return '🚚';
      default: return '📱';
    }
  };

  const achievements = [
    { title: 'Eco Warrior', description: 'Earned 1000+ eco points', icon: '🌱', completed: true },
    { title: 'Deal Hunter', description: 'Claimed 20+ end-of-day deals', icon: '🎯', completed: true },
    { title: 'Group Leader', description: 'Started 5 group orders', icon: '👥', completed: false },
    { title: 'Zero Waste', description: 'Complete 30-day waste challenge', icon: '♻️', completed: false }
  ];

  return (
    <div className="pb-20 px-4 pt-8">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/')} className="mr-3 p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Your sustainability journey</p>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{userStats.name}</h2>
            <p className="text-primary-100">{userStats.studentId}</p>
            <p className="text-primary-100 text-sm">Member since {userStats.joinDate}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <Award className="w-6 h-6 text-secondary-300 mx-auto mb-1" />
            <div className="text-2xl font-bold">{userStats.ecoPoints}</div>
            <div className="text-xs text-primary-100">Eco Points</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <TrendingUp className="w-6 h-6 text-secondary-300 mx-auto mb-1" />
            <div className="text-2xl font-bold">+{userStats.weeklyPoints}</div>
            <div className="text-xs text-primary-100">This Week</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 ${
            activeTab === 'overview'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 ${
            activeTab === 'history'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600'
          }`}
        >
          History
        </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-6">
          {/* Impact Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Environmental Impact</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Leaf className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-900">{userStats.mealsReclaimed}</div>
                <div className="text-xs text-gray-500">Meals Reclaimed</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-secondary-600 font-bold text-sm">$</span>
                </div>
                <div className="text-xl font-bold text-gray-900">${userStats.totalSavings}</div>
                <div className="text-xs text-gray-500">Total Savings</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-accent-600 font-bold text-xs">CO₂</span>
                </div>
                <div className="text-xl font-bold text-gray-900">{userStats.co2Reduced}kg</div>
                <div className="text-xs text-gray-500">CO₂ Reduced</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 ${
                    achievement.completed
                      ? 'border-primary-200 bg-primary-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <h4 className={`font-semibold text-sm ${
                    achievement.completed ? 'text-primary-700' : 'text-gray-600'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Settings</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center">
                  <Settings className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">Notification Settings</span>
                </div>
                <span className="text-gray-400">›</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">Account Settings</span>
                </div>
                <span className="text-gray-400">›</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
          {history.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start">
                <div className="text-2xl mr-3">{getHistoryIcon(item.type)}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{item.date}</span>
                    <div className="flex space-x-2">
                      {item.points && (
                        <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                          +{item.points} pts
                        </span>
                      )}
                      {item.savings && (
                        <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-xs font-medium">
                          ${item.savings} saved
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;