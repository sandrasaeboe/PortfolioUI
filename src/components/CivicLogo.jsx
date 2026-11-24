import React, { useState } from 'react';
export default function CivicLogo({ alt='Civic Watch logo' }) {
  return <span className="civic-logo-stage"><img className="civic-logo" src="/images/civic-watch/logo.svg" alt={alt} draggable="false" /></span>;
}
export function CivicIdentity() {
  const [paused,setPaused]=useState(false);
  return <div className={`civic-case-logo ${paused?'spin-paused':''}`}><CivicLogo/><button type="button" className="logo-motion-toggle" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?'Play logo':'Pause logo'}</button></div>;
}
