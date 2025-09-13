import React from 'react';
import { Calendar, TrendingUp, Heart, Award, AlertCircle, Smile } from 'lucide-react';

interface DashboardProps {
  moodData: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ moodData }) => {
  const today = new Date().toDateString();
  const todayEntry = moodData.find(entry => 
    new Date(entry.date).toDateString() === today
  );

  const lastWeekData = moodData.filter(entry => {
    const entryDate = new Date(entry.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entryDate >= weekAgo;
  });

  const averageMood = lastWeekData.length > 0 
    ? Math.round(lastWeekData.reduce((acc, entry) => acc + entry.mood, 0) / lastWeekData.length)
    : 5;

  const moodEmojis = ['😢', '😔', '😐', '🙂', '😊', '😁', '🤩', '😍', '🥳', '🌟'];
  const moodLabels = ['Very Low', 'Low', 'Poor', 'Fair', 'Good', 'Great', 'Excellent', 'Amazing', 'Fantastic', 'Perfect'];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-slate-400 text-lg">
          How are you feeling today?
        </p>
      </div>

      {/* Today's Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
            {todayEntry ? (
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">
                  {moodEmojis[todayEntry.mood - 1]}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Feeling {moodLabels[todayEntry.mood - 1]}
                </h3>
                <p className="text-slate-400">
                  Great job checking in today!
                </p>
              </div>
            ) : (
              <div className="text-center">
                <Heart className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Ready for your daily check-in?
                </h3>
                <p className="text-slate-400 mb-4">
                  Take a moment to reflect on how you're feeling
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105">
                  Start Check-in
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {/* Mood Trend */}
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-400 mr-3" />
              <h3 className="text-lg font-bold text-white">Weekly Average</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">{moodEmojis[averageMood - 1]}</div>
              <div className="text-2xl font-bold text-emerald-400">
                {moodLabels[averageMood - 1]}
              </div>
            </div>
          </div>

          {/* Streak */}
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <Award className="w-6 h-6 text-orange-400 mr-3" />
              <h3 className="text-lg font-bold text-white">Streak</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">7 days</div>
              <div className="text-slate-400">Keep it up!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/30 backdrop-blur-lg border border-slate-700/30 rounded-xl p-4 hover:bg-slate-800/50 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-sm">Total Check-ins</div>
              <div className="text-2xl font-bold text-white">{moodData.length}</div>
            </div>
            <Calendar className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-lg border border-slate-700/30 rounded-xl p-4 hover:bg-slate-800/50 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-sm">This Week</div>
              <div className="text-2xl font-bold text-white">{lastWeekData.length}</div>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-lg border border-slate-700/30 rounded-xl p-4 hover:bg-slate-800/50 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-sm">Best Day</div>
              <div className="text-2xl font-bold text-white">
                {moodData.length > 0 
                  ? moodEmojis[Math.max(...moodData.map(d => d.mood)) - 1]
                  : '🌟'
                }
              </div>
            </div>
            <Smile className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-lg border border-slate-700/30 rounded-xl p-4 hover:bg-slate-800/50 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-sm">Support</div>
              <div className="text-lg font-bold text-white">24/7</div>
            </div>
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Check-ins</h3>
        {moodData.length > 0 ? (
          <div className="space-y-3">
            {moodData.slice(-5).reverse().map((entry, index) => (
              <div 
                key={entry.id}
                className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{moodEmojis[entry.mood - 1]}</div>
                  <div>
                    <div className="text-white font-medium">
                      {moodLabels[entry.mood - 1]}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                {entry.note && (
                  <div className="text-slate-300 text-sm italic max-w-xs truncate">
                    "{entry.note}"
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-400 py-8">
            <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No check-ins yet. Start your wellness journey today!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;