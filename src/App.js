import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/Navbar";
import Index from "./components/layout/pages/Index";
import Services from "./Pages/services";
import About from "./Pages/Aboutme";
import Projects from "./Pages/myProjects";
import ContactMe from "./Pages/contactMe";

const App = () => {
  return (
    <Router>
      <div className="">
        {/* Navbar at the top */}
        <NavBar />

        {/* Main Routes */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/my-work" element={<Projects/>} />
          <Route path="/contact" element={<ContactMe/>} />
        </Routes>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
