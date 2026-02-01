import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  className = '',
  required = false,
  disabled = false,
  ...props 
}) => {
  const inputClasses = `
    w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${error 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300 hover:border-yellow-400'
    }
    ${className}
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClasses}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;