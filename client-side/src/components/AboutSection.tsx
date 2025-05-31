
import { Target, Brain, Rocket, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Analytics",
      description: "Machine learning algorithms trained on extensive satellite data to predict component failures with high accuracy"
    },
    {
      icon: Target,
      title: "Precision Forecasting",
      description: "Identify potential failures weeks or months in advance, enabling proactive maintenance and mission planning"
    },
    {
      icon: Rocket,
      title: "Mission Extension",
      description: "Extend satellite mission life by optimizing component usage and scheduling preventive interventions"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Led by data scientists with decades of satellite operations experience"
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Stellar-SafeGuard
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing satellite operations with cutting-edge AI technology that predicts component failures 
            before they happen, ensuring mission success and maximizing the lifespan of valuable space assets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="glass-effect border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="glass-effect rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-white">Our Mission</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Space missions represent humanity's greatest technological achievements and cost billions of dollars. 
                A single component failure can end a mission prematurely, wasting years of development and scientific opportunities.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Stellar-SafeGuard uses advanced machine learning to analyze telemetry data, environmental conditions, and 
                component health metrics to predict failures before they occur, enabling mission teams to take 
                proactive measures and extend satellite operational life.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                <Rocket className="w-32 h-32 text-blue-400 animate-float" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
