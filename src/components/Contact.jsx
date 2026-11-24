import React, { useEffect, useRef, useState } from 'react';
import { personal } from '../data/portfolio';
export default function Contact() {
  const [copied,setCopied]=useState(false);
  const [error,setError]=useState(false);
  const timer=useRef(null);
  useEffect(()=>()=>clearTimeout(timer.current),[]);
  async function copy() {
    try {await navigator.clipboard.writeText(personal.email);setCopied(true);setError(false);clearTimeout(timer.current);timer.current=setTimeout(()=>setCopied(false),2500);} catch {setError(true);}
  }
  return <section className="brutal-contact" id="contact" aria-labelledby="contact-title"><div className="section-bar"><p>Open to design opportunities</p><span>Let’s talk.</span></div><h2 id="contact-title"><a href={`mailto:${personal.email}`}>GET IN<br /><span>TOUCH<span className="contact-star" aria-hidden="true">✳</span></span></a></h2><div className="contact-line"><a href={`mailto:${personal.email}`}>{personal.email}</a><button type="button" onClick={copy}>{copied?'Copied':'Copy email'}</button><span className="sr-only" role="status">{copied?'Email address copied.':error?'Could not copy. Use the email link to get in touch.':''}</span></div></section>;
}
