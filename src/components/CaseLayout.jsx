import React from 'react';
import { Link } from 'react-router-dom';
export function StorySection({ title, children }) {
  return <section className="case-story-section"><h2>{title}</h2><div>{children}</div></section>;
}
export function CaseFigure({ src, alt, caption }) {
  return <figure className="case-figure"><img src={src} alt={alt} loading="lazy" /><figcaption>{caption}</figcaption></figure>;
}
export default function CaseLayout({ title, category, deck, facts, image, imageAlt, coverContent, children, live, next }) {
  return <main className="case-page" id="main-content"><Link className="case-back" to="/#work">Back to selected work</Link>
    <header className="case-header"><p className="eyebrow">{category}</p><h1>{title}</h1><p className="case-deck">{deck}</p><dl className="case-facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></header>
    <figure className="case-cover">{coverContent || <img src={image} alt={imageAlt} />}<figcaption>{imageAlt}</figcaption></figure>
    {children}
    {live && <div className="case-links"><a className="button button-dark" href={live} target="_blank" rel="noreferrer">Visit live project</a></div>}
    <div className="case-next"><div><p className="eyebrow">Next project</p><h2>{next.title}</h2></div><Link className="text-link" to={`/work/${next.slug}`}>Explore {next.title}</Link></div>
  </main>;
}
