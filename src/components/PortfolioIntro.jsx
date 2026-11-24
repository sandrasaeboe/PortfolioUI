import React, { useLayoutEffect, useRef, useState } from 'react';
const smooth=t=>{const p=Math.max(0,Math.min(1,t));return p*p*p*(p*(p*6-15)+10);};
export default function PortfolioIntro({ onComplete, onTransitionStart }) {
  const dialog=useRef(null);
  const canvas=useRef(null);
  const pointer=useRef({x:0,y:0});
  const [leaving,setLeaving]=useState(false);
  const done=useRef(false);
  const complete=useRef(onComplete);
  complete.current=onComplete;
  const transitionStart=useRef(onTransitionStart);
  transitionStart.current=onTransitionStart;
  useLayoutEffect(()=>{
    const panel=dialog.current;
    const surface=canvas.current;
    const context=surface.getContext('2d');
    const lettering=document.createElement('canvas');
    const type=lettering.getContext('2d');
    const previousFocus=document.activeElement;
    const previousOverflow=document.body.style.overflow;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.style.overflow='hidden';
    panel.showModal();
    let width=0,height=0,dpr=1,frame=0,start=performance.now();
    const position={x:0,y:0};
    function resize(){
      width=window.innerWidth;height=window.innerHeight;dpr=Math.min(window.devicePixelRatio||1,2);
      surface.width=lettering.width=Math.round(width*dpr);
      surface.height=lettering.height=Math.round(height*dpr);
      context.setTransform(dpr,0,0,dpr,0,0);type.setTransform(dpr,0,0,dpr,0,0);
      type.clearRect(0,0,width,height);
      const fontSize=Math.min(width*.19,height*.34);
      type.font=`900 ${fontSize}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
      type.fillStyle='#fff';type.textBaseline='middle';
      const spacing=-fontSize*.075;
      function word(text,y){
        const letters=Array.from(text);
        const total=letters.reduce((sum,letter)=>sum+type.measureText(letter).width,0)+spacing*(letters.length-1);
        const scale=Math.min(1,width*.92/total);
        type.save();type.translate(width*.045,y);type.scale(scale,1);
        let x=0;for(const letter of letters){type.fillText(letter,x,0);x+=type.measureText(letter).width+spacing;}
        type.restore();
      }
      word('PORTFOLIO',height*.5);
    }
    function draw(now){
      const elapsed=now-start;
      const reveal=reduced?1:smooth((elapsed-160)/2200);
      position.x+=(pointer.current.x-position.x)*.075;position.y+=(pointer.current.y-position.y)*.075;
      context.clearRect(0,0,width,height);context.fillStyle='#000';context.fillRect(0,0,width,height);
      if(reveal>.995){context.drawImage(lettering,0,0,width,height);}
      else{
        const travel=smooth(elapsed/2200);
        const cx=width*(.13+.56*travel)+position.x*(1-reveal);
        const cy=height*(.51-.05*Math.sin(travel*Math.PI*2))+position.y*(1-reveal);
        const rx=width*(.018+reveal*1.15),ry=height*(.015+reveal*1.35);
        const bend=Math.sin(elapsed*.0016)*.16*(1-reveal);
        context.beginPath();
        context.moveTo(cx-rx,cy);
        context.bezierCurveTo(cx-rx,cy-ry*(.65+bend),cx-rx*.35,cy-ry,cx,cy-ry);
        context.bezierCurveTo(cx+rx*.65,cy-ry,cx+rx,cy-ry*.24,cx+rx,cy);
        context.bezierCurveTo(cx+rx,cy+ry*(.75-bend),cx+rx*.2,cy+ry,cx,cy+ry);
        context.bezierCurveTo(cx-rx*.65,cy+ry,cx-rx,cy+ry*.32,cx-rx,cy);
        context.closePath();
        context.save();context.clip();context.drawImage(lettering,0,0,width,height);context.restore();
      }
      if(elapsed<2350&&!reduced)frame=requestAnimationFrame(draw);
    }
    resize();draw(start);window.addEventListener('resize',resize);
    function finish(){if(done.current)return;done.current=true;panel.close();complete.current();}
    const closed=()=>{if(!panel.open)finish();};panel.addEventListener('close',closed);
    const revealTimer=setTimeout(()=>{transitionStart.current?.();setLeaving(true);},reduced?300:2350);
    const endTimer=setTimeout(finish,reduced?450:3600);
    return ()=>{
      cancelAnimationFrame(frame);clearTimeout(revealTimer);clearTimeout(endTimer);
      window.removeEventListener('resize',resize);panel.removeEventListener('close',closed);
      if(panel.open)panel.close();document.body.style.overflow=previousOverflow;
      if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true});
    };
  },[]);
  return <dialog tabIndex={-1} ref={dialog} className={`portfolio-intro ${leaving?'is-leaving':''}`} aria-label="Sandra Sæbø — portfolio introduction" onCancel={e=>{e.preventDefault();dialog.current.close();}}>
    <canvas ref={canvas} className="intro-ink" role="img" aria-label="Portfolio" onPointerMove={e=>{if(e.pointerType==='mouse')pointer.current={x:(e.clientX/window.innerWidth-.5)*50,y:(e.clientY/window.innerHeight-.5)*36};}} onPointerLeave={()=>{pointer.current={x:0,y:0};}}/>
  </dialog>;
}
