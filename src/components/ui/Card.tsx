import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const cardClasses = `
    bg-white rounded-xl shadow-sm border border-gray-200
    ${paddingClasses[padding]}
    ${className}
  `;

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -2, boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        transition={{ duration: 0.2 }}
        className={cardClasses}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};
