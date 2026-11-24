import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ThesisCase from './pages/ThesisCase';
import ProjectCase from './pages/ProjectCase';
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({behavior:'instant'});
      else window.scrollTo({top:0,behavior:'instant'});
    });
    document.title = pathname === '/' ? 'Sandra Sæbø — Interaction & Visual Designer' : `${pathname.split('/').pop().split('-').map(word=>word.replace(/^./, c => c.toUpperCase())).join(' ')} — Sandra Sæbø`;
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);
  return null;
}
export default function App() {
  return <BrowserRouter><a className="skip-link" href="#main-content">Skip to content</a><Navbar /><ScrollToTop /><Routes><Route path="/" element={<Home />} /><Route path="/work/affinity" element={<ThesisCase />} /><Route path="/work/:slug" element={<ProjectCase />} /><Route path="*" element={<main id="main-content" className="not-found"><h1>Page not found.</h1><Link className="text-link" to="/">Return to the portfolio</Link></main>} /></Routes><Footer /></BrowserRouter>;
}
