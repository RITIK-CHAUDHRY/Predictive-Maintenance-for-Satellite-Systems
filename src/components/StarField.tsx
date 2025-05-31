
import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  brightness: number;
  type: 'small' | 'medium' | 'large' | 'twinkle';
}

const StarField = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      
      // Generate different types of stars
      for (let i = 0; i < 150; i++) {
        const random = Math.random();
        let type: Star['type'];
        let size: number;
        let brightness: number;
        
        if (random < 0.6) {
          type = 'small';
          size = Math.random() * 1 + 0.5;
          brightness = Math.random() * 0.5 + 0.3;
        } else if (random < 0.85) {
          type = 'medium';
          size = Math.random() * 1.5 + 1;
          brightness = Math.random() * 0.4 + 0.6;
        } else if (random < 0.95) {
          type = 'large';
          size = Math.random() * 2 + 1.5;
          brightness = Math.random() * 0.3 + 0.7;
        } else {
          type = 'twinkle';
          size = Math.random() * 2.5 + 2;
          brightness = Math.random() * 0.2 + 0.8;
        }
        
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size,
          delay: Math.random() * 5,
          brightness,
          type
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="stars">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star ${star.type === 'twinkle' ? 'star-twinkle' : ''}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.brightness,
            animationDelay: `${star.delay}s`,
            animationDuration: star.type === 'twinkle' ? '2s' : '4s'
          }}
        />
      ))}
      
      {/* Add some nebula-like effects */}
      <div className="nebula nebula-1"></div>
      <div className="nebula nebula-2"></div>
      <div className="nebula nebula-3"></div>
    </div>
  );
};

export default StarField;
