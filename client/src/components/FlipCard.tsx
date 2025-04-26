import { FC } from 'react';

interface FlipCardProps {
  title: string;
  summary: string;
  description: string;
  achievements: string[];
  tags: string[];
  color: 'primary' | 'secondary' | 'accent';
}

const FlipCard: FC<FlipCardProps> = ({ title, summary, description, achievements, tags, color }) => {
  // Determine gradient and border colors based on provided color
  const colorClasses = {
    primary: {
      border: 'border-primary/30',
      gradient: 'from-background/30 to-background',
      title: 'text-primary',
      tags: 'bg-primary/20 text-primary',
    },
    secondary: {
      border: 'border-secondary/30',
      gradient: 'from-background/30 to-background',
      title: 'text-secondary',
      tags: 'bg-secondary/20 text-secondary',
    },
    accent: {
      border: 'border-accent/30',
      gradient: 'from-background/30 to-background',
      title: 'text-accent',
      tags: 'bg-accent/20 text-accent',
    }
  };

  const classes = colorClasses[color];

  return (
    <div className="flip-card h-80 perspective-1000">
      <div className="flip-card-inner relative w-full h-full">
        {/* Front */}
        <div className={`flip-card-front bg-background/30 backdrop-blur-sm rounded-lg ${classes.border} overflow-hidden`}>
          <div className="absolute inset-0 overflow-hidden">
            {/* SVG background pattern instead of image */}
            <svg
              className="w-full h-full object-cover opacity-10"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id={`grid-${color}`}
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke={color === 'primary' ? '#3a86ff' : color === 'secondary' ? '#57cc99' : '#9d4edd'}
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${color})`} />
              {/* Additional decorative elements based on card theme */}
              {color === 'primary' && (
                <g>
                  <circle cx="150" cy="150" r="50" fill="none" stroke="#3a86ff" strokeWidth="2" />
                  <circle cx="250" cy="250" r="30" fill="none" stroke="#3a86ff" strokeWidth="2" />
                </g>
              )}
              {color === 'secondary' && (
                <g>
                  <path d="M100,100 L300,100 L200,300 Z" fill="none" stroke="#57cc99" strokeWidth="2" />
                </g>
              )}
              {color === 'accent' && (
                <g>
                  <rect x="120" y="120" width="160" height="160" rx="20" fill="none" stroke="#9d4edd" strokeWidth="2" />
                </g>
              )}
            </svg>
          </div>
          <div className={`absolute inset-0 bg-gradient-to-b ${classes.gradient} p-6 flex flex-col justify-end`}>
            <h3 className={`font-orbitron text-xl font-semibold ${classes.title} mb-2`}>{title}</h3>
            <p className="text-foreground/70 line-clamp-2">{summary}</p>
            <p className="text-xs mt-4 text-foreground/50"><i className="fas fa-sync-alt mr-2"></i>Flip for details</p>
          </div>
        </div>
        
        {/* Back */}
        <div className={`flip-card-back bg-background/80 backdrop-blur-sm rounded-lg ${classes.border} p-6 flex flex-col`}>
          <h3 className={`font-orbitron text-lg font-semibold ${classes.title} mb-4`}>{title}</h3>
          
          <div className="flex-grow space-y-3 text-foreground/80 text-sm">
            <p>{description}</p>
            <p className="font-poppins font-medium text-foreground">Key Achievements:</p>
            <ul className="space-y-1 pl-4">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block">• {achievement}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className={`text-xs px-2 py-1 rounded-full ${classes.tags}`}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
