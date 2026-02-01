import React from 'react';

const Section = ({ 
  children, 
  className = '', 
  background = 'bg-white',
  padding = 'py-16',
  maxWidth = 'max-w-7xl',
  ...props 
}) => {
  return (
    <section className={`${background} ${padding} ${className}`} {...props}>
      <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 w-full`}>
        {children}
      </div>
    </section>
  );
};

export default Section;