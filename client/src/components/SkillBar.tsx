import { motion } from 'framer-motion';
import { FC } from 'react';

interface SkillBarProps {
  name: string;
  color: 'primary' | 'secondary';
  delay: number;
  isInView: boolean;
}

const SkillBar: FC<SkillBarProps> = ({ name, color, delay, isInView }) => {
  const textColorClass = color === 'primary' ? 'text-primary' : 'text-secondary';

  return (
    <div className="skill-item">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, delay }}
        className="mb-2"
      >
        <span className={`font-medium ${textColorClass}`}>{name}</span>
      </motion.div>
    </div>
  );
};

export default SkillBar;