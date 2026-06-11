import React from 'react';

const Loader = ({ size = 'md', color = 'blue' }) => {
  const sizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4',
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div
        className={`${sizes[size]} rounded-full border-${color}-500 border-t-transparent animate-spin`}
        style={{
          borderTopColor: 'transparent',
          borderRightColor: color === 'blue' ? '#3b82f6' : '#8b5cf6',
          borderBottomColor: color === 'blue' ? '#3b82f6' : '#8b5cf6',
          borderLeftColor: color === 'blue' ? '#3b82f6' : '#8b5cf6',
        }}
      ></div>
    </div>
  );
};

export default Loader;