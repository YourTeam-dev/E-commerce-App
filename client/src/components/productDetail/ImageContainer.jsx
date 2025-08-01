import React, { useEffect, useState } from 'react';

const ImageContainer = () => {
  return (
    <div style={{ 
      width: '50%', 
      padding: '20px', 
      background: '#f9f9f9', 
      borderRadius: '10px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center' ,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      marginBottom: '220px',
      marginTop: '40px',
      marginLeft: '40px'
    }}>
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        maxWidth: '600px' 
      }}>
        <button style={{ 
          position: 'absolute', 
          left: '10px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          border: 'none', 
          background: 'rgba(0, 0, 0, 0.5)', 
          color: 'white', 
          borderRadius: '50%', 
          width: '30px', 
          height: '30px', 
          cursor: 'pointer' 
        }}>‹</button>
        <div style={{ 
          background: '#6a87c7', 
          height: '400px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'white', 
          fontSize: '24px', 
          borderRadius: '10px' 
        }}>
          Product Image 1
        </div>
        <button style={{ 
          position: 'absolute', 
          right: '10px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          border: 'none', 
          background: 'rgba(0, 0, 0, 0.5)', 
          color: 'white', 
          borderRadius: '50%', 
          width: '30px', 
          height: '30px', 
          cursor: 'pointer' 
        }}>›</button>
      </div>
      <div style={{ 
        marginTop: '20px', 
        width: '100px', 
        height: '100px', 
        border: '2px solid #000', 
        borderRadius: '5px' 
      }}></div>
    </div>
  );
};

export default ImageContainer;