import React, { useState } from 'react';
import { Satellite, Mail, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const [showMailCard, setShowMailCard] = useState(false);

  const toggleMailCard = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMailCard(!showMailCard);
  };

  return (
    <footer className="relative py-16 border-t border-blue-500/30">
      <div className="absolute inset-0 bg-gradient-to-t from-space-dark to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Satellite className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                StellarSafeguard
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Advanced AI-powered satellite component failure prediction to extend mission life 
              and ensure the success of space exploration missions worldwide.
            </p>
            <div className="flex space-x-4 relative">
              <a href="https://github.com/RITIK-CHAUDHRY" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/ritik-chaudhry" target='"_blank' rel='noopener nonreferrer' className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" onClick={toggleMailCard} className="text-gray-400 hover:text-blue-400 transition-colors relative z-20">
                <Mail className="w-6 h-6" />
              </a>
              {showMailCard && (
                <>
                  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20" onClick={() => setShowMailCard(false)}></div>
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-900/90 to-purple-900/90 text-white p-6 rounded shadow-lg z-30 w-80 max-w-full">
                    <p className="text-base break-words">ritikchaudhry1305@gmail.com</p>
                  </div>
                </>
              )}
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
              © 2025 StellarSafeguard. All rights reserved.
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
