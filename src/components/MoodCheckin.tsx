import React, { useState } from 'react';
import { Send, Heart, Smile, Frown, Meh } from 'lucide-react';

interface MoodCheckinProps {
  onSubmit: (entry: any) => void;
}

const MoodCheckin: React.FC<MoodCheckinProps> = ({ onSubmit }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [stressLevel, setStressLevel] = useState(5);
  const [sleepQuality, setSleepQuality] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const moodOptions = [
    { value: 1, emoji: '😢', label: 'Very Low', color: 'text-red-500' },
    { value: 2, emoji: '😔', label: 'Low', color: 'text-red-400' },
    { value: 3, emoji: '😐', label: 'Poor', color: 'text-orange-500' },
    { value: 4, emoji: '🙂', label: 'Fair', color: 'text-yellow-500' },
    { value: 5, emoji: '😊', label: 'Good', color: 'text-green-400' },
    { value: 6, emoji: '😁', label: 'Great', color: 'text-green-500' },
    { value: 7, emoji: '🤩', label: 'Excellent', color: 'text-blue-400' },
    { value: 8, emoji: '😍', label: 'Amazing', color: 'text-blue-500' },
    { value: 9, emoji: '🥳', label: 'Fantastic', color: 'text-purple-400' },
    { value: 10, emoji: '🌟', label: 'Perfect', color: 'text-purple-500' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood) {
      onSubmit({
        mood: selectedMood,
        note,
        stressLevel,
        sleepQuality,
        energy,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSelectedMood(null);
        setNote('');
        setStressLevel(5);
        setSleepQuality(5);
        setEnergy(5);
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Thank you!</h2>
          <p className="text-slate-400 text-lg">
            Your check-in has been recorded. Keep taking care of yourself! 💜
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Daily Wellness Check-in</h1>
        <p className="text-slate-400">Take a moment to reflect on how you're feeling today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Mood Selection */}
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Smile className="w-6 h-6 mr-3 text-purple-400" />
            How are you feeling overall?
          </h3>
          <div className="grid grid-cols-5 lg:grid-cols-10 gap-3">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedMood(option.value)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-110 ${
                  selectedMood === option.value
                    ? 'border-purple-500 bg-purple-500/20 scale-110'
                    : 'border-slate-600 hover:border-slate-500 bg-slate-700/30'
                }`}
              >
                <div className="text-3xl mb-2">{option.emoji}</div>
                <div className={`text-xs font-medium ${option.color}`}>
                  {option.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stress Level */}
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
            <h4 className="text-lg font-bold text-white mb-4">Stress Level</h4>
            <div className="space-y-4">
              <input
                type="range"
                min="1"
                max="10"
                value={stressLevel}
                onChange={(e) => setStressLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-slate-400">
                <span>Low</span>
                <span className="text-white font-bold">{stressLevel}/10</span>
                <span>High</span>
              </div>
            </div>
          </div>

          {/* Sleep Quality */}
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
            <h4 className="text-lg font-bold text-white mb-4">Sleep Quality</h4>
            <div className="space-y-4">
              <input
                type="range"
                min="1"
                max="10"
                value={sleepQuality}
                onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-slate-400">
                <span>Poor</span>
                <span className="text-white font-bold">{sleepQuality}/10</span>
                <span>Great</span>
              </div>
            </div>
          </div>

          {/* Energy Level */}
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
            <h4 className="text-lg font-bold text-white mb-4">Energy Level</h4>
            <div className="space-y-4">
              <input
                type="range"
                min="1"
                max="10"
                value={energy}
                onChange={(e) => setEnergy(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-slate-400">
                <span>Low</span>
                <span className="text-white font-bold">{energy}/10</span>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
          <h4 className="text-lg font-bold text-white mb-4">Additional Notes (Optional)</h4>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How was your day? Any specific thoughts or feelings you'd like to record?"
            rows={4}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={!selectedMood}
            className={`px-8 py-4 rounded-xl font-bold text-white transition-all duration-200 flex items-center mx-auto space-x-3 ${
              selectedMood
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 hover:scale-105 transform'
                : 'bg-slate-600 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
            <span>Submit Check-in</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MoodCheckin;