import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Expertise from './components/sections/Expertise';
import Projects from './components/sections/Projects';
import GitHubActivity from './components/sections/GitHubActivity';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';

function Home() {
  useEffect(() => {
    // Smooth scroll for hash links
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="App relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
