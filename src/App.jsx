import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container">
      <div className={`gift-box ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {/* Qopqoq */}
        <div className="lid">
          <div className="lid-face lid-top"></div>
          <div className="lid-face lid-front"></div>
          <div className="lid-face lid-back"></div>
          <div className="lid-face lid-left"></div>
          <div className="lid-face lid-right"></div>
        </div>

        {/* Quti asosiy qismlari */}
        <div className="box-face front"></div>
        <div className="box-face back"></div>
        <div className="box-face left"></div>
        <div className="box-face right"></div>
        <div className="box-face bottom"></div>

        {/* Ichidagi tabrik matni */}
        <div className={`message ${isOpen ? 'show' : ''}`}>
          <h2>Diyow</h2>
          <p>Yangi yiling muborak bo'lsin!</p>
          <span>🎁 ✨</span>
        </div>
      </div>
      
      <p className="hint">{isOpen ? "Yopish uchun bosing" : "Ochish uchun bosing"}</p>
    </div>
  );
}