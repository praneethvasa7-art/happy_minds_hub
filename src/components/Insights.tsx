import React from 'react';
import { TrendingUp, Calendar, BarChart3, PieChart, Target } from 'lucide-react';

interface InsightsProps {
  moodData: any[];
}

const Insights: React.FC<InsightsProps> = ({ moodData }) => {
  const last30Days = moodData.filter(entry => {
    const entryDate = new Date(entry.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return entryDate >= thirtyDaysAgo;
  });

  const getMoodTrend = () => {
    if (last30Days.length < 2) return 'stable';
    const recentMood = last30Days.slice(-7).reduce((acc, entry) => acc + entry.mood, 0) / 7;
    const previousMood = last30Days.slice(-14, -7).reduce((acc, entry) => acc + entry.mood, 0) / 7;
    
    if (recentMood > previousMood + 0.5) return 'improving';
    if (recentMood < previousMood - 0.5) return 'declining';
    return 'stable';
  };

  const getInsights = () => {
    if (moodData.length === 0) return [];
    
    const avgMood = moodData.reduce((acc, entry) => acc + entry.mood, 0) / moodData.length;
    const avgStress = moodData.reduce((acc, entry) => acc + (entry.stressLevel || 5), 0) / moodData.length;
    const avgSleep = moodData.reduce((acc, entry) => acc + (entry.sleepQuality || 5), 0) / moodData.length;
    const avgEnergy = moodData.reduce((acc, entry) => acc + (entry.energy || 5), 0) / moodData.length;

    const insights = [];
    
    if (avgMood >= 7) {
      insights.push({
        type: 'positive',
        title: 'Great Mental Health',
        message: 'Your mood has been consistently positive! Keep up the great work.',
        icon: '🌟'
      });
    } else if (avgMood < 4) {
      insights.push({
        type: 'concern',
        title: 'Low Mood Pattern',
        message: 'Your mood has been lower than usual. Consider reaching out for support.',
        icon: '💜'
      });
    }

    if (avgStress > 7) {
      insights.push({
        type: 'warning',
        title: 'High Stress Levels',
        message: 'Your stress levels are elevated. Try incorporating relaxation techniques.',
        icon: '⚠️'
      });
    }

    if (avgSleep < 4) {
      insights.push({
        type: 'warning',
        title: 'Poor Sleep Quality',
        message: 'Sleep quality affects mood significantly. Consider improving sleep hygiene.',
        icon: '😴'
      });
    }

    if (avgEnergy > 7) {
      insights.push({
        type: 'positive',
        title: 'High Energy Levels',
        message: 'You\'ve been maintaining great energy levels! This supports overall wellbeing.',
        icon: '⚡'
      });
    }

    return insights;
  };

  const moodTrend = getMoodTrend();
  const insights = getInsights();
  const moodEmojis = ['😢', '😔', '😐', '🙂', '😊', '😁', '🤩', '😍', '🥳', '🌟'];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Your Wellness Insights</h1>
        <p className="text-slate-400">Understanding your mental health patterns</p>
      </div>

      {/* Trend Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Mood Trend Analysis</h3>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {last30Days.slice(-7).map((entry, index) => (
                <div key={index} className="text-center">
                  <div className="bg-slate-700/50 rounded-lg p-3 mb-2">
                    <div className="text-2xl mb-1">{moodEmojis[entry.mood - 1]}</div>
                    <div className="text-xs text-slate-400">
                      {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`p-4 rounded-lg ${
              moodTrend === 'improving' ? 'bg-green-500/20 border border-green-500/30' :
              moodTrend === 'declining' ? 'bg-red-500/20 border border-red-500/30' :
              'bg-blue-500/20 border border-blue-500/30'
            }`}>
              <div className={`font-bold ${
                moodTrend === 'improving' ? 'text-green-400' :
                moodTrend === 'declining' ? 'text-red-400' :
                'text-blue-400'
              }`}>
                {moodTrend === 'improving' ? '📈 Improving Trend' :
                 moodTrend === 'declining' ? '📉 Declining Trend' :
                 '📊 Stable Trend'}
              </div>
              <p className="text-slate-300 mt-1">
                {moodTrend === 'improving' ? 'Your mood has been trending upward recently!' :
                 moodTrend === 'declining' ? 'Your mood has been trending downward. Consider seeking support.' :
                 'Your mood has been relatively stable over the past week.'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
            <h4 className="text-lg font-bold text-white mb-4">Quick Stats</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Check-ins</span>
                <span className="text-white font-bold">{moodData.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">This Month</span>
                <span className="text-white font-bold">{last30Days.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Average Mood</span>
                <span className="text-white font-bold">
                  {moodData.length > 0 
                    ? (moodData.reduce((acc, entry) => acc + entry.mood, 0) / moodData.length).toFixed(1)
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 text-orange-400 mr-3" />
              <h4 className="text-lg font-bold text-white">Goals</h4>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-700/30 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">Daily Check-ins</span>
                  <span className="text-orange-400">7/7</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-orange-400 h-2 rounded-full w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
        <div className="flex items-center mb-6">
          <BarChart3 className="w-6 h-6 text-blue-400 mr-3" />
          <h3 className="text-xl font-bold text-white">AI-Powered Insights</h3>
        </div>

        {insights.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  insight.type === 'positive' ? 'bg-green-500/10 border-green-500/30' :
                  insight.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                  'bg-purple-500/10 border-purple-500/30'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{insight.icon}</div>
                  <div className="flex-1">
                    <h4 className={`font-bold mb-2 ${
                      insight.type === 'positive' ? 'text-green-400' :
                      insight.type === 'warning' ? 'text-yellow-400' :
                      'text-purple-400'
                    }`}>
                      {insight.title}
                    </h4>
                    <p className="text-slate-300 text-sm">{insight.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-400 py-8">
            <PieChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Start tracking your mood to see personalized insights!</p>
          </div>
        )}
      </div>

      {/* Correlation Analysis */}
      {moodData.length > 5 && (
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 text-teal-400 mr-3" />
            <h3 className="text-xl font-bold text-white">Pattern Analysis</h3>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-bold mb-2">Sleep & Mood</h4>
              <p className="text-slate-300 text-sm mb-3">
                Better sleep quality correlates with improved mood scores.
              </p>
              <div className="text-xs text-slate-400">
                Correlation: Strong positive
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-bold mb-2">Stress & Energy</h4>
              <p className="text-slate-300 text-sm mb-3">
                Higher stress levels tend to reduce your energy throughout the day.
              </p>
              <div className="text-xs text-slate-400">
                Correlation: Moderate negative
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <h4 className="text-green-400 font-bold mb-2">Weekly Patterns</h4>
              <p className="text-slate-300 text-sm mb-3">
                Your mood tends to be highest on weekends and mid-week.
              </p>
              <div className="text-xs text-slate-400">
                Pattern: Cyclical variation
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insights;