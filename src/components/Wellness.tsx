import React, { useState } from 'react';
import { Brain, Heart, Zap, BookOpen, Music, Phone, ExternalLink, Play } from 'lucide-react';

interface WellnessProps {
  moodData: any[];
}

const Wellness: React.FC<WellnessProps> = ({ moodData }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const getPersonalizedRecommendations = () => {
    if (moodData.length === 0) return [];
    
    const recentEntries = moodData.slice(-7);
    const avgMood = recentEntries.reduce((acc, entry) => acc + entry.mood, 0) / recentEntries.length;
    const avgStress = recentEntries.reduce((acc, entry) => acc + (entry.stressLevel || 5), 0) / recentEntries.length;
    const avgSleep = recentEntries.reduce((acc, entry) => acc + (entry.sleepQuality || 5), 0) / recentEntries.length;
    const avgEnergy = recentEntries.reduce((acc, entry) => acc + (entry.energy || 5), 0) / recentEntries.length;

    const recommendations = [];

    if (avgMood < 5) {
      recommendations.push({
        category: 'mental',
        priority: 'high',
        title: 'Mood Boosting Activities',
        description: 'Try these evidence-based activities to improve your mood',
        activities: ['Gratitude journaling', 'Connect with friends', 'Watch funny videos', 'Listen to uplifting music']
      });
    }

    if (avgStress > 6) {
      recommendations.push({
        category: 'stress',
        priority: 'high',
        title: 'Stress Management',
        description: 'Reduce stress with these proven techniques',
        activities: ['Deep breathing exercises', '5-minute meditation', 'Progressive muscle relaxation', 'Take a nature walk']
      });
    }

    if (avgSleep < 5) {
      recommendations.push({
        category: 'sleep',
        priority: 'medium',
        title: 'Sleep Hygiene',
        description: 'Improve your sleep quality with these tips',
        activities: ['Consistent bedtime routine', 'Limit screen time before bed', 'Create a dark, cool environment', 'Avoid caffeine after 2 PM']
      });
    }

    if (avgEnergy < 5) {
      recommendations.push({
        category: 'energy',
        priority: 'medium',
        title: 'Energy Boosters',
        description: 'Natural ways to increase your energy levels',
        activities: ['Light exercise or stretching', 'Stay hydrated', 'Eat protein-rich snacks', 'Take short breaks outdoors']
      });
    }

    return recommendations;
  };

  const wellnessResources = [
    {
      category: 'meditation',
      title: 'Guided Meditation',
      description: '10-minute mindfulness session',
      icon: Brain,
      color: 'purple',
      duration: '10 min',
      type: 'audio'
    },
    {
      category: 'breathing',
      title: 'Breathing Exercise',
      description: '4-7-8 breathing technique',
      icon: Heart,
      color: 'blue',
      duration: '5 min',
      type: 'interactive'
    },
    {
      category: 'movement',
      title: 'Quick Energizer',
      description: 'Gentle stretching routine',
      icon: Zap,
      color: 'green',
      duration: '15 min',
      type: 'video'
    },
    {
      category: 'learning',
      title: 'Mental Health Guide',
      description: 'Understanding anxiety and stress',
      icon: BookOpen,
      color: 'orange',
      duration: '20 min',
      type: 'article'
    },
    {
      category: 'music',
      title: 'Relaxation Playlist',
      description: 'Curated calming music',
      icon: Music,
      color: 'teal',
      duration: '30 min',
      type: 'playlist'
    }
  ];

  const crisisResources = [
    {
      name: 'Crisis Text Line',
      contact: 'Text HOME to 741741',
      description: '24/7 crisis support via text',
      urgent: true
    },
    {
      name: 'National Suicide Prevention Lifeline',
      contact: '988',
      description: '24/7 phone support',
      urgent: true
    },
    {
      name: 'Campus Counseling Center',
      contact: 'Visit Student Services',
      description: 'On-campus mental health support',
      urgent: false
    },
    {
      name: 'SAMHSA National Helpline',
      contact: '1-800-662-4357',
      description: 'Treatment referral and information service',
      urgent: false
    }
  ];

  const personalizedRecommendations = getPersonalizedRecommendations();

  const categories = [
    { id: 'all', label: 'All Resources', icon: Brain },
    { id: 'meditation', label: 'Meditation', icon: Brain },
    { id: 'breathing', label: 'Breathing', icon: Heart },
    { id: 'movement', label: 'Movement', icon: Zap },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'music', label: 'Music', icon: Music }
  ];

  const filteredResources = activeCategory === 'all' 
    ? wellnessResources 
    : wellnessResources.filter(resource => resource.category === activeCategory);

  const getColorClasses = (color: string) => {
    const colors = {
      purple: 'from-purple-500 to-purple-600',
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      orange: 'from-orange-500 to-orange-600',
      teal: 'from-teal-500 to-teal-600'
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Wellness Resources</h1>
        <p className="text-slate-400">Tools and resources to support your mental health journey</p>
      </div>

      {/* Personalized Recommendations */}
      {personalizedRecommendations.length > 0 && (
        <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Zap className="w-6 h-6 text-purple-400 mr-3" />
            Personalized for You
          </h2>
          <div className="grid lg:grid-cols-2 gap-4">
            {personalizedRecommendations.map((rec, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-purple-400 font-bold">{rec.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    rec.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {rec.priority} priority
                  </span>
                </div>
                <p className="text-slate-300 text-sm mb-3">{rec.description}</p>
                <div className="space-y-1">
                  {rec.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="text-sm text-slate-400 flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Wellness Resources */}
      <div className="grid lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <div 
              key={index}
              className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-200 hover:scale-105 cursor-pointer group"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${getColorClasses(resource.color)} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-white">{resource.title}</h3>
                <Play className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-200" />
              </div>
              
              <p className="text-slate-400 text-sm mb-4">{resource.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded-full">
                  {resource.duration}
                </span>
                <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded-full capitalize">
                  {resource.type}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Crisis Resources */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
        <div className="flex items-center mb-6">
          <Phone className="w-6 h-6 text-red-400 mr-3" />
          <h3 className="text-xl font-bold text-white">Crisis Support Resources</h3>
        </div>
        <p className="text-slate-300 mb-6">
          If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out for immediate help.
        </p>
        
        <div className="grid lg:grid-cols-2 gap-4">
          {crisisResources.map((resource, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${
                resource.urgent 
                  ? 'bg-red-500/20 border-red-500/50' 
                  : 'bg-slate-700/30 border-slate-600/50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className={`font-bold ${resource.urgent ? 'text-red-400' : 'text-white'}`}>
                  {resource.name}
                </h4>
                {resource.urgent && (
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                    URGENT
                  </span>
                )}
              </div>
              <p className={`font-mono text-lg mb-2 ${resource.urgent ? 'text-red-300' : 'text-blue-400'}`}>
                {resource.contact}
              </p>
              <p className="text-slate-400 text-sm">{resource.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
          <p className="text-slate-300 text-sm">
            <strong>Remember:</strong> You are not alone. These resources are confidential and available 24/7. 
            Your mental health matters, and seeking help is a sign of strength.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wellness;