
import { Satellite, Mail, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-blue-500/30">
      <div className="absolute inset-0 bg-gradient-to-t from-space-dark to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Satellite className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SatPredict
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Advanced AI-powered satellite component failure prediction to extend mission life 
              and ensure the success of space exploration missions worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Failure Prediction</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Health Monitoring</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Mission Planning</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Data Analytics</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-500/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 SatPredict. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Built with ❤️ by RITIK-CHAUDHRY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
