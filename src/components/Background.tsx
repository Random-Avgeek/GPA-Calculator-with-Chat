import React from 'react';

interface BackgroundProps {
  isDark: boolean;
}

const Background: React.FC<BackgroundProps> = ({ isDark }) => {
  const renderTriangleGrid = () => {
    const rows = 5;
    const trianglesPerRow = 8;
    
    // Choose colors based on theme
    const colors = isDark 
      ? ['orange', 'white', 'skyblue'] 
      : ['orange', 'indigo', 'skyblue'];
    
    return Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="triangle-row" style={{ top: `${rowIndex * 20}%` }}>
        {Array.from({ length: trianglesPerRow }).map((_, colIndex) => {
          const colorIndex = (rowIndex + colIndex) % 3;
          const delay = (rowIndex * trianglesPerRow + colIndex) * 0.2;
          return (
            <div 
              key={colIndex}
              className={`triangle ${colors[colorIndex]}`}
              style={{ 
                animationDelay: `${delay}s`,
                left: `${(colIndex / trianglesPerRow) * 100}%`
              }}
            />
          );
        })}
      </div>
    ));
  };

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none transition-colors duration-500 ${
      isDark ? 'bg-gradient-to-bl from-black via-gray-900 to-gray-800' : 'bg-gradient-to-bl from-indigo-50 via-blue-50 to-white'
    }`}>
      {renderTriangleGrid()}
    </div>
  );
};

export default Background;