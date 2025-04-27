import { motion } from 'framer-motion';
import { FC } from 'react';

interface SkillBarProps {
  name: string;
  percentage: number;
  color: 'primary' | 'secondary';
  delay: number;
  isInView: boolean;
}

const SkillBar: FC<SkillBarProps> = ({ name, percentage, color, delay, isInView }) => {
  const variants = {
    hidden: { width: 0 },
    visible: { width: `${percentage}%` }
  };

  const textColorClass = color === 'primary' ? 'text-primary' : 'text-secondary';
  const gradientClass = color === 'primary' 
    ? 'bg-gradient-to-r from-primary to-secondary' 
    : 'bg-gradient-to-r from-secondary to-accent';

  // Remove progress bar visual representation
  const getProgressBar = (percentage: number) => {
    return `${percentage}%`;
  };

  return (
    <div className="skill-item">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, delay }}
        className="mb-2 flex justify-between items-center"
      >
        <span className={`font-medium ${textColorClass}`}>{name}</span>
        <span className={`${textColorClass} font-mono text-sm`}>{getProgressBar(percentage)}</span>
      </motion.div>
      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
          className={`h-full ${gradientClass} rounded-full`}
        />
      </div>
    </div>
  );
};

export default SkillBar;
