import React, { useState, useEffect } from "react";
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.png';
import watch from '../assets/watch.jpg'
import laptop from '../assets/laptop.jpg'
import bangle from '../assets/bangle.jpg'

const Landingpage = () => {
  // Array of images for the background carousel (large screens)
  const images = [image1, image2 , image3 , image4];
  
  // Array of product images for smaller screens
  const images1 = [watch , laptop, bangle];
  
  // State to track the current image index for background images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Change the background image every 5 seconds (5000 ms)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Set the background image style dynamically based on the current image index
  const backgroundImage = `url(${images[currentImageIndex]})`;

  return (
    <div className="bg-gray-50 font-sans leading-normal tracking-normal">
      {/* Header */}
      <header className="text-black p-5">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">E-Shop</h1>
          <nav>
            <ul className="hidden md:flex space-x-6 md:space-x-12">
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">Shop</a></li>
              <li><a href="#" className="hover:text-gray-300">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            </ul>

            {/* Mobile menu */}
            <div className="md:hidden">
              <button 
                className="text-black" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle the mobile menu
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
              
              {/* Dropdown menu for mobile */}
              {isMobileMenuOpen && (
                <ul className="absolute top-10 right-0 bg-blue-700 shadow-lg p-6 space-y-9 px-9 mt-8">
                  <li><a href="#" className="text-black hover:text-gray-300">Home</a></li>
                  <li><a href="#" className="text-black hover:text-gray-300">Shop</a></li>
                  <li><a href="#" className="text-black hover:text-gray-300">About Us</a></li>
                  <li><a href="#" className="text-black hover:text-gray-300">Contact</a></li>
                </ul>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section with Dynamic Carousel Background */}
      <section
        className="bg-cover bg-center h-screen text-center text-white flex items-center justify-center md:bg-cover lg:bg-cover"
        style={{
          backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className=" bg-opacity-80 p-8  rounded-lg  text-center md:text-left w-full md:w-2/3 lg:w-1/2">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-4">
            Welcome to E-Shop
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-black mb-6">
            Your favorite online shopping experience.
          </p>
          <button className="mt-6 px-6 py-3 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-all">
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Section (Display for mobile view with images1) */}
      <section className="py-12 md:py-20 mx-9">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Card for Mobile */}
            {images1.map((productImage, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={productImage} alt={`Product ${index + 1}`} className="w-full h-56 object-cover"/>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold">Product {index + 1}</h3>
                  <p className="text-xl text-gray-600 mt-2">$29.99</p>
                  <button className="mt-4 w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-500 transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 E-Shop. All Rights Reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
            <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
            <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landingpage;
