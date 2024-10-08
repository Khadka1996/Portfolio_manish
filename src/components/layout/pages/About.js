import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import {
  FaReact, FaNodeJs, FaCss3Alt, FaJs, FaBootstrap, FaHtml5, FaGitAlt, FaPython, FaJava, FaPhp
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTailwindcss, SiMongodb, SiDocker, SiFigma, SiPostgresql, SiRedux
} from 'react-icons/si';
import { Button } from '@mui/material';
import cvFile from '../../../assets/manish_cv.pdf'; // Adjust the path as needed
import { SiCanva } from "react-icons/si";

const About = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // JSON data for the languages known
  const languages = {
    frontend: {
      title: "Frontend Technologies",
      icons: {
        react: { icon: <FaReact className="text-blue-500" size={30} />, label: "React" },
        javascript: { icon: <FaJs className="text-yellow-400" size={30} />, label: "JavaScript" },
        css: { icon: <FaCss3Alt className="text-blue-600" size={30} />, label: "CSS" },
        nextjs: { icon: <SiNextdotjs className="text-black" size={30} />, label: "Next.js" },
        tailwindcss: { icon: <SiTailwindcss className="text-teal-500" size={30} />, label: "Tailwind CSS" },
        html: { icon: <FaHtml5 className="text-orange-500" size={30} />, label: "HTML5" },
      },
    },
    backend: {
      title: "Backend Technologies",
      icons: {
        api: { icon: <FaNodeJs className="text-green-600" size={30} />, label: "Node.js" },
        mongodb: { icon: <SiMongodb className="text-green-500" size={30} />, label: "MongoDB" },
        postgresql: { icon: <SiPostgresql className="text-blue-700" size={30} />, label: "PostgreSQL" },
        java: { icon: <FaJava className="text-red-600" size={30} />, label: "Java" },
      },
    },
    design: {
      title: "Design Tools",
      icons: {
        figma: { icon: <SiFigma className="text-purple-500" size={30} />, label: "Figma" },
        canva: { icon: <SiCanva className="text-teal-500" size={30} />, label: "Canva" },
      },
    },
    versionControl: {
      title: "Version Control",
      icons: {
        git: { icon: <FaGitAlt className="text-orange-600" size={30} />, label: "Git" },
      },
    },
  };

  const handleDownload = () => {
    setDownloading(true);
    setDownloaded(false);

    // Create a link element and trigger a download
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'manish_cv.pdf'; // Specify the name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Simulate download completion
    setDownloading(false);
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 5000); // Show "Downloaded" for 5 seconds
  };

  return (
    <div className="bg-[#25609A] py-2">
      <div className="mx-3 md:mx-10 lg:mx-18 p-10">
        <div className="flex items-center mb-8">
          <div className="border-t-2 border-b-2 h-2 border-[#7BB660] flex-grow"></div>
          <div className="px-3 text-white text-3xl font-bold border-r-2 border-l-2 rounded-lg">
            About Me
          </div>
          <div className="border-t-2 border-b-2 h-2 border-[#7BB660] flex-grow"></div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-lg text-gray-700 mb-6">
            Hi! I’m a passionate web developer with a love for creating dynamic and responsive applications.
            My expertise lies in modern frameworks like React and Next.js, and I enjoy bringing ideas to life through code.
            I am committed to continuous learning and development, always eager to explore new technologies and methodologies.
          </p>

          {Object.entries(languages).map(([category, { title, icons }]) => (
            <div key={category} className="mb-6">
              <h3 className="text-2xl font-bold text-[#25609A] mb-4">{title}</h3>
              <div className="flex flex-wrap gap-6 items-center mb-4 border-b border-gray-300 pb-4">
                {Object.entries(icons).map(([key, { icon, label }]) => (
                  <div key={key} className="relative group flex flex-col items-center">
                    <div
                      className="transition-transform duration-300 transform group-hover:scale-125 group-hover
                                 rounded-full border border-gray-400 p-2 flex justify-center items-center"
                    >
                      {icon}
                    </div>
                    <span
                      className="absolute left-1/2 transform -translate-x-1/2 mt-2 rounded-md bg-gray-800 text-white text-xs p-1 opacity-0
                                group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleDownload}
              disabled={downloading || downloaded}
              className="flex items-center"
            >
              <>
                <FaDownload className="mr-2" />
                Download My CV
              </>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
