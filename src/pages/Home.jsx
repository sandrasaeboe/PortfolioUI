import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Work from '../components/Work';
import PortfolioIntro from '../components/PortfolioIntro';
let introPlayed=false;
export default function Home(){
  const [showIntro,setShowIntro]=useState(()=>!introPlayed&&!window.location.hash);
  const [coverReady,setCoverReady]=useState(()=>introPlayed||Boolean(window.location.hash));
  const [workReady,setWorkReady]=useState(()=>Boolean(window.location.hash));
  useEffect(()=>{introPlayed=true;},[]);
  return <main className="gallery-home" id="main-content">{showIntro&&<PortfolioIntro onTransitionStart={()=>setCoverReady(true)} onComplete={()=>{setCoverReady(true);setShowIntro(false);}}/>}<Hero ready={coverReady} onRevealComplete={()=>setWorkReady(true)}/><div className="work-arrival" data-ready={workReady} inert={!workReady} aria-hidden={!workReady}><Work/></div></main>;
}
