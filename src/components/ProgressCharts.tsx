import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChartBarIcon,
  CalendarIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const ProgressCharts = () => {
  // Mock data for charts
  const moodData = [
    { day: 'Mon', mood: 4, color: '#66E3A8' },
    { day: 'Tue', mood: 3, color: '#57E6C5' },
    { day: 'Wed', mood: 5, color: '#66E3A8' },
    { day: 'Thu', mood: 2, color: '#FFD36E' },
    { day: 'Fri', mood: 4, color: '#66E3A8' },
    { day: 'Sat', mood: 5, color: '#66E3A8' },
    { day: 'Sun', mood: 4, color: '#66E3A8' }
  ];

  const wellnessScore = 82;
  const weeklyChange = 5;
  const streakDays = 7;
  const journalEntries = 12;

  const stats = [
    {
      title: "Current Streak",
      value: `${streakDays} days`,
      change: "+2 this week",
      positive: true,
      icon: "🔥"
    },
    {
      title: "Journal Entries",
      value: journalEntries,
      change: "+3 this week", 
      positive: true,
      icon: "📖"
    },
    {
      title: "Mindfulness Sessions",
      value: "8",
      change: "+1 this week",
      positive: true,
      icon: "🧘"
    },
    {
      title: "Average Mood",
      value: "4.1/5",
      change: "+0.3 this week",
      positive: true,
      icon: "😊"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Wellness Score */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-success" />
            Weekly Wellness Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-4xl font-bold text-success mb-2">{wellnessScore}</div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className="text-success border-success"
                >
                  <span className="mr-1">↗</span>
                  +{weeklyChange} this week
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Out of 100</div>
              <div className="text-sm text-muted-foreground">
                Based on mood, activity, and engagement
              </div>
            </div>
          </div>
          
          {/* Score Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Mood Consistency</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-gradient-to-r from-mint to-success rounded-full" />
                </div>
                <span className="text-sm font-medium">80%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Self-Care Activities</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-lilac to-peach rounded-full" />
                </div>
                <span className="text-sm font-medium">95%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Reflection & Growth</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-peach to-warning rounded-full" />
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mood Trend */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-mint" />
            7-Day Mood Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Simple Bar Chart */}
            <div className="flex items-end justify-between h-32 px-2">
              {moodData.map((data, index) => (
                <motion.div
                  key={data.day}
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.mood / 5) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <div 
                    className="w-8 rounded-t-md"
                    style={{ 
                      backgroundColor: data.color,
                      height: `${(data.mood / 5) * 100}%`,
                      minHeight: '8px'
                    }}
                  />
                  <span className="text-xs text-muted-foreground">{data.day}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Mood Scale Legend */}
            <div className="flex justify-between text-xs text-muted-foreground px-2">
              <span>1 - Struggling</span>
              <span>5 - Thriving</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="mood-card">
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl">{stat.icon}</div>
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.title}</div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      stat.positive 
                        ? 'text-success border-success' 
                        : 'text-warning border-warning'
                    }`}
                  >
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Activity Calendar */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-lilac" />
            Activity Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 28 }, (_, i) => {
                const activity = Math.random() > 0.3;
                const intensity = Math.random();
                return (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-sm ${
                      activity 
                        ? intensity > 0.7 
                          ? 'bg-mint' 
                          : intensity > 0.4 
                          ? 'bg-mint/60' 
                          : 'bg-mint/30'
                        : 'bg-muted'
                    }`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Less active</span>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-muted rounded-sm" />
                <div className="w-3 h-3 bg-mint/30 rounded-sm" />
                <div className="w-3 h-3 bg-mint/60 rounded-sm" />
                <div className="w-3 h-3 bg-mint rounded-sm" />
              </div>
              <span>More active</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Section */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle>Export Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowDownTrayIcon className="w-4 h-4" />
              Download PDF Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowDownTrayIcon className="w-4 h-4" />
              Export Data (CSV)
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Share your progress with healthcare providers or keep personal records.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressCharts;