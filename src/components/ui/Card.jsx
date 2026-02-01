import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'p-6',
  variant = 'default',
  ...props 
}) => {
  const variants = {
    default: 'bg-white border border-neutral-200',
    glass: 'bg-white/80 backdrop-blur-sm border border-white/20',
    gradient: 'bg-gradient-to-br from-white to-neutral-50 border border-neutral-200',
    elevated: 'bg-white border-0 shadow-xl',
  };

  const baseClasses = `
    rounded-3xl transition-all duration-300
    ${hover ? 'hover:shadow-2xl hover:-translate-y-2 cursor-pointer group' : 'shadow-lg'}
    ${variants[variant]}
    ${padding}
    ${className}
  `;

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;