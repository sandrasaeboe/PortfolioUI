import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CivicIdentity } from '../components/CivicLogo';
import CaseLayout, { StorySection } from '../components/CaseLayout';
const cases = {
  'civic-watch': {
    title:'Civic Watch',category:'School project · Critical & interaction design · 2025',
    deck:'A concept exploring crime reporting, local awareness and the social implications of digital safety tools.',
    facts:[['Context','School project'],['Approach','Critical & Disruptive Design'],['Concept','Community incident reporting'],['Original presentation','March 2025']],
    image:'/images/civic-watch/logo.svg',imageAlt:'Civic Watch — original visual identity.',next:{title:'Emelinn',slug:'emelinn'},
    sections:[
      ['The concept',['Civic Watch is an app concept for reporting crimes and viewing incidents in a local area. The original project presents a real-time, community-driven safety tool under the message “Stay aware, stay safe.”','The concept sits within a school exploration of Critical and Disruptive Design: using design to question assumptions and consider the social consequences of digital technology.']],
      ['The design question',['The project considers what happens when a familiar product promise — greater awareness and safety — is translated into an interface for community reporting.','Its critical design framing invites questions about whose reports shape an area’s perceived safety, how information is interpreted and what assumptions are built into the experience.']],
      ['Visual identity',['The original identity combines an eye-like circular symbol with a red ribbon form. The rotating presentation brings movement to the identity.','The app screens below are the original school-project artifacts. They present the concept rather than a released service.']]
    ]
  },
  emelinn: {
    title:'Emelinn', category:'Client project · Web design & development · 2026',
    deck:'A quiet digital gallery for an artist whose work deserves the foreground.',
    facts:[['My role','Visual design & frontend development'],['Context','Stockholm-based tattoo artist'],['Built with','React & CSS'],['Focus','Gallery, responsive layout & booking']],
    image:'/images/covers/emelinn.jpg', imageAlt:'The Emelinn website pairs large typography with a restrained editorial layout.', live:'https://emelinn.vercel.app', next:{title:'Motion',slug:'motion'},
    sections:[
      ['The brief', ['A portfolio website for a Stockholm-based fine-line tattoo artist. The experience needed to introduce the artist, present the work and give visitors a clear route to booking.','I handled the visual design and React implementation, carrying the project from design decisions into a working website.']],
      ['Visual direction', ['The site uses a monochrome palette, bold typography and generous space. The interface provides a frame for the artist’s work rather than competing with it.','The contrast between oversized type and smaller supporting information creates an editorial hierarchy: establish the identity, explore the work, then find the practical details.']],
      ['Interaction decisions', ['An infinite-looping coverflow gallery places browsing at the centre of the experience. The gallery brings a sense of movement to the otherwise restrained visual system.','Booking follows a direct, form-free route. This keeps the path from exploring the artist’s work to making contact short and explicit.']],
      ['What I delivered', ['A responsive React website combining the artist’s identity, a gallery-led presentation and booking information. This project demonstrates my ability to shape a visual direction and implement it in the browser.','A useful next step would be to observe how first-time visitors move between the gallery and booking information, then refine the experience around that behaviour.']]
    ]
  },
  motion: {
    title:'Motion',category:'Independent project · Interaction & component design · 2026',
    deck:'Exploring how interfaces can feel responsive, physical and alive.',
    facts:[['My role','Interaction design & development'],['Context','Independent component library'],['Built with','React & JavaScript'],['Focus','Spring physics & reusable components']],
    image:'/images/covers/motion.jpg',imageAlt:'Motion’s component library, with interactive examples and a restrained interface.',live:'https://motion-ui-that-moves.vercel.app',next:{title:'Spiral',slug:'spiral'},
    sections:[
      ['The exploration', ['Motion is a physics-based UI component library. I built it to explore the relationship between an interaction’s behaviour and the way it feels to use.','The project connects design with implementation: the movement is part of the component itself, with working examples that can be tried in the browser.']],
      ['A shared behaviour', ['The components use a custom spring-physics hook. A common motion foundation creates a relationship between otherwise different interface elements.','Spring motion gives an interaction a sense of mass and response. The design question is how to make that movement support the action and remain understandable.']],
      ['Making it usable', ['Live demonstrations let visitors experience the behaviour directly. A props reference accompanies each component so the exploration can also be understood as a reusable development tool.','The combination of examples and reference material makes both sides of the work visible: interaction craft and the structure needed to implement it.']],
      ['What this demonstrates', ['A working collection of React components, a shared animation approach and supporting documentation. It shows how I investigate an interaction through code and think beyond a single static screen.','A next iteration could examine how the motion settings work across different components and how to make the library easier for another developer to adopt.']]
    ]
  },
  spiral: {
    title:'Spiral',category:'Independent project · Interface design & development · 2026',
    deck:'A personal exploration of journaling, reflection and moments of pause.',
    facts:[['My role','Interface design & full stack development'],['Context','Independent wellbeing concept'],['Built with','React, Groq API & serverless functions'],['Focus','Check-ins, journaling & breathing']],
    image:'/images/covers/spiral.jpg',imageAlt:'Spiral’s web interface for journaling and daily wellbeing check-ins.',live:'https://spiral-app-ss.vercel.app',next:{title:'Civic Watch',slug:'civic-watch'},
    sections:[
      ['The idea', ['Spiral explores how a digital experience could create space for reflection. It brings together written entries, daily check-ins and a guided breathing interaction.','I designed and built the app as an independent project, exploring both the interface and the technical connections behind it.']],
      ['The experience', ['Daily check-ins record energy, sleep and mood. Visualizations bring those entries together so a person can look back over their own records.','The journaling flow connects written input to AI-generated responses. A separate breathing interaction provides a simple activity to focus on in the moment.']],
      ['Connecting the pieces', ['The React interface connects to a Groq API through serverless functions. This gave me a way to explore a complete flow, from writing an entry to displaying a generated response.','The project combines several kinds of interaction: written input, daily data entry, visualization and a paced breathing activity. The design challenge is to keep the relationship between them clear.']],
      ['What I would evaluate next', ['The next design step would be to test whether people understand what is stored, where their writing is processed and what the AI response can and cannot offer.','I would also evaluate the clarity of the check-in flow and whether the visualizations help people interpret their own entries without implying conclusions the data cannot support.']]
    ]
  }
};
export default function ProjectCase() {
  const { slug } = useParams();
  const project = cases[slug];
  if (!project) return <main className="not-found" id="main-content"><h1>Project not found.</h1><Link to="/#work" className="text-link">Back to selected work</Link></main>;
  return <CaseLayout {...project} coverContent={slug==='civic-watch'?<CivicIdentity/>:undefined}>{slug==='civic-watch'&&<><div className="civic-screens">{[1,2,3,4].map(n=><img key={n} src={`/images/civic-watch/screen-${n}.png`} alt={`Original Civic Watch app concept, screen ${n}`} loading="lazy"/>)}</div></>}{project.sections.map(([title, paragraphs]) => <StorySection key={title} title={title}>{paragraphs.map(text => <p key={text}>{text}</p>)}</StorySection>)}</CaseLayout>;
}
