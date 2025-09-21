import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  SparklesIcon, 
  BookOpenIcon,
  LightBulbIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const JournalSection = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [isReflecting, setIsReflecting] = useState(false);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [showInsights, setShowInsights] = useState(false);

  const dailyPrompts = [
    "What made you smile today?",
    "What challenge did you overcome today?",
    "What are you grateful for right now?",
    "How did you show kindness to yourself today?",
    "What's one thing you learned about yourself today?",
    "What would you tell your past self from a week ago?",
    "What's something you're looking forward to?",
    "How did you practice self-care today?"
  ];

  const [currentPrompt] = useState(
    dailyPrompts[Math.floor(Math.random() * dailyPrompts.length)]
  );

  const generateAIInsights = (entry: string): string[] => {
    // Mock AI insights based on journal content
    const insights = [
      "I notice you're processing some complex emotions - that takes real self-awareness.",
      "You mentioned feeling grateful, which research shows can boost mood and wellbeing.",
      "It sounds like you're being kind to yourself, which is an important skill to develop.",
      "You're taking time to reflect, which helps build emotional intelligence.",
      "Consider celebrating the small wins you mentioned - they add up to big changes."
    ];

    // Return random insights based on entry length/content
    const numInsights = Math.min(3, Math.floor(entry.length / 100) + 1);
    return insights.slice(0, numInsights);
  };

  const handleReflectWithAI = async () => {
    if (!journalEntry.trim()) return;

    setIsReflecting(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const insights = generateAIInsights(journalEntry);
      setAiInsights(insights);
      setShowInsights(true);
      setIsReflecting(false);
    }, 2000);
  };

  const previousEntries = [
    {
      date: "Today",
      preview: "Had a really productive day at school. Felt anxious about the presentation but...",
      mood: "good"
    },
    {
      date: "Yesterday", 
      preview: "Struggled with some negative thoughts today. Practiced breathing exercises...",
      mood: "neutral"
    },
    {
      date: "3 days ago",
      preview: "Amazing day! Hung out with friends and felt really connected and happy...",
      mood: "great"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Daily Prompt */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-peach" />
            Today's Reflection Prompt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-mood rounded-lg p-4 mb-4">
            <p className="text-black font-medium text-lg">{currentPrompt}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Take a moment to reflect on this question. There's no right or wrong answer.
          </p>
        </CardContent>
      </Card>

      {/* Journal Entry */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpenIcon className="w-5 h-5 text-mint" />
            Your Journal Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Write about your day, thoughts, feelings, or anything on your mind..."
            className="min-h-[200px] resize-none text-base leading-relaxed"
          />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              className="btn-hero flex-1"
              disabled={!journalEntry.trim()}
            >
              💾 Save Entry
            </Button>
            <Button 
              variant="outline"
              onClick={handleReflectWithAI}
              disabled={!journalEntry.trim() || isReflecting}
              className="flex items-center gap-2 border-lilac text-lilac hover:bg-lilac hover:text-black"
            >
              {isReflecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Reflecting...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4" />
                  Reflect with AI
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      {showInsights && aiInsights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass border-lilac/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LightBulbIcon className="w-5 h-5 text-lilac" />
                AI Insights & Reflections
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-lilac to-peach rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-black text-xs">💡</span>
                  </div>
                  <p className="text-sm">{insight}</p>
                </motion.div>
              ))}
              
              <div className="mt-4 p-3 bg-gradient-to-r from-mint/10 to-success/10 rounded-lg border border-mint/20">
                <h4 className="font-medium text-sm mb-1 text-mint">Suggested Action:</h4>
                <p className="text-sm text-muted-foreground">
                  Try spending 5 minutes tomorrow doing something that brought you joy today.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Previous Entries */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpenIcon className="w-5 h-5 text-secondary" />
            Recent Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {previousEntries.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-3 border border-border/50 rounded-lg hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{entry.date}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      entry.mood === 'great' ? 'border-success text-success' :
                      entry.mood === 'good' ? 'border-mint text-mint' :
                      'border-muted-foreground text-muted-foreground'
                    }`}
                  >
                    {entry.mood}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {entry.preview}
                </p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalSection;