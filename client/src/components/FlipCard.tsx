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
    <div className="group h-[400px] w-full perspective-1000 cursor-pointer">
      <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
        {/* Front */}
        <div className={`absolute inset-0 backface-hidden bg-background/30 backdrop-blur-sm rounded-lg ${classes.border} overflow-hidden`}>
          <div className="absolute inset-0">
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
            </svg>
          </div>
          <div className={`absolute inset-0 bg-gradient-to-b ${classes.gradient} p-6 flex flex-col justify-between`}>
            <h3 className={`font-orbitron text-2xl font-semibold ${classes.title}`}>{title}</h3>
            <div>
              <p className="text-foreground/70 text-lg mb-4">{summary}</p>
              <p className="text-xs text-foreground/50"><i className="fas fa-sync-alt mr-2"></i>Click to view details</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-background/80 backdrop-blur-sm rounded-lg ${classes.border} p-6 flex flex-col`}>
          <h3 className={`font-orbitron text-xl font-semibold ${classes.title} mb-4`}>{title}</h3>

          <div className="flex-grow space-y-4 text-foreground/80">
            <p className="text-sm">{description}</p>
            <div>
              <h4 className="font-poppins font-medium text-foreground mb-2">Key Achievements:</h4>
              <ul className="space-y-2 pl-4">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="mr-2">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
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