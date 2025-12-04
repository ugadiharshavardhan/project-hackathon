import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hoverable = false,
  padding = 'p-6',
  onClick,
  ...props
}) => {
  const baseStyles = 'bg-white rounded-xl shadow-sm overflow-hidden';
  const hoverStyles = hoverable ? 'hover:shadow-md transition-shadow duration-200' : '';
  
  const cardContent = (
    <div className={`${baseStyles} ${hoverStyles} ${padding} ${className}`} {...props}>
      {children}
    </div>
  );

  if (onClick) {
    return (
      <motion.div 
        whileHover={hoverable ? { y: -2 } : {}} 
        whileTap={hoverable ? { scale: 0.98 } : {}}
        onClick={onClick}
        className="cursor-pointer"
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`border-b border-gray-200 px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`mt-1 text-sm text-gray-500 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`border-t border-gray-200 px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
