import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import About from './About';
import Experience from './Experience';
import { personal } from '../data/portfolio';
export default function Navbar() {
  const dialog=useRef(null);
  return <>
    <header className="site-header">
      <Link className="wordmark" to="/" aria-label="Sandra Sæbø home">Sandra Sæbø</Link>
      <nav className="quiet-nav" aria-label="Main navigation">
        <button type="button" onClick={()=>dialog.current.showModal()}>About</button>
        <a href="/Sandra-Saeboe-CV.pdf" target="_blank" rel="noreferrer">CV <span className="sr-only">(PDF, opens in a new tab)</span></a>
        <a href={`mailto:${personal.email}`}>Email</a>
      </nav>
    </header>
    <dialog className="profile-dialog" ref={dialog} aria-labelledby="profile-title" onClick={e=>{if(e.target===dialog.current)dialog.current.close();}}>
      <div className="profile-panel"><div className="profile-top"><span>Sandra Sæbø</span><button type="button" onClick={()=>dialog.current.close()} autoFocus>Close</button></div><h2 id="profile-title">Interaction design.<br />A visual perspective.</h2><About /><Experience /><div className="profile-links"><a href={`mailto:${personal.email}`}>Get in touch</a><a href={personal.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={personal.github} target="_blank" rel="noreferrer">GitHub</a></div></div>
    </dialog>
  </>;
}
