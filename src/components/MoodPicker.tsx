import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

interface MoodPickerProps {
  onMoodSelect: (mood: string) => void;
  selectedMood: string | null;
}

const MoodPicker = ({ onMoodSelect, selectedMood }: MoodPickerProps) => {
  const [note, setNote] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const moods = [
    { emoji: '😰', label: 'Anxious', value: 'anxious', color: 'from-warning to-danger' },
    { emoji: '😔', label: 'Sad', value: 'sad', color: 'from-muted to-warning' },
    { emoji: '😐', label: 'Neutral', value: 'neutral', color: 'from-muted to-secondary' },
    { emoji: '😊', label: 'Good', value: 'good', color: 'from-mint to-success' },
    { emoji: '🤗', label: 'Great', value: 'great', color: 'from-success to-mint' }
  ];

  const tags = [
    'Stressed', 'Tired', 'Anxious', 'Excited', 'Grateful', 'Overwhelmed',
    'Peaceful', 'Motivated', 'Lonely', 'Happy', 'Frustrated', 'Hopeful'
  ];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleMoodSelect = (mood: string) => {
    onMoodSelect(mood);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6">
      {/* Mood Scale */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Rate your mood (1-5)</h3>
        <div className="grid grid-cols-5 gap-3">
          {moods.map((mood, index) => (
            <motion.div
              key={mood.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button
                variant={selectedMood === mood.value ? "default" : "outline"}
                onClick={() => handleMoodSelect(mood.value)}
                className={`h-20 w-full flex flex-col gap-2 relative overflow-hidden ${
                  selectedMood === mood.value 
                    ? `bg-gradient-to-r ${mood.color} text-black border-none` 
                    : 'hover:border-primary/50'
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs font-medium">{mood.label}</span>
                {selectedMood === mood.value && showConfetti && (
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="text-4xl">✨</span>
                  </motion.div>
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Emotion Tags */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-4">What else are you feeling?</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedTags.includes(tag) 
                    ? 'bg-gradient-to-r from-lilac to-peach text-black hover:opacity-80' 
                    : 'hover:border-primary/50'
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      {/* Optional Note */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-4">Anything you'd like to add?</h3>
          <Textarea
            placeholder="Share what's on your mind... (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </motion.div>
      )}

      {/* Save Button */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button 
            className="w-full btn-hero text-lg py-6"
            onClick={() => {
              // Save mood data
              console.log({ mood: selectedMood, tags: selectedTags, note });
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 2000);
            }}
          >
            ✨ Save Check-in
          </Button>
        </motion.div>
      )}

      {/* Feedback Card */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="glass p-6 border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-wellness rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-black text-sm">💙</span>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Great job checking in!</h4>
                <p className="text-sm text-muted-foreground">
                  Regular mood tracking helps you understand patterns and build self-awareness. 
                  You're taking an important step in your wellness journey.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default MoodPicker;