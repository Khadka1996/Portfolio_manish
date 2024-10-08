import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPhone } from 'react-icons/fi'; // Import Phone icon
import myPhoto from '../../../assets/Manish.png'; // Import your photo
import javaLogo from '../../../assets/java.png'; // Import Java logo
import nextLogo from '../../../assets/next.png'; // Import Next.js logo
import reactLogo from '../../../assets/react.png'; // Import React logo
import mongodbLogo from '../../../assets/mongodb.png'; // Import MongoDB logo
import figmaLogo from '../../../assets/figma.png'; // Import Figma logo

const logos = [
  { src: javaLogo, alt: 'Java Logo', className: 'logo-java', angle: 0 },
  { src: nextLogo, alt: 'Next.js Logo', className: 'logo-next', angle: 60 },
  { src: reactLogo, alt: 'React Logo', className: 'logo-react', angle: 120 },
  { src: mongodbLogo, alt: 'MongoDB Logo', className: 'logo-mongodb', angle: 180 },
  { src: figmaLogo, alt: 'Figma Logo', className: 'logo-figma', angle: 240 },
  { src: figmaLogo, alt: 'Figma Logo', className: 'logo-figma', angle: 300 },
  { src: figmaLogo, alt: 'Figma Logo', className: 'logo-figma', angle: 360 },
  
  
];

const Home = () => {
  const [positions, setPositions] = useState(logos.map(logo => ({ x: 0, y: 0 })));
  const radius = 200; // Radius for circular movement
  const speed = 0.015; // Speed of rotation

  useEffect(() => {
    let angleIncrement = speed; // Increment for angle in radians

    const interval = setInterval(() => {
      setPositions((prevPositions) =>
        prevPositions.map((pos, index) => {
          const angle = logos[index].angle + angleIncrement * index; // Rotate each logo differently
          const x = Math.cos(angle) * radius; // Calculate x position
          const y = Math.sin(angle) * radius; // Calculate y position

          // Return new positions
          return { x, y };
        })
      );

      // Update angles for next iteration
      logos.forEach(logo => {
        logo.angle += speed; // Increment angle for continuous circular motion
      });
    }, 100); // Update every 100ms

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center relative bg-slate-200 mt-20 md:mt-20">
      {/* Text Section */}
      <div className="mx-3 md:mx-10 lg:mx-18 p-6">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl font-bold text-[#25609a]">Manish Khadka</h1>
          <p className="mt-4 text-lg text-gray-700">
            Hello, my name’s Manish. I’m a full-stack software developer.
          </p>
          <Link to="/contact" className="mt-6 inline-flex items-center px-4 py-2 bg-[#25609a] text-white rounded-lg shadow hover:bg-[#7BB660] transition duration-300">
            <FiPhone className="mr-2" />
            Contact Me
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center relative z-10">
        <div className="relative">
          <img src={myPhoto} alt="Manish Khadka" className="rounded-full h-100 w-100" />

          {/* Logos around the photo */}
          <div className="logo-container">
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className={`logo ${logo.className}`}
                style={{
                  position: 'absolute',
                  top: `calc(50% - 30px + ${positions[index].y}px)`, // Adjust to center the logo
                  left: `calc(50% - 30px + ${positions[index].x}px)`, // Adjust to center the logo
                  width: '60px',
                  height: 'auto',
                  transform: 'translate(-50%, -50%)', // Center the logo
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-0">
        {/* Animated Circles */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="circle-animation"></div>
          <div className="circle-animation delay-150"></div>
          <div className="circle-animation delay-300"></div>
        </div>
      </div>

      {/* Styles for the animated circles */}
      <style jsx>{`
        .circle-animation {
          position: absolute;
          border-radius: 50%;
          background: rgba(123, 182, 96, 0.5);
          animation: bounce 2s infinite;
        }
        .circle-animation:nth-child(1) {
          width: 250px;
          height: 250px;
          top: 40%;
          left: 30%;
        }
        .circle-animation:nth-child(2) {
          width: 80px;
          height: 80px;
          top: 40%;
          left: 20%;
        }
        .circle-animation:nth-child(3) {
          width: 350px;
          height: 350px;
          top: 20%;
          left: 60%;
        }
        .circle-animation.delay-150 {
          animation-delay: 0.15s;
        }
        .circle-animation.delay-300 {
          animation-delay: 0.3s;
        }
        @keyframes bounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        .logo-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Home;
