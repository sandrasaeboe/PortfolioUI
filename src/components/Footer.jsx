import React from 'react';
import { useLocation } from 'react-router-dom';
import { personal } from '../data/portfolio';
export default function Footer(){
  const {pathname}=useLocation();
  return <footer className={`site-footer ${pathname==='/'?'home-footer':''}`}><span>© {new Date().getFullYear()} Sandra Sæbø</span><a href={`mailto:${personal.email}`}>Let’s talk</a></footer>;
}
