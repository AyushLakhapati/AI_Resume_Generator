import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import GenerateResume from "./pages/GenerateResume";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyResumes from "./pages/MyResumes";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="generate-resume" element={<GenerateResume />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="my-resumes" element={<MyResumes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);