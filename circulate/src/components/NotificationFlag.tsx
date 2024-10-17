import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NotificationFlag: React.FC = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = 200; // Adjust this value to control how quickly the opacity decreases
      const newOpacity = Math.max(0, 1 - scrollTop / maxScroll);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Link to="/Products" style={{ ...styles.link, opacity }}>
      <div 
        style={styles.container}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <span style={styles.text}>Check out our listing below!</span>
        {/* Small down arrows */}
      </div>
    </Link>
  );
};

const styles = {
  link: {
    position: 'fixed' as 'fixed',
    bottom: '20px', // Lock to the bottom
    left: '50%', // Center horizontally
    transform: 'translateX(-50%)', // Translate back by 50% to perfectly center the element
    textDecoration: 'none',
    zIndex: 1000,
    transition: 'opacity 0.2s ease-out', // Smooth opacity transition
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#2B303A',
    padding: '12px 20px', // Adjust the padding for a larger button
    borderRadius: '30px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    textAlign: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'Inter, sans-serif',
  },
  
};

export default NotificationFlag;