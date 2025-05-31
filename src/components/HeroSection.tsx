
import { Satellite, Zap, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToPrediction = () => {
    const element = document.getElementById('prediction');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-stellar opacity-30"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="mb-8">
          <div className="relative mb-8">
            <Shield className="w-24 h-24 mx-auto text-blue-400 animate-float mb-6" />
            <div className="absolute inset-0 w-24 h-24 mx-auto bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
          </div>
          
          <div className="mb-4">
            <p className="text-xl md:text-2xl text-blue-300 mb-2 font-light tracking-wide">
              Welcome to
            </p>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-white drop-shadow-2xl font-extrabold tracking-wider">
              STELLAR
            </span>
            <span className="text-blue-400 drop-shadow-2xl font-extrabold tracking-wider ml-2">
              SAFEGUARD
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-cyan-300 mb-8 max-w-2xl mx-auto font-medium">
            Protecting space missions through intelligent failure prediction
          </p>
          
          <div className="text-base text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Advanced AI technology to extend satellite life • Ensure mission continuity • Safeguard space exploration
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-6 py-3 rounded-full border border-blue-400/30 backdrop-blur-sm">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span className="text-gray-200 font-medium">AI-Powered Analytics</span>
          </div>
          <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-6 py-3 rounded-full border border-purple-400/30 backdrop-blur-sm">
            <Shield className="w-6 h-6 text-green-400" />
            <span className="text-gray-200 font-medium">Mission Critical Protection</span>
          </div>
          <div className="flex items-center space-x-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-6 py-3 rounded-full border border-cyan-400/30 backdrop-blur-sm">
            <Satellite className="w-6 h-6 text-blue-400" />
            <span className="text-gray-200 font-medium">Space-Grade Reliability</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToPrediction}
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-10 py-4 text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 group"
          >
            Launch Prediction Analysis
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="text-sm text-gray-400">
            Upload telemetry data • Get instant predictions
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
