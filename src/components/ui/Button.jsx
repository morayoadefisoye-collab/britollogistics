import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center relative overflow-hidden group';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl focus:ring-primary-500 transform hover:-translate-y-0.5',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white shadow-lg hover:shadow-xl focus:ring-secondary-500 transform hover:-translate-y-0.5',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white focus:ring-primary-500',
    ghost: 'bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:ring-neutral-500',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-lg hover:shadow-xl focus:ring-accent-500 transform hover:-translate-y-0.5',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-500',
    success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl focus:ring-green-500'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  );
};

export default Button;