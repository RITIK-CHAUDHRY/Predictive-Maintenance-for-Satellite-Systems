
import StarField from '@/components/StarField';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PredictionSection from '@/components/PredictionSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-space-gradient text-white relative">
      <StarField />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PredictionSection />
      <Footer />
    </div>
  );
};

export default Index;
