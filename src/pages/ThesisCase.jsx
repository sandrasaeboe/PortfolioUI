import React from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';

const ink = (a) => `rgba(10,10,10,${a})`;

function Reveal({ children, style }) {
  const [ref, inView] = useInView(0.08);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)', transition: 'opacity .8s cubic-bezier(0.16,1,0.3,1), transform .8s cubic-bezier(0.16,1,0.3,1)', ...style }}>
      {children}
    </div>
  );
}

function Label({ children }) {
  return <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: ink(0.4) }}>{children}</span>;
}

function H2({ children }) {
  return (
    <h2 style={{ fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif', fontWeight: 700, fontSize: 'clamp(32px,5vw,56px)', letterSpacing: '-0.03em', lineHeight: 0.98, textTransform: 'uppercase', color: '#0a0a0a' }}>
      {children}
    </h2>
  );
}

function Body({ children, style }) {
  return <p style={{ fontSize: 17, color: ink(0.7), lineHeight: 1.9, fontWeight: 300, ...style }}>{children}</p>;
}

function Section({ id, label, title, children }) {
  return (
    <section id={id} style={{ padding: '90px 48px', borderTop: `1px solid ${ink(0.1)}` }}>
      <Reveal style={{ marginBottom: 44 }}>
        <div style={{ marginBottom: 18 }}><Label>{label}</Label></div>
        {title && <H2>{title}</H2>}
      </Reveal>
      {children}
    </section>
  );
}

function Fig({ src, alt, caption, bg = '#fff', maxWidth = 900 }) {
  const [ref, inView] = useInView(0.08);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity .8s cubic-bezier(0.16,1,0.3,1), transform .8s cubic-bezier(0.16,1,0.3,1)', maxWidth, margin: '0 auto' }}>
      <div style={{ border: `1px solid ${ink(0.14)}`, background: bg }}>
        <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
      </div>
      {caption && <p style={{ fontSize: 12, color: ink(0.42), marginTop: 14, lineHeight: 1.6, fontWeight: 400 }}>{caption}</p>}
    </div>
  );
}

function FactGrid({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1, background: ink(0.1) }}>
      {items.map(([k, v]) => (
        <div key={k} style={{ background: '#f2f0eb', padding: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: ink(0.4), marginBottom: 5 }}>{k}</div>
          <div style={{ fontSize: 14, color: '#0a0a0a', fontWeight: 500 }}>{v}</div>
        </div>
      ))}
    </div>
  );
}

function StatRow({ items }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px 64px' }}>
      {items.map(([n, l]) => (
        <div key={l}>
          <div style={{ fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif', fontWeight: 700, fontSize: 'clamp(32px,4vw,48px)', letterSpacing: '-0.03em', color: '#0a0a0a', lineHeight: 1 }}>{n}</div>
          <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: ink(0.45), marginTop: 8 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

function Quote({ children }) {
  return (
    <div style={{ borderLeft: `2px solid ${ink(0.8)}`, padding: '4px 0 4px 32px' }}>
      <p style={{ fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif', fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(22px,3vw,32px)', letterSpacing: '-0.01em', lineHeight: 1.45, color: '#0a0a0a' }}>
        {children}
      </p>
    </div>
  );
}

function Tag({ children }) {
  return <span style={{ fontSize: 12, padding: '8px 16px', border: `1px solid ${ink(0.18)}`, color: ink(0.65), fontWeight: 400 }}>{children}</span>;
}

const useCases = [
  { n: '01', title: 'To get started', body: 'Several participants used the AI clustering purely as a first pass to build on, rather than starting from a blank whiteboard.', quotes: ['“It gave me something to work from.”', '“It made it easier to start sorting.”'] },
  { n: '02', title: 'To handle overwhelming data', body: 'With larger datasets, having the material pre-sorted made it feel tractable instead of like an unstructured wall of notes.', quotes: ['“It wasn’t as overwhelming.”', '“Easy to get into the data.”'] },
  { n: '03', title: 'As a complement to their process', body: 'The largest group used it alongside their own clustering — as a second opinion, not a replacement for their own judgement.', quotes: ['“A good sounding board.”', '“It surfaced perspectives I’d have missed.”'] },
];

const challenges = [
  { title: 'Risk of bias', body: 'Participants worried the AI’s grouping would colour how they read the notes — even while some felt it was more “objective” than their own admittedly subjective clustering.' },
  { title: 'Not always a UX lens', body: 'Clustering sometimes grouped notes by literal wording — “ticket,” “button,” “colour” — rather than by the underlying user problem or emotion behind them.' },
  { title: 'Wants more transparency', body: 'The single most common request across all six sessions: understand why particular notes ended up together before trusting the grouping.' },
];

export default function ThesisCase() {
  return (
    <main style={{ paddingTop: 68 }}>

      {/* Back bar */}
      <div style={{ padding: '28px 48px 0' }}>
        <Link to="/#work" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: ink(0.45), transition: 'color .2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'} onMouseLeave={e => e.currentTarget.style.color = ink(0.45)}>
          ← Back to work
        </Link>
      </div>

      {/* Hero */}
      <header style={{ padding: '48px 48px 90px' }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: ink(0.4), marginBottom: 20 }}>01 — 2026 — Bachelor's Thesis, Interaction Design</p>
          <h1 style={{ fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif', fontWeight: 700, fontSize: 'clamp(64px,12vw,180px)', letterSpacing: '-0.05em', lineHeight: 0.85, textTransform: 'uppercase', color: '#0a0a0a', marginBottom: 40 }}>
            Affinity
          </h1>
          <p style={{ fontSize: 19, color: ink(0.7), lineHeight: 1.8, fontWeight: 300, maxWidth: 640, marginBottom: 56 }}>
            Local AI as support for affinity diagramming — a bachelor's thesis asking whether interaction designers can get AI's help clustering qualitative research, without ever sending that data to the cloud.
          </p>
          <FactGrid items={[
            ['Role', 'UX Research & Prototype Dev.'],
            ['Timeline', 'Spring 2026'],
            ['Method', 'Research through Design'],
            ['Institution', 'Stockholm University'],
          ]} />
        </Reveal>
      </header>

      {/* Problem */}
      <Section label="The Problem" title={<>A tool designers<br />can't actually use</>}>
        <Reveal style={{ maxWidth: 720 }}>
          <Body style={{ marginBottom: 24 }}>
            Affinity diagramming is one of interaction design's most basic tools: post-its from interviews and user studies get grouped, labelled and clustered into themes that shape everything downstream. It's also entirely manual, and often the first thing that buckles under a large study.
          </Body>
          <Body style={{ marginBottom: 24 }}>
            AI has gotten good at exactly this kind of pattern-finding — but almost every tool that does it runs on someone else's server. For a designer holding raw interview transcripts, that usually isn't an option: the data is sensitive, and sharing it with a third party isn't something participants consented to.
          </Body>
          <Body>
            This thesis asks a narrower, more practical question: what if the model runs locally instead — entirely on the designer's own machine?
          </Body>
        </Reveal>
      </Section>

      {/* Research Question */}
      <section style={{ padding: '90px 48px', borderTop: `1px solid ${ink(0.1)}` }}>
        <Reveal>
          <div style={{ marginBottom: 24 }}><Label>Research Question</Label></div>
          <Quote>
            How can an implementation with a local AI model support interaction designers' work with clustering in affinity diagrams?
          </Quote>
        </Reveal>
      </section>

      {/* Process */}
      <Section label="Process" title="Building the thing to study it">
        <Reveal style={{ maxWidth: 720, marginBottom: 56 }}>
          <Body style={{ marginBottom: 24 }}>
            <strong style={{ color: '#0a0a0a', fontWeight: 500 }}>Research through Design</strong> — because no local-AI tool for this existed to study, the thesis builds one and uses it as the object of the research question.
          </Body>
          <Body>
            <strong style={{ color: '#0a0a0a', fontWeight: 500 }}>Mixed Methods</strong> — a moderated usability test (think-aloud + interview) paired with a short survey, run across two pilot rounds and six recorded sessions with interaction design students at Stockholm University.
          </Body>
        </Reveal>
        <Reveal>
          <StatRow items={[['6', 'Usability sessions'], ['9', 'Participants'], ['2', 'Pilot rounds'], ['113 → 18 → 5', 'Codes, themes, categories']]} />
        </Reveal>
      </Section>

      {/* Prototype */}
      <Section label="The Prototype" title="What it actually does">
        <Reveal style={{ maxWidth: 720, marginBottom: 48 }}>
          <Body style={{ marginBottom: 24 }}>
            A small web tool: paste in post-it–style notes and it clusters them locally using sentence embeddings, then asks a local language model to name each cluster. Everything runs on-device — nothing about the input data ever leaves the machine.
          </Body>
          <Body>
            Development deliberately prioritised technical feasibility over visual polish. The interface exists to test whether local clustering holds up, not to be a finished product — the design work lives in the research and testing around it, not the UI chrome.
          </Body>
        </Reveal>

        <Reveal style={{ marginBottom: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 1, background: ink(0.1) }}>
            {['Input notes', 'Embed meaning', 'Cluster by similarity', 'Name clusters'].map((s, i) => (
              <div key={s} style={{ background: '#f2f0eb', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontSize: 11, color: ink(0.35), letterSpacing: '0.1em' }}>{`0${i + 1}`}</span>
                <span style={{ fontSize: 14, color: '#0a0a0a', fontWeight: 500 }}>{s}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['Flask', 'Ollama', 'bge-large embeddings', 'k-means clustering', 'Mistral (cluster naming)'].map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </Reveal>

        <Reveal style={{ marginBottom: 56 }}>
          <Fig src="/images/thesis/prototype-ui.png" alt="Prototype interface showing post-it notes organized into AI-generated clusters" caption="The working prototype — post-its go in on the left, generated clusters with AI-labelled categories appear below." />
        </Reveal>

        <Reveal>
          <Fig src="/images/thesis/triangle.png" alt="Houde and Hill's prototype framework, marked between Role and Implementation" maxWidth={420} caption="Positioned using Houde & Hill's (1997) prototype framework — closer to Implementation and Role than Look & Feel. The goal was testing whether it works, not how it looks." />
        </Reveal>
      </Section>

      {/* Testing */}
      <Section label="Testing" title="Nine designers, six sessions">
        <Reveal style={{ maxWidth: 720, marginBottom: 48 }}>
          <Body>
            Two of the six sessions were run as pilots, used to refine both the tool and the test script before the real thing. Each participant worked through a fictional but realistic dataset — public-transit app feedback — thinking aloud as the prototype clustered their notes, then reflected in a short interview and closed with a survey.
          </Body>
        </Reveal>
        <Reveal>
          <Fig src="/images/thesis/whiteboard.jpg" alt="Physical whiteboard covered in post-it notes from a usability session" caption="Notes from a live session, clustered on a whiteboard — the same material later became the affinity diagram used to analyse the interviews themselves." />
        </Reveal>
      </Section>

      {/* Findings: use cases */}
      <Section label="What We Found" title="Three ways to use it">
        <Reveal style={{ marginBottom: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 40 }}>
            {useCases.map(u => (
              <div key={u.n}>
                <p style={{ fontSize: 11, letterSpacing: '0.14em', color: ink(0.35), marginBottom: 14 }}>{u.n}</p>
                <h3 style={{ fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif', fontWeight: 700, fontSize: 22, letterSpacing: '-0.01em', color: '#0a0a0a', marginBottom: 14 }}>{u.title}</h3>
                <p style={{ fontSize: 15, color: ink(0.65), lineHeight: 1.75, fontWeight: 300, marginBottom: 18 }}>{u.body}</p>
                {u.quotes.map(q => (
                  <p key={q} style={{ fontSize: 14, fontStyle: 'italic', color: ink(0.4), lineHeight: 1.6, marginBottom: 6 }}>{q}</p>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 15, color: ink(0.55), lineHeight: 1.8, fontWeight: 300, fontStyle: 'italic', maxWidth: 720 }}>
            Fittingly, the interview data itself was analysed the same way — with an affinity diagram, built by hand from every session's transcript.
          </p>
        </Reveal>

        <Reveal style={{ marginBottom: 56 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
            <Fig src="/images/thesis/findings-overview.png" alt="Overview diagram of all findings, grouped into five categories" maxWidth="100%" caption="All 18 themes, grouped into five top-level categories of findings." />
            <Fig src="/images/thesis/theme-usage.png" alt="Detail diagram of the 'how we want to use it' theme with supporting quotes" maxWidth="100%" caption="Detail: how participants wanted to use the prototype, with supporting quotes." />
          </div>
        </Reveal>

        <Reveal>
          <div style={{ marginBottom: 28 }}>
            <Label>Challenges Raised</Label>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, background: ink(0.1) }}>
            {challenges.map(c => (
              <div key={c.title} style={{ background: '#f2f0eb', padding: '28px 24px' }}>
                <h4 style={{ fontSize: 15, fontWeight: 500, color: '#0a0a0a', marginBottom: 12 }}>{c.title}</h4>
                <p style={{ fontSize: 14, color: ink(0.6), lineHeight: 1.7, fontWeight: 300 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Survey */}
      <Section label="Survey Results" title="Support, not automation">
        <Reveal style={{ marginBottom: 40, maxWidth: 720 }}>
          <Body>
            None of the five survey respondents wanted the AI to generate a complete affinity diagram unsupervised — the strongest, most unanimous result in the data. A majority agreed it would save time and make the process easier, but opinion was more split on whether it actually improved quality.
          </Body>
        </Reveal>
        <Reveal>
          <Fig src="/images/thesis/survey-results.png" alt="Diverging bar chart of survey responses across eleven statements about the prototype" maxWidth={880} caption="Survey responses across all five participants, from strongly disagree to strongly agree." />
        </Reveal>
      </Section>

      {/* Implications */}
      <Section label="Design Implications" title="Support, kept legible">
        <Reveal style={{ maxWidth: 720 }}>
          <Body style={{ marginBottom: 24 }}>
            Across every session, one line stayed consistent: nobody wanted the tool to replace their judgement, only to support it. A future version needs to stay legible — giving people enough insight into how the clustering works that they can trust it, correct it, or safely ignore it.
          </Body>
          <Body>
            It also needs to flex. Some designers want a fast, rough starting point; others want a standing second opinion late in the process. A single fixed workflow won't serve both — the tool has to support several ways of working, not just one.
          </Body>
        </Reveal>
      </Section>

      {/* Reflection */}
      <Section label="Reflection" title="What this doesn't prove">
        <Reveal style={{ maxWidth: 720 }}>
          <Body>
            The study is intentionally small — five survey respondents, all interaction design students from the same programme, tested in a controlled setting rather than on a live project. That's enough to spot a pattern, not to prove one. Mixed Methods helps triangulate the qualitative and quantitative sides against each other, but a follow-up study with a larger, more varied group would be needed to confirm the trend.
          </Body>
        </Reveal>
      </Section>

      {/* Footer detail */}
      <footer style={{ padding: '56px 48px', borderTop: `1px solid ${ink(0.1)}` }}>
        <Reveal>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
            {['Figma', 'Python', 'Flask', 'Ollama', 'Mistral', 'Affinity Diagramming', 'Usability Testing', 'Research through Design'].map(t => <Tag key={t}>{t}</Tag>)}
          </div>
          <p style={{ fontSize: 13, color: ink(0.4), lineHeight: 1.8, marginBottom: 28, maxWidth: 640 }}>
            Written as a joint bachelor's thesis with Andreas Hessel Lundberg, supervised by Ola Knutsson — Department of Computer and Systems Sciences, Stockholm University.
          </p>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="/images/thesis/thesis.pdf" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0a0a0a', borderBottom: `1px solid ${ink(0.25)}`, paddingBottom: 4, transition: 'border-color .2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = ink(0.8)} onMouseLeave={e => e.currentTarget.style.borderColor = ink(0.25)}>
              Read the full thesis (PDF) ↗
            </a>
            <Link to="/#work" style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: ink(0.45) }}
              onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'} onMouseLeave={e => e.currentTarget.style.color = ink(0.45)}>
              ← Back to work
            </Link>
          </div>
        </Reveal>
      </footer>
    </main>
  );
}
