import React from 'react';
import {
  FaReact, FaNodeJs, FaCss3Alt, FaJs, FaBootstrap, FaHtml5, FaGitAlt, FaPython, FaJava, FaPhp
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTailwindcss, SiMongodb, SiDocker, SiFigma, SiPostgresql, SiRedux, SiTypescript,
  SiGraphql, SiCsharp, SiRuby, SiKotlin, SiFlutter, SiSwift, SiFirebase
} from 'react-icons/si';
import { useNavigate } from 'react-router-dom'; // To handle navigation

const Projects = () => {
  const navigate = useNavigate(); // Initialize navigate to programmatically handle routes

  const projects = [
    {
      "name": "Personal Portfolio",
      "description": "My personal portfolio showcasing all my projects and skills.",
      "link": "https://facebook.com",
      "seoImage": "https://as2.ftcdn.net/v2/jpg/03/00/24/59/1000_F_300245953_Svih1DYJbw4v2t92EhDOTwW4LIqMghmy.jpg",
      "languages": ["react", "javascript", "css"]
    },
    {
      "name": "E-Commerce Website",
      "description": "An e-commerce platform for buying and selling products.",
      "link": "https://ecommerce.example.com",
      "seoImage": "https://as2.ftcdn.net/v2/jpg/00/76/41/55/1000_F_76415509_WWa7S9JZqF0DIlcMiEJnRCM1s4VnWMJt.jpg",
      "languages": ["nextjs", "mongodb", "tailwindcss"]
    },
    {
      "name": "Weather App",
      "description": "A real-time weather app with a modern user interface.",
      "link": "https://weatherapp.example.com",
      "seoImage": "https://as2.ftcdn.net/v2/jpg/02/87/55/79/1000_F_287557939_1nPdlpdptbTreAi24RW2kIgh8Ce4y8Aq.jpg",
      "languages": ["react", "api", "bootstrap"]
    },
    {
      "name": "Chat Application",
      "description": "A real-time chat application with user authentication.",
      "link": "https://chatapp.example.com",
      "seoImage": "https://as1.ftcdn.net/v2/jpg/01/80/01/02/1000_F_180010202_65A1mVSPmeS1ja1LTuHbV3p2QuveRITN.jpg",
      "languages": ["javascript", "nodejs", "mongodb"]
    },
    {
      "name": "Blog Platform",
      "description": "A platform for creating and sharing blog posts.",
      "link": "https://blogplatform.example.com",
      "seoImage": "https://as2.ftcdn.net/v2/jpg/03/80/39/31/1000_F_380393193_adGO0uufEdsHRM1oXFPtDEjFby02tfMJ.jpg",
      "languages": ["react", "java", "postgresql"]
    },
    {
      "name": "Weather App",
      "description": "A real-time weather app with a modern user interface.",
      "link": "https://weatherapp.example.com",
      "seoImage": "https://as2.ftcdn.net/v2/jpg/02/87/55/79/1000_F_287557939_1nPdlpdptbTreAi24RW2kIgh8Ce4y8Aq.jpg",
      "languages": ["react", "api", "bootstrap"]
    }
  ];

  const icons = {
    react: { icon: <FaReact className="text-blue-500" size={30} />, label: "React" },
    javascript: { icon: <FaJs className="text-yellow-400" size={30} />, label: "JavaScript" },
    css: { icon: <FaCss3Alt className="text-blue-600" size={30} />, label: "CSS" },
    nextjs: { icon: <SiNextdotjs className="text-black" size={30} />, label: "Next.js" },
    mongodb: { icon: <SiMongodb className="text-green-500" size={30} />, label: "MongoDB" },
    tailwindcss: { icon: <SiTailwindcss className="text-teal-500" size={30} />, label: "Tailwind CSS" },
    bootstrap: { icon: <FaBootstrap className="text-purple-600" size={30} />, label: "Bootstrap" },
    api: { icon: <FaNodeJs className="text-green-600" size={30} />, label: "Node.js" },
    html: { icon: <FaHtml5 className="text-orange-500" size={30} />, label: "HTML" },
    git: { icon: <FaGitAlt className="text-orange-600" size={30} />, label: "Git" },
    python: { icon: <FaPython className="text-blue-500" size={30} />, label: "Python" },
    java: { icon: <FaJava className="text-red-600" size={30} />, label: "Java" },
    php: { icon: <FaPhp className="text-purple-600" size={30} />, label: "PHP" },
    docker: { icon: <SiDocker className="text-blue-600" size={30} />, label: "Docker" },
    figma: { icon: <SiFigma className="text-purple-500" size={30} />, label: "Figma" },
    postgresql: { icon: <SiPostgresql className="text-blue-700" size={30} />, label: "PostgreSQL" },
    redux: { icon: <SiRedux className="text-purple-600" size={30} />, label: "Redux" },
    typescript: { icon: <SiTypescript className="text-blue-600" size={30} />, label: "TypeScript" },
    graphql: { icon: <SiGraphql className="text-e82041" size={30} />, label: "GraphQL" },
    csharp: { icon: <SiCsharp className="text-purple-600" size={30} />, label: "C#" },
    ruby: { icon: <SiRuby className="text-red-600" size={30} />, label: "Ruby" },
    kotlin: { icon: <SiKotlin className="text-purple-500" size={30} />, label: "Kotlin" },
    flutter: { icon: <SiFlutter className="text-blue-400" size={30} />, label: "Flutter" },
    swift: { icon: <SiSwift className="text-orange-600" size={30} />, label: "Swift" },
    firebase: { icon: <SiFirebase className="text-yellow-500" size={30} />, label: "Firebase" },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 mt-16">
      <div className="mx-3 md:mx-10 lg:mx-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center p-10">
            <div className="border-t-2 border-b-2 h-2 border-[#7BB660] flex-grow"></div>
            <div className="px-3 text-[#25609a] text-3xl font-bold border-r-2 border-l-2 rounded-lg">
              My Projects
            </div>
            <div className="border-t-2 border-b-2 h-2 border-[#7BB660] flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <img 
                    src={project.seoImage} 
                    alt={project.name} 
                    className="w-full h-48 object-cover rounded-t-lg hover:opacity-80 transition-opacity duration-300" 
                  />
                </a>
                <div className="p-6 rounded-b-lg">
                  <h3 className="text-2xl font-semibold text-[#266199]">{project.name}</h3>
                  <p className="mt-2 text-[#266199] opacity-80">{project.description}</p>
                  <div className="mt-4 flex space-x-2">
                    {project.languages.map((lang, index) => (
                      <div key={index} className="relative group">
                        {icons[lang]?.icon}
                        <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 rounded-md bg-gray-800 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {icons[lang]?.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between flex-wrap">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#266199] text-white py-2 px-4 rounded-lg hover:bg-[#4d85b9] transition duration-300 mb-2"
                    >
                      Visit Project
                    </a>
                    <button
                      onClick={() => navigate('/contact')}
                      className="bg-[#266199] text-white py-2 px-4 rounded-lg hover:bg-[#4d85b9] transition duration-300 mb-2"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
