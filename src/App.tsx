import React, { useState, useEffect } from 'react';
import { Brain, Heart, TrendingUp, Calendar, Home, Settings, User } from 'lucide-react';
import Dashboard from './components/Dashboard';
import MoodCheckin from './components/MoodCheckin';
import Insights from './components/Insights';
import Wellness from './components/Wellness';
import Profile from './components/Profile';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [moodData, setMoodData] = useState(() => {
    const saved = localStorage.getItem('moodData');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('moodData', JSON.stringify(moodData));
  }, [moodData]);

  const addMoodEntry = (entry: any) => {
    const newEntry = {
      ...entry,
      id: Date.now(),
      date: new Date().toISOString(),
    };
    setMoodData([...moodData, newEntry]);
  };

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'checkin', label: 'Check-in', icon: Heart },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'wellness', label: 'Wellness', icon: Brain },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard moodData={moodData} />;
      case 'checkin':
        return <MoodCheckin onSubmit={addMoodEntry} />;
      case 'insights':
        return <Insights moodData={moodData} />;
      case 'wellness':
        return <Wellness moodData={moodData} />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard moodData={moodData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <nav className="w-20 lg:w-64 bg-slate-800/50 backdrop-blur-lg border-r border-slate-700/50 flex flex-col items-center lg:items-stretch py-6 px-3 lg:px-6">
          <div className="flex items-center justify-center lg:justify-start mb-8">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="hidden lg:block ml-3 text-xl font-bold text-white">MindSpace</span>
          </div>

          <div className="space-y-2 flex-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center justify-center lg:justify-start px-3 py-3 rounded-lg transition-all duration-200 group hover:scale-105 ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden lg:block ml-3">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto">
            <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-500/30">
              <div className="text-emerald-400 text-xs lg:text-sm font-medium">
                Daily Streak
              </div>
              <div className="text-emerald-300 text-lg lg:text-xl font-bold">
                7 days
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

export default App;