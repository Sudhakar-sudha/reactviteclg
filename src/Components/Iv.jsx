import React from 'react'

import '../App.css'
const Iv = () => {
    

  const symbols = Array.from({ length: 150 }, () => "?"); // Create an array of "?"
  return (
    <div>

 <div className="flex items-center justify-center h-screen bg-green-500">
 <div className="kerala-container">
   <span className="letter from-right">K</span>
   <span className="letter from-left">E</span>
   <span className="letter from-up">R</span>
   <span className="letter from-down">A</span>
   <span className="letter from-right">L</span>
   <span className="letter from-left">A</span>
 </div>
 </div>




 <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/fire.jpg')" }}>
      <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r text-white animate-shadow">
        WHEN
      </h1>
    </div>

    
 <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden">
   
      <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 opacity-30 animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-600 opacity-40 animate-spin-slow"></div>
      <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-pink-400 to-yellow-400 opacity-50 animate-spin-reverse"></div>


      <div className="text-center relative z-10">
    
        <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-white to-pink-500 animate-fade-in">
          22<span className="text-purple-500">-</span>01<span className="text-green-500">-</span>2025
        </h1>

        <h2 className="text-6xl md:text-8xl font-bold text-white animate-pulse-glow mt-4">
          TO
        </h2>

        <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-white to-pink-500 animate-fade-in mt-4">
          24<span className="text-purple-500">-</span>01<span className="text-green-500">-</span>2025
        </h1>
      </div>
    </div>




    <div className="relative min-h-screen bg-black overflow-hidden">
      {symbols.map((symbol, index) => {
        const randomX = Math.random() * 100; // Random horizontal position
        const randomY = Math.random() * 100; // Random vertical position
        const randomSize = 3 + Math.random() * 3; // Random size (2rem to 5rem)
        const randomOpacity = 0.5 + Math.random() * 0.5; // Random opacity (0.5 to 1)
        const randomDelay = Math.random() * 3; // Random animation delay (0 to 3s)
        const randomDuration = 3 + Math.random() * 5; // Random animation duration (3 to 8s)

        return (
          <div
            key={index}
            className="absolute text-white font-bold animate-float"
            style={{
              top: `${randomY}vh`,
              left: `${randomX}vw`,
              fontSize: `${randomSize}rem`,
              opacity: randomOpacity,
              animationDelay: `${randomDelay}s`,
              animationDuration: `${randomDuration}s`,
            }}
          >
            {symbol}
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default Iv