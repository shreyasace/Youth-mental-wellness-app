import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-wellness.jpg';
import { 
  HeartIcon, 
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Landing = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: HeartIcon,
      title: "Mood Tracking",
      description: "Daily check-ins with emotional insights and pattern recognition."
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "AI Companion",
      description: "24/7 supportive chat with CBT-inspired guidance and crisis detection."
    },
    {
      icon: BookOpenIcon,
      title: "Smart Journal",
      description: "Reflective prompts with AI-powered insights and thought pattern analysis."
    },
    {
      icon: SparklesIcon,
      title: "Mindfulness",
      description: "Breathing exercises, meditation guides, and calming techniques."
    },
    {
      icon: ChartBarIcon,
      title: "Progress Tracking",
      description: "Visual wellness trends, streak counters, and achievement milestones."
    },
    {
      icon: ShieldCheckIcon,
      title: "Privacy & Safety",
      description: "Youth-safe design with crisis support and data protection."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 gradient-hero" />
        <img 
          src={heroImage} 
          alt="Mental wellness illustration" 
          className="absolute inset-0 w-full h-full object-cover opacity-20" 
        />
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
                🧠 Mental Wellness for Gen-Z
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-mint via-lilac to-peach bg-clip-text text-transparent">
                Your Private AI Companion for Everyday Mental Health
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Safe, supportive, and always available. Track your mood, chat with an AI coach, 
                and build healthy habits with our youth-focused mental wellness platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="btn-hero text-lg px-8 py-4"
                  onClick={() => navigate('/app')}
                >
                  Try Judge Demo
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="btn-hero-outline text-lg px-8 py-4"
                  onClick={() => navigate('/app')}
                >
                  Start Free
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-mint/20 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-lilac/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-peach/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How <span className="bg-gradient-to-r from-mint to-lilac bg-clip-text text-transparent">Bug Hunters</span> Helps
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive mental wellness tools designed specifically for young people, 
              with safety and privacy at the core.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="mood-card h-full">
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="w-16 h-16 bg-gradient-wellness rounded-2xl flex items-center justify-center mb-4">
                      <feature.icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Privacy Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-success to-mint bg-clip-text text-transparent">
                Safety First
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <Card className="glass p-8">
                <ShieldCheckIcon className="w-12 h-12 text-success mb-4" />
                <h3 className="text-xl font-semibold mb-4">Crisis Detection</h3>
                <p className="text-muted-foreground">
                  Our AI monitors for crisis keywords and immediately provides 
                  appropriate resources and helpline information when needed.
                </p>
              </Card>
              
              <Card className="glass p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-lilac to-peach rounded-lg flex items-center justify-center mb-4">
                  <div className="text-2xl">🔒</div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Your Data, Your Control</h3>
                <p className="text-muted-foreground">
                  End-to-end privacy with secure data storage. You own your data 
                  and can delete it anytime.
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of young people taking control of their mental health 
              with Bug Hunters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-hero text-lg px-8 py-4"
                onClick={() => navigate('/app')}
              >
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="btn-hero-outline text-lg px-8 py-4"
                onClick={() => navigate('/app')}
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;