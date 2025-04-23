// TypingAnimation.jsx
import React from "react";

const TypingAnimation = () => {
  return (
    <div className="flex items-center space-x-1">
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
    </div>
  );
};

export default TypingAnimation;
