import { motion } from 'framer-motion';
import { FC } from 'react';

interface TimelineItemProps {
  title: string;
  period: string;
  description: string;
  color: string;
  delay: number;
  isInView: boolean;
}

const TimelineItem: FC<TimelineItemProps> = ({ title, period, description, color, delay, isInView }) => {
  const fadeInVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  // Determine text color based on provided color prop
  const textColorClass = `text-${color}`;

  return (
    <motion.div 
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInVariant}
      transition={{ duration: 0.5, delay }}
      className="relative timeline-item pl-8 transform hover:translate-x-2 transition-transform duration-300"
    >
      <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full bg-${color}`}></div>
      <h4 className={`font-poppins text-lg font-semibold ${textColorClass}`}>{title}</h4>
      <p className="text-sm text-foreground/60 mb-2">{period}</p>
      <p className="text-foreground/80">{description}</p>
    </motion.div>
  );
};

export default TimelineItem;
