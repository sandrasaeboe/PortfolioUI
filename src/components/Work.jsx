import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CivicLogo from './CivicLogo';
import useCarouselMotion from '../hooks/useCarouselMotion';
const projects=[
  {name:'Emelinn',slug:'emelinn',category:'Visual design & development',image:'emelinn.jpg'},
  {name:'Motion',slug:'motion',category:'Interaction & creative development',image:'motion.jpg'},
  {name:'Affinity',slug:'affinity',category:'Research & interaction design',image:'affinity.jpg'},
  {name:'Spiral',slug:'spiral',category:'Interface design & development',image:'spiral.jpg'},
  {name:'Civic Watch',slug:'civic-watch',category:'Critical & interaction design',image:null}
];
export default function Work() {
  const [spread,setSpread]=useState(false);
  const [spinPaused,setSpinPaused]=useState(false);
  const drag=useRef(null);
  const moved=useRef(false);
  const canvas=useRef(null);
  const {active,goTo,step,beginDrag,dragTo,releaseDrag}=useCarouselMotion(canvas,projects.length,spread);
  function select(index){goTo(index);}
  function start(e){
    if(spread||(e.pointerType==='mouse'&&e.button!==0))return;
    drag.current={x:e.clientX,y:e.clientY,origin:null,id:e.pointerId};moved.current=false;
  }
  function move(e){
    const area=e.currentTarget.getBoundingClientRect();
    if(e.pointerType==='mouse'){
      e.currentTarget.style.setProperty('--look-x',`${((e.clientX-area.left)/area.width-.5)*4}deg`);
      e.currentTarget.style.setProperty('--look-y',`${-((e.clientY-area.top)/area.height-.5)*3}deg`);
    }
    if(!drag.current)return;
    const dx=e.clientX-drag.current.x,dy=e.clientY-drag.current.y;
    if(!moved.current&&Math.abs(dx)>7&&Math.abs(dx)>Math.abs(dy)){
      moved.current=true;drag.current.origin=beginDrag();e.currentTarget.setPointerCapture(e.pointerId);
    }
    if(!moved.current)return;
    e.preventDefault();
    const card=e.currentTarget.querySelector('.project-object');
    dragTo(drag.current.origin-dx/(card.offsetWidth*1.3));
  }
  function end(e){
    if(!drag.current)return;
    if(moved.current){e.preventDefault();releaseDrag();}
    drag.current=null;
    if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);
  }
  function reset(e){
    if(drag.current&&(!e||!canvas.current?.hasPointerCapture(drag.current.id))){if(moved.current)releaseDrag(true);drag.current=null;}
    canvas.current?.style.setProperty('--look-x','0deg');canvas.current?.style.setProperty('--look-y','0deg');
  }
  function cancel(e){if(drag.current&&moved.current)releaseDrag(true);drag.current=null;reset(e);}
  function key(e){if(e.key==='Enter')moved.current=false;if(spread)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();canvas.current.focus({preventScroll:true});step(e.key==='ArrowRight'?1:-1);}}
  const current=projects[active];
  return <section className={`project-explorer ${spread?'is-spread':''} ${spinPaused?'spin-paused':''}`} id="work" aria-label="Selected projects">
    <div className="explorer-toolbar"><span>Selected work</span><button type="button" className="layout-control" aria-pressed={spread} onClick={()=>{setSpread(!spread);reset();}}><span className={`layout-icon ${spread?'icon-stack':''}`} aria-hidden="true"><i/><i/><i/><i/></span>{spread?'Focus view':'Overview'}</button></div>
    <div ref={canvas} className="project-canvas" tabIndex={0} role="group" aria-label="Project gallery. Use left and right arrow keys to browse." onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={cancel} onPointerLeave={reset} onKeyDown={key}>
      {projects.map((p,index)=>{
        let position=(index-active+projects.length)%projects.length;if(position>projects.length/2)position-=projects.length;
        const selected=index===active;
        return <article key={p.slug} className={`project-object ${selected?'is-selected':''}`} data-position={position} style={{'--order':index}}>
          {spread||selected ? <Link className="project-artwork" to={`/work/${p.slug}`} aria-label={`View ${p.name} case study`} draggable="false" onClick={e=>{if(moved.current){e.preventDefault();moved.current=false;}}}><>{p.slug==='civic-watch'?<CivicLogo alt="Civic Watch — original spinning logo"/>:<img src={`/images/covers/${p.image}`} alt={`${p.name} project preview`} draggable="false" fetchPriority={index===0?'high':'auto'} />}</></Link> : <button type="button" className="project-artwork" aria-label={`Preview ${p.name}`} tabIndex={-1} onClick={()=>{if(!moved.current)select(index);moved.current=false;}}><>{p.slug==='civic-watch'?<CivicLogo alt=""/>:<img src={`/images/covers/${p.image}`} alt="" draggable="false" />}</></button>}
          {spread&&<div className="overview-caption"><h2>{p.name}</h2><span>{p.category}</span></div>}
        </article>;
      })}
    </div>
    {!spread&&<div className={`project-caption ${current.slug==='civic-watch'?'long-project-title':''}`} aria-live="polite" aria-atomic="true"><div key={current.slug} className="caption-copy"><h2><Link to={`/work/${current.slug}`} aria-label={current.name}><span className="caption-word" aria-hidden="true">{Array.from(current.name).map((letter,index)=><span key={index} style={{'--letter':index}}>{letter===' '?'\u00a0':letter}</span>)}</span></Link></h2><p>{current.category}</p></div><Link className="project-case-link" to={`/work/${current.slug}`}>Case study</Link>{current.slug==='civic-watch'&&<button type="button" className="logo-motion-toggle" aria-pressed={spinPaused} onClick={()=>setSpinPaused(!spinPaused)}>{spinPaused?'Play logo':'Pause logo'}</button>}</div>}
    <div className="project-navigation"><div className="project-choices" aria-label="Choose a project">{projects.map((p,i)=><button type="button" key={p.slug} aria-pressed={active===i} onClick={()=>{select(i);setSpread(false);}}>{p.name}</button>)}</div></div>
  </section>;
}
