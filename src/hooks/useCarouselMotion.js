import { useCallback, useLayoutEffect, useRef, useState } from 'react';
const wrap=(value,count)=>((value%count)+count)%count;
const ease=value=>value*value*(3-2*value);
export default function useCarouselMotion(canvas,count,spread) {
  const [active,setActive]=useState(0);
  const motor=useRef({position:0,target:0,velocity:0,dragging:false,lastDrag:0,dragSpeed:0,lastIndex:0});
  const wake=useRef(()=>{});
  const goTo=useCallback(index=>{
    const state=motor.current;
    let distance=wrap(index-wrap(state.target,count),count);
    if(distance>count/2)distance-=count;
    state.target+=distance;wake.current();
  },[count]);
  const step=useCallback(direction=>{motor.current.target=Math.round(motor.current.target)+direction;wake.current();},[]);
  const beginDrag=useCallback(()=>{const state=motor.current;state.dragging=true;state.target=state.position;state.velocity*=.4;state.lastDrag=performance.now();state.dragSpeed=0;return state.target;},[]);
  const dragTo=useCallback(value=>{
    const state=motor.current,now=performance.now();
    const elapsed=Math.max(.008,(now-state.lastDrag)/1000);
    const speed=Math.max(-4,Math.min(4,(value-state.target)/elapsed));
    state.dragSpeed=state.dragSpeed*.65+speed*.35;state.lastDrag=now;state.target=value;wake.current();
  },[]);
  const releaseDrag=useCallback((cancel=false)=>{
    const state=motor.current;
    const recent=performance.now()-state.lastDrag<110;
    state.dragging=false;
    state.target=Math.round(state.target+(!cancel&&recent?state.dragSpeed*.06:0));
    state.dragSpeed=0;wake.current();
  },[]);
  useLayoutEffect(()=>{
    const area=canvas.current;
    const cards=[...area.querySelectorAll('.project-object')];
    const state=motor.current;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0,lastTime=0,wheelTimer=0,wheelTravel=0,wheelCommitted=false,width=0,gap=.9,sideScale=.6;
    function measure(){
      width=cards[0]?.offsetWidth||area.clientWidth*.55;
      gap=window.innerWidth<=700?.95:window.innerWidth<=1000?.85:.9;
      sideScale=window.innerWidth<=700?.55:window.innerWidth<=1000?.5:.6;
    }
    function paint(){
      for(let i=0;i<cards.length;i++){
        let distance=wrap(i-state.position+count/2,count)-count/2;
        const absolute=Math.abs(distance);
        const amount=ease(Math.min(1,absolute));
        const scale=1-(1-sideScale)*amount;
        const opacity=(1-.65*amount)*(1-ease(Math.max(0,Math.min(1,(absolute-1)/.8))));
        cards[i].style.transform=`translate3d(calc(-50% + ${distance*width*gap}px),-50%,0) rotateY(${-Math.max(-1,Math.min(1,distance))*18}deg) scale(${scale})`;
        cards[i].style.opacity=String(opacity);
        cards[i].style.zIndex=String(100-Math.round(absolute*20));
        cards[i].style.pointerEvents=absolute<1.6?'auto':'none';
      }
      const index=wrap(Math.round(state.position),count);
      if(index!==state.lastIndex){state.lastIndex=index;setActive(index);}
    }
    function animate(now){
      frame=0;
      const dt=lastTime?Math.min(.033,(now-lastTime)/1000):1/60;lastTime=now;
      if(reduced.matches){state.position=state.target;state.velocity=0;}
      else{
        state.velocity+=(state.target-state.position)*100*dt;
        state.velocity*=Math.exp(-20*dt);
        state.position+=state.velocity*dt;
      }
      const settled=Math.abs(state.target-state.position)<.0005&&Math.abs(state.velocity)<.004;
      if(settled&&!state.dragging){state.position=state.target;state.velocity=0;}
      paint();
      if(!settled||state.dragging)frame=requestAnimationFrame(animate);else lastTime=0;
    }
    function start(){if(!spread&&!frame){lastTime=0;frame=requestAnimationFrame(animate);}}
    wake.current=start;
    function resize(){measure();if(!spread)paint();}
    function wheel(e){
      if(spread||e.ctrlKey||e.metaKey||!window.matchMedia('(hover: hover) and (pointer: fine)').matches)return;
      const raw=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;if(!raw)return;
      e.preventDefault();
      const pixels=raw*(e.deltaMode===1?16:e.deltaMode===2?area.clientHeight:1);
      // One deliberate project change per gesture; ignore the momentum tail.
      wheelTravel+=Math.max(-80,Math.min(80,pixels));
      if(!wheelCommitted&&Math.abs(wheelTravel)>=45){
        state.target=Math.round(state.target)+Math.sign(wheelTravel);
        wheelCommitted=true;start();
      }
      clearTimeout(wheelTimer);
      wheelTimer=setTimeout(()=>{wheelTravel=0;wheelCommitted=false;},240);
    }
    function keyboard(e){
      if(spread||e.defaultPrevented||e.altKey||e.ctrlKey||e.metaKey||document.querySelector('dialog[open]'))return;
      if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;
      if(e.target.closest?.('input,textarea,select,[contenteditable="true"]'))return;
      const bounds=area.getBoundingClientRect();
      if(bounds.top>=window.innerHeight*.7||bounds.bottom<=window.innerHeight*.15)return;
      e.preventDefault();step(e.key==='ArrowRight'?1:-1);
    }
    state.dragging=false;state.target=Math.round(state.target);
    if(spread){cards.forEach(card=>{card.style.transform='';card.style.opacity='';card.style.zIndex='';card.style.pointerEvents='';});}
    else{measure();paint();start();}
    area.addEventListener('wheel',wheel,{passive:false});window.addEventListener('keydown',keyboard);window.addEventListener('resize',resize);
    return ()=>{cancelAnimationFrame(frame);clearTimeout(wheelTimer);wake.current=()=>{};area.removeEventListener('wheel',wheel);window.removeEventListener('keydown',keyboard);window.removeEventListener('resize',resize);};
  },[canvas,count,spread,step]);
  return {active,goTo,step,beginDrag,dragTo,releaseDrag};
}
