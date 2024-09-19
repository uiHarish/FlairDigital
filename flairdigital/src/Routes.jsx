import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import 'primereact/resources/themes/lara-light-blue/theme.css';
// import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primeicons/primeicons.css';
import SignUpForm from "./Components/SignUpComponent/SignUpForm";



const ProjectRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUpForm />} />

      </Routes>
    </Router>
  );
};

export default ProjectRoutes;



