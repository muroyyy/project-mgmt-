import React from 'react';
import { Leaf, Heart, Recycle } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center animate-fade-in">
      <div className="text-center text-white">
        <div className="relative mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="w-16 h-16 text-white animate-bounce-soft" />
            <Heart className="w-12 h-12 text-secondary-300 animate-bounce-soft" style={{ animationDelay: '0.2s' }} />
            <Recycle className="w-14 h-14 text-accent-300 animate-bounce-soft" style={{ animationDelay: '0.4s' }} />
          </div>
          <h1 className="text-6xl font-bold mb-2 tracking-tight">
            AP<span className="text-secondary-300">Green</span>
          </h1>
        </div>
        <p className="text-xl font-light text-primary-100 mb-8 max-w-sm mx-auto leading-relaxed">
          Eat Smart. Waste Less. Go Green.
        </p>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;