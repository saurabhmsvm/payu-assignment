import React from 'react';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, black, #001f4d)', // Darker navy blue
      color: '#00ffff', // Neon blue text color
      animation: 'glow 4s', // CSS animation for glowing effect
    }}>
      <style>
        {`
        @keyframes glow {
          0% {
            text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
            box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
          }
          25% {
            text-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff;
            box-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff;
          }
          50% {
            text-shadow: 0 0 20px #ffff00, 0 0 30px #ffff00, 0 0 40px #ffff00;
            box-shadow: 0 0 20px #ffff00, 0 0 30px #ffff00, 0 0 40px #ffff00;
          }
          75% {
            text-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00;
            box-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00;
          }
          100% {
            text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
            box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
          }
        }
        `}
      </style>
      <div style={{
        padding: '40px',
        borderRadius: '8px',
        backgroundColor: 'rgba(68, 50, 99, 0.2)', // Semi-transparent black background for the inner container
        boxShadow: '0 0 10px #00ffff', // Glow effect
      }}>
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
