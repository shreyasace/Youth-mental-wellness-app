import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  PlayIcon, 
  PauseIcon,
  StopIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';

const BreathingCoach = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [seconds, setSeconds] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [technique, setTechnique] = useState('4-4-4-4'); // Box breathing

  const techniques = {
    '4-4-4-4': { name: 'Box Breathing', inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
    '4-7-8': { name: '4-7-8 Technique', inhale: 4, hold1: 7, exhale: 8, hold2: 0 },
    '5-5-5': { name: 'Equal Breathing', inhale: 5, hold1: 0, exhale: 5, hold2: 0 }
  };

  const currentTechnique = techniques[technique as keyof typeof techniques];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const newSeconds = prev + 1;
          
          // Transition logic based on current technique
          if (phase === 'inhale' && newSeconds >= currentTechnique.inhale) {
            if (currentTechnique.hold1 > 0) {
              setPhase('hold');
              return 0;
            } else {
              setPhase('exhale');
              return 0;
            }
          } else if (phase === 'hold' && newSeconds >= currentTechnique.hold1) {
            setPhase('exhale');
            return 0;
          } else if (phase === 'exhale' && newSeconds >= currentTechnique.exhale) {
            if (currentTechnique.hold2 > 0) {
              setPhase('rest');
              return 0;
            } else {
              setPhase('inhale');
              setCycle(prev => prev + 1);
              return 0;
            }
          } else if (phase === 'rest' && newSeconds >= currentTechnique.hold2) {
            setPhase('inhale');
            setCycle(prev => prev + 1);
            return 0;
          }
          
          return newSeconds;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase, currentTechnique]);

  const handleStart = () => {
    setIsActive(true);
    setSeconds(0);
    setPhase('inhale');
    setCycle(0);
  };

  const handlePause = () => {
    setIsActive(!isActive);
  };

  const handleStop = () => {
    setIsActive(false);
    setSeconds(0);
    setPhase('inhale');
    setCycle(0);
  };

  const getInstructions = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'rest':
        return 'Rest';
      default:
        return 'Ready?';
    }
  };

  const getCircleScale = () => {
    const progress = seconds / (
      phase === 'inhale' ? currentTechnique.inhale :
      phase === 'hold' ? currentTechnique.hold1 :
      phase === 'exhale' ? currentTechnique.exhale :
      currentTechnique.hold2
    );
    
    if (phase === 'inhale') return 1 + (progress * 0.5);
    if (phase === 'exhale') return 1.5 - (progress * 0.5);
    return phase === 'hold' ? 1.5 : 1;
  };

  const breathingExercises = [
    {
      title: "Quick 2-Minute Session",
      description: "Perfect for a busy day",
      duration: "2 min",
      difficulty: "Easy"
    },
    {
      title: "Deep Relaxation",
      description: "For stress relief and calm",
      duration: "5 min", 
      difficulty: "Medium"
    },
    {
      title: "Sleep Preparation",
      description: "Wind down for bedtime",
      duration: "10 min",
      difficulty: "Easy"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Breathing Circle */}
      <Card className="mood-card text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <SparklesIcon className="w-5 h-5 text-mint" />
            Guided Breathing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Technique Selector */}
          <div className="flex justify-center gap-2 flex-wrap">
            {Object.entries(techniques).map(([key, tech]) => (
              <Button
                key={key}
                variant={technique === key ? "default" : "outline"}
                size="sm"
                onClick={() => setTechnique(key)}
                disabled={isActive}
                className={technique === key ? "bg-gradient-wellness text-black" : ""}
              >
                {tech.name}
              </Button>
            ))}
          </div>

          {/* Breathing Circle */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <motion.div
                animate={{ 
                  scale: getCircleScale(),
                  opacity: phase === 'exhale' ? 0.7 : 1
                }}
                transition={{ 
                  duration: 1,
                  ease: "easeInOut"
                }}
                className="w-32 h-32 rounded-full bg-gradient-to-r from-mint via-lilac to-peach flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: isActive ? 360 : 0 }}
                  transition={{ 
                    duration: 4,
                    repeat: isActive ? Infinity : 0,
                    ease: "linear"
                  }}
                  className="w-24 h-24 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center"
                >
                  <span className="text-white text-sm font-medium">
                    {isActive ? seconds + 1 : '✨'}
                  </span>
                </motion.div>
              </motion.div>
              
              {/* Floating particles */}
              {isActive && (
                <>
                  <motion.div
                    animate={{ 
                      y: [-10, -30, -10],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-4 left-8 w-2 h-2 bg-mint rounded-full"
                  />
                  <motion.div
                    animate={{ 
                      y: [-10, -30, -10],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute top-4 right-8 w-2 h-2 bg-lilac rounded-full"
                  />
                  <motion.div
                    animate={{ 
                      y: [-10, -30, -10],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute bottom-4 left-1/2 w-2 h-2 bg-peach rounded-full"
                  />
                </>
              )}
            </div>

            {/* Instructions */}
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-mint">
                {getInstructions()}
              </h3>
              {isActive && (
                <p className="text-muted-foreground">
                  Cycle {cycle + 1} • {currentTechnique.name}
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-3">
              {!isActive ? (
                <Button onClick={handleStart} className="btn-hero flex items-center gap-2">
                  <PlayIcon className="w-4 h-4" />
                  Start
                </Button>
              ) : (
                <>
                  <Button onClick={handlePause} variant="outline" className="flex items-center gap-2">
                    <PauseIcon className="w-4 h-4" />
                    Pause
                  </Button>
                  <Button onClick={handleStop} variant="outline" className="flex items-center gap-2">
                    <StopIcon className="w-4 h-4" />
                    Stop
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breathing Exercises */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {breathingExercises.map((exercise, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="mood-card h-full cursor-pointer hover:shadow-mood transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">{exercise.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {exercise.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {exercise.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {exercise.difficulty}
                    </span>
                    <Button size="sm" variant="outline" className="text-xs">
                      Start Session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tips */}
      <Card className="glass border-mint/20">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-mint">💡</span>
            Breathing Tips
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Find a comfortable position, sitting or lying down</li>
            <li>• Place one hand on your chest, one on your belly</li>
            <li>• Focus on breathing from your diaphragm (belly should rise)</li>
            <li>• If your mind wanders, gently return focus to your breath</li>
            <li>• Practice regularly for best results</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreathingCoach;