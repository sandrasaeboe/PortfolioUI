export const personal = {
  name: 'Sandra Sæbø', initials: 'SS',
  role: 'UX/UI Designer & Frontend Developer',
  bio: "Bachelor's in Interaction Design from Stockholm University. I design in Figma and build in React. Studied fashion design at Beckmans.",
  bio2: "An eye for digital form — where every detail is intentional.",
  location: 'Stockholm', email: 'sandra.saeboe@gmail.com',
  github: 'https://github.com/sandrasaeboe', linkedin: 'https://www.linkedin.com/in/sandra-sæbø-08556b270/',
  available: 'Now',
};

export const projects = [
  { id:0, index:'01', title:'Affinity', img:'/images/covers/affinity.jpg', role:'UX Research, Interaction Design, Prototyping', year:'2026',
    desc:"Bachelor's thesis in interaction design, written jointly with Andreas Hessel Lundberg: can a local, offline AI model support designers during the clustering step of affinity diagramming — without sending sensitive research data to the cloud? Built a working prototype and tested it across six usability sessions, surfacing three distinct ways designers wanted to use it.",
    tech:['Research through Design','Usability Testing','Figma','Python / Flask','Local AI (Ollama)'], what:'Structure, without giving up your data.', link: '/work/affinity' },
  { id:1, index:'02', title:'Webdesign', img:'/images/covers/emelinn.jpg', role:'Web Design, Frontend Development', year:'2026',
    desc:'An editorial portfolio site for a Stockholm-based fine-line tattoo artist. A monochrome, gallery-first experience built around an infinite-looping coverflow gallery and a direct, form-free booking flow.',
    tech:['React','CSS','Scroll Snap Carousel','Responsive Design'], what:"A quiet gallery for ink that's meant to last.", link: 'https://emelinn.vercel.app' },
  { id:2, index:'03', title:'Motion', img:'/images/covers/motion.jpg', role:'Component Design, Frontend Engineering', year:'2026',
    desc:'A physics-based UI component library. Every component is driven by a custom spring-physics hook, with live demos and a props reference for each component.',
    tech:['React','JavaScript','Spring Physics','Custom Hooks'], what:'UI that moves like it has mass.', link:'https://motion-ui-that-moves.vercel.app' },
  { id:3, index:'04', title:'Spiral', img:'/images/covers/spiral.jpg', role:'UX Design, Full Stack Development', year:'2026',
    desc:'A mental health app that catches spiraling thoughts before they take over. An AI layer reads what you write and offers grounding advice in the moment, while daily check-ins track energy, sleep and mood to surface patterns over time. A guided breathing exercise helps regulate the nervous system when things feel like too much.',
    tech:['React','Groq API','Serverless Functions','Data Visualization'], what:'A pause, built into the spiral.', link:'https://spiral-app-ss.vercel.app' },
];

export const skills = [
  { cat:'Design',   items:['Figma','Interaction Design','UX / UI Design','Adobe Creative Suite','Prototyping','Design Systems','Editorial Design','Typography'] },
  { cat:'Frontend', items:['React','TypeScript','CSS / SCSS','Three.js','Canvas API'] },
  { cat:'Process',  items:['UX Research', 'User Testing', 'Information Architecture', 'Accessibility', 'Git', 'Iterative Design'] },
];

export const experience = [
  { role:'Web Designer & Frontend Developer', company:'Freelance', period:'2023 – Now', desc:'Designed and built websites for small businesses. Full ownership from wireframe to deployed product.' },
  { role:'Founder', company:'Cozy Vintage', period:'2020 – 2024', desc:'Founded and ran a vintage resale business in Bergen. Designed and developed the company website, focusing on layout, visual structure and user experience, alongside sales, marketing and customer communication.' },
];
