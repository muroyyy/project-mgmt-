import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import EndOfDayDeals from './components/EndOfDayDeals';
import FoodBank from './components/FoodBank';
import SustainableChallenge from './components/SustainableChallenge';
import GroupDelivery from './components/GroupDelivery';
import UserProfile from './components/UserProfile';
import Navigation from './components/shared/Navigation';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/deals" element={<EndOfDayDeals />} />
          <Route path="/food-bank" element={<FoodBank />} />
          <Route path="/challenges" element={<SustainableChallenge />} />
          <Route path="/group-delivery" element={<GroupDelivery />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;