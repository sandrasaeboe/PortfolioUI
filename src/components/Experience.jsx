import React from 'react';
const roles=[
  ['Samto','UX/UI Designer','2026 — Present','UX for an AI-based service for consultants and change leaders, focusing on onboarding, work overviews and understandable findings and evidence.'],
  ['HelloKefi','Brand Identity','Completed commission','Created the brand identity from the ground up, including the logo and packaging design.'],
  ['Freelance','Web Design & Development','2023 — Present','Websites for small businesses, from client needs and visual direction to responsive React development.'],
  ['Cozy Vintage','Founder','2020 — 2024','Founded a vintage resale business in Bergen, working across the website, visual presentation, marketing and customer communication.']
];
export default function Experience() {
  return <section className="profile-experience" aria-labelledby="experience-title"><h3 id="experience-title">Experience</h3>{roles.map(([name,role,date,text])=><details key={name}><summary><span>{name}</span><span>{role}</span><span className="detail-plus" aria-hidden="true">+</span></summary><div><span className="experience-date">{date}</span><p>{text}</p></div></details>)}</section>;
}
