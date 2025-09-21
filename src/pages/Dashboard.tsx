import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MoodPicker from '@/components/MoodPicker';
import BreathingCoach from '@/components/BreathingCoach';
import ProgressCharts from '@/components/ProgressCharts';
import AIChat from '@/components/AIChat';
import JournalSection from '@/components/JournalSection';
import { 
  FireIcon,
  SparklesIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [todayMood, setTodayMood] = useState<string | null>(null);

  const quickActions = [
    { 
      icon: HeartIcon, 
      label: "Quick Check-in", 
      action: "checkin",
      gradient: "from-success to-mint"
    },
    { 
      icon: ChatBubbleLeftRightIcon, 
      label: "Chat with AI", 
      action: "chat",
      gradient: "from-lilac to-peach"
    },
    { 
      icon: SparklesIcon, 
      label: "Breathe", 
      action: "mindfulness",
      gradient: "from-mint to-secondary"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-wellness rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">BH</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-mint to-lilac bg-clip-text text-transparent">
              Bug Hunters
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <FireIcon className="w-4 h-4" />
              {currentStreak} days
            </Badge>
            <Button size="sm" variant="outline" className="text-danger border-danger hover:bg-danger hover:text-white">
              Emergency Exit
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
          <p className="text-muted-foreground text-lg">
            You're doing great. Let's continue your wellness journey.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="mood-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-3xl font-bold text-success">{currentStreak}</p>
                  <p className="text-sm text-muted-foreground">consecutive days</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-success to-mint rounded-full flex items-center justify-center">
                  <FireIcon className="w-6 h-6 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mood-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Focus</p>
                  <p className="text-lg font-semibold">Mindful Breathing</p>
                  <p className="text-sm text-muted-foreground">5 min session</p>
                </div>
                <div className="w-12 h-12 bg-gradient-mood rounded-full flex items-center justify-center animate-pulse-glow">
                  <SparklesIcon className="w-6 h-6 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mood-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Wellness Score</p>
                  <p className="text-3xl font-bold text-lilac">82</p>
                  <p className="text-sm text-success">+5 from last week</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-lilac to-peach rounded-full flex items-center justify-center">
                  <ChartBarIcon className="w-6 h-6 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={action.label}
                variant="outline"
                className="h-20 flex flex-col gap-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-mood"
              >
                <action.icon className="w-6 h-6" />
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Main Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue="checkin" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="checkin" className="flex items-center gap-2">
                <HeartIcon className="w-4 h-4" />
                Check-in
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex items-center gap-2">
                <BookOpenIcon className="w-4 h-4" />
                Journal
              </TabsTrigger>
              <TabsTrigger value="mindfulness" className="flex items-center gap-2">
                <SparklesIcon className="w-4 h-4" />
                Mindfulness
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <ChartBarIcon className="w-4 h-4" />
                Progress
              </TabsTrigger>
            </TabsList>

            <TabsContent value="checkin" className="space-y-6">
              <Card className="mood-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeartIcon className="w-5 h-5 text-mint" />
                    How are you feeling today?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MoodPicker onMoodSelect={setTodayMood} selectedMood={todayMood} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              <AIChat />
            </TabsContent>

            <TabsContent value="journal" className="space-y-6">
              <JournalSection />
            </TabsContent>

            <TabsContent value="mindfulness" className="space-y-6">
              <BreathingCoach />
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <ProgressCharts />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;