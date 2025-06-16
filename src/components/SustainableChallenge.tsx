import React, { useState } from 'react';
import { Target, Upload, Trophy, Star, ChevronLeft, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  deadline: string;
  progress: number;
  completed: boolean;
  icon: React.ElementType;
}

const SustainableChallenge: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [uploadedProof, setUploadedProof] = useState<string | null>(null);

  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Bring Your Own Container',
      description: 'Use a reusable container for takeout 3 times this week',
      points: 50,
      difficulty: 'Easy',
      deadline: '3 days left',
      progress: 66,
      completed: false,
      icon: Target
    },
    {
      id: '2',
      title: 'Zero Waste Lunch',
      description: 'Pack a completely waste-free lunch for 5 consecutive days',
      points: 100,
      difficulty: 'Medium',
      deadline: '1 week left',
      progress: 40,
      completed: false,
      icon: Trophy
    },
    {
      id: '3',
      title: 'Food Waste Warrior',
      description: 'Finish all your meals without throwing away food for 7 days',
      points: 75,
      difficulty: 'Medium',
      deadline: '5 days left',
      progress: 85,
      completed: false,
      icon: Star
    }
  ]);

  const handleUploadProof = () => {
    // Simulate photo upload
    setUploadedProof('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg');
    alert('Photo uploaded successfully! Your progress has been updated.');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="pb-20 px-4 pt-8">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/')} className="mr-3 p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sustainable Challenges</h1>
          <p className="text-gray-600">Earn points, make a difference</p>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">This Week's Progress</h2>
            <p className="text-primary-100 text-sm">Keep up the great work!</p>
          </div>
          <Trophy className="w-8 h-8 text-primary-200" />
        </div>
        <div className="bg-primary-400/30 rounded-full h-3 mb-2">
          <div className="bg-secondary-300 h-3 rounded-full w-3/5"></div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-primary-100">225 / 375 points</span>
          <span className="text-primary-100">60% complete</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 ${
            activeTab === 'active'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600'
          }`}
        >
          Active Challenges
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 ${
            activeTab === 'completed'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Challenges List */}
      <div className="space-y-4 mb-8">
        {challenges
          .filter(challenge => activeTab === 'active' ? !challenge.completed : challenge.completed)
          .map((challenge, index) => (
            <div
              key={challenge.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex">
                  <challenge.icon className="w-6 h-6 text-primary-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900">{challenge.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{challenge.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Progress</span>
                  <span className="text-gray-900 font-medium">{challenge.progress}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{challenge.deadline}</span>
                  <span className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full text-xs font-bold">
                    +{challenge.points} pts
                  </span>
                </div>
                <button
                  onClick={handleUploadProof}
                  className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200"
                >
                  <Camera className="w-4 h-4" />
                  <span>Upload Proof</span>
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Leaderboard Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Weekly Leaderboard</h2>
        <div className="space-y-3">
          {[
            { rank: 1, name: 'Sarah Chen', points: 1450, avatar: '👩‍🎓' },
            { rank: 2, name: 'You', points: 1247, avatar: '🙋‍♀️', isCurrentUser: true },
            { rank: 3, name: 'Mike Johnson', points: 1189, avatar: '👨‍🎓' },
          ].map((user) => (
            <div
              key={user.rank}
              className={`flex items-center justify-between p-3 rounded-xl ${
                user.isCurrentUser ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm mr-3">
                  {user.avatar}
                </div>
                <div>
                  <p className={`font-semibold ${user.isCurrentUser ? 'text-primary-700' : 'text-gray-900'}`}>
                    #{user.rank} {user.name}
                  </p>
                </div>
              </div>
              <span className={`font-bold ${user.isCurrentUser ? 'text-primary-600' : 'text-gray-600'}`}>
                {user.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SustainableChallenge;