import React, { useEffect, useState } from 'react';
export default function MotionControl() {
  const [paused, setPaused] = useState(() => {
    try { const saved = localStorage.getItem('portfolio-motion'); if (saved) return saved === 'paused'; } catch {}
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'playing';
    return () => { delete document.documentElement.dataset.motion; };
  }, [paused]);
  function toggle() {
    setPaused(value => { try { localStorage.setItem('portfolio-motion', value ? 'playing' : 'paused'); } catch {} return !value; });
  }
  return <button type="button" className="motion-control" aria-pressed={paused} onClick={toggle} aria-label={paused ? 'Enable motion' : 'Pause motion'}><span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span><span>Motion {paused ? 'off' : 'on'}</span></button>;
}
