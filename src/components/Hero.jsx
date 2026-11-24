import React, { useEffect } from 'react';
export default function Hero({ ready=true, onRevealComplete }) {
  useEffect(()=>{
    if(ready&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)onRevealComplete?.();
  },[ready,onRevealComplete]);
  function move(e) {
    if(e.pointerType==='touch')return;
    const bounds=e.currentTarget.getBoundingClientRect();
    const x=e.clientX-bounds.left;
    const radius=Math.max(90,bounds.width*.16);
    e.currentTarget.querySelectorAll('[data-letter]').forEach(letter=>{
      const centre=letter.offsetLeft+letter.offsetWidth/2;
      const distance=x-centre;
      const influence=Math.max(0,1-Math.abs(distance)/radius);
      letter.style.setProperty('--lift',`${-influence*10}px`);
      letter.style.setProperty('--lean',`${distance/radius*influence*2.5}deg`);
      letter.style.setProperty('--stretch',`${1+influence*.025}`);
    });
  }
  function reset(e) {
    e.currentTarget.querySelectorAll('[data-letter]').forEach(letter=>{
      letter.style.setProperty('--lift','0px');
      letter.style.setProperty('--lean','0deg');
      letter.style.setProperty('--stretch','1');
    });
  }
  return <section className="portfolio-cover portfolio-entry" aria-labelledby="portfolio-title" data-cover-ready={ready}>
    <h1 id="portfolio-title" aria-label="Sandra Sæbø"><span className="cover-interactive"><a href="#work" aria-label="Sandra Sæbø — explore projects" onPointerMove={move} onPointerLeave={reset} onBlur={reset}>{Array.from('SANDRA SÆBØ').map((letter,i)=><span data-letter key={i} aria-hidden="true" style={{'--letter':i}}>{letter===' '?'\u00a0':letter}</span>)}</a></span></h1>
    <div className="cover-bottom" onAnimationEnd={e=>{if(e.target===e.currentTarget&&e.animationName==='portfolio-caption-handover')onRevealComplete?.();}}><p>Interaction & visual design<br /><span>Stockholm, Sweden</span></p></div>
  </section>;
}
