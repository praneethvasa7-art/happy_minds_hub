import React, { useState } from 'react';
import { User, Settings, Award, Target, Calendar, Bell, Shield, Download } from 'lucide-react';

const Profile: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [dataPrivacy, setDataPrivacy] = useState('private');

  const achievements = [
    { 
      id: 1, 
      title: 'First Steps', 
      description: 'Completed your first mood check-in',
      icon: '🎯',
      unlocked: true,
      date: '2025-01-15'
    },
    { 
      id: 2, 
      title: 'Week Warrior', 
      description: 'Completed 7 consecutive check-ins',
      icon: '🔥',
      unlocked: true,
      date: '2025-01-20'
    },
    { 
      id: 3, 
      title: 'Mindful Month', 
      description: 'Checked in every day for a month',
      icon: '🏆',
      unlocked: false,
      date: null
    },
    { 
      id: 4, 
      title: 'Wellness Warrior', 
      description: 'Used 10 different wellness resources',
      icon: '⚡',
      unlocked: false,
      date: null
    }
  ];

  const wellnessGoals = [
    {
      id: 1,
      title: 'Daily Check-ins',
      target: 30,
      current: 22,
      unit: 'days'
    },
    {
      id: 2,
      title: 'Stress Management',
      target: 5,
      current: 7.2,
      unit: 'avg stress level'
    },
    {
      id: 3,
      title: 'Sleep Quality',
      target: 8,
      current: 6.8,
      unit: 'avg quality'
    }
  ];

  const exportData = () => {
    // Mock data export functionality
    alert('Data export feature would download your wellness data as JSON/CSV');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1>
        <p className="text-slate-400">Manage your wellness journey and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Info & Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Profile Information</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Display Name</label>
                <input 
                  type="text" 
                  defaultValue="Alex Student"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input 
                  type="email" 
                  defaultValue="alex@university.edu"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">University</label>
                <input 
                  type="text" 
                  defaultValue="State University"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center mb-6">
              <Settings className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Preferences</h3>
            </div>
            
            <div className="space-y-6">
              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 text-slate-400 mr-3" />
                  <div>
                    <div className="text-white font-medium">Push Notifications</div>
                    <div className="text-slate-400 text-sm">Get notified about check-in reminders</div>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    notifications ? 'bg-purple-500' : 'bg-slate-600'
                  } transition-colors duration-200`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Reminders */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-slate-400 mr-3" />
                  <div>
                    <div className="text-white font-medium">Daily Reminders</div>
                    <div className="text-slate-400 text-sm">Remind me to check in daily</div>
                  </div>
                </div>
                <button
                  onClick={() => setReminders(!reminders)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    reminders ? 'bg-purple-500' : 'bg-slate-600'
                  } transition-colors duration-200`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      reminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Privacy */}
              <div>
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-slate-400 mr-3" />
                  <div>
                    <div className="text-white font-medium">Data Privacy</div>
                    <div className="text-slate-400 text-sm">Control how your data is used</div>
                  </div>
                </div>
                <select
                  value={dataPrivacy}
                  onChange={(e) => setDataPrivacy(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="private">Private - Data stays local</option>
                  <option value="anonymous">Anonymous - Help improve the platform</option>
                  <option value="research">Research - Contribute to mental health research</option>
                </select>
              </div>

              {/* Data Export */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Download className="w-5 h-5 text-slate-400 mr-3" />
                    <div>
                      <div className="text-white font-medium">Export Data</div>
                      <div className="text-slate-400 text-sm">Download your wellness data</div>
                    </div>
                  </div>
                  <button
                    onClick={exportData}
                    className="px-4 py-2 bg-slate-700/50 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200"
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements & Goals */}
        <div className="space-y-6">
          {/* Achievements */}
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center mb-6">
              <Award className="w-6 h-6 text-yellow-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Achievements</h3>
            </div>
            
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-lg border ${
                    achievement.unlocked
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-slate-700/30 border-slate-600/50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold ${achievement.unlocked ? 'text-yellow-400' : 'text-slate-500'}`}>
                        {achievement.title}
                      </div>
                      <div className={`text-sm ${achievement.unlocked ? 'text-slate-300' : 'text-slate-500'}`}>
                        {achievement.description}
                      </div>
                      {achievement.date && (
                        <div className="text-xs text-slate-400 mt-1">
                          Unlocked: {new Date(achievement.date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center mb-6">
              <Target className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Wellness Goals</h3>
            </div>
            
            <div className="space-y-4">
              {wellnessGoals.map((goal) => {
                const progress = Math.min((goal.current / goal.target) * 100, 100);
                const isOnTrack = goal.title === 'Stress Management' ? goal.current < goal.target : goal.current >= goal.target * 0.7;
                
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{goal.title}</span>
                      <span className={`text-sm ${isOnTrack ? 'text-green-400' : 'text-yellow-400'}`}>
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${isOnTrack ? 'bg-green-400' : 'bg-yellow-400'}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 text-white">
                Reset Password
              </button>
              <button className="w-full text-left p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 text-white">
                Contact Support
              </button>
              <button className="w-full text-left p-3 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors duration-200 text-red-400">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;