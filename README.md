# Sandra Sæbø — Portfolio

A minimal, black-and-white gallery portfolio for interaction, UX/UI and digital design opportunities. Built with React and React Router.

## Development

Run `npm install` if dependencies are missing, then `npm start` for the local preview. Run `npm run build` to generate the production website in `build/`.

## Interactions

- Opening the homepage plays a brief typographic name introduction before revealing the portfolio. It can be dismissed with Escape. Direct project links and returns from case studies bypass it; reduced-motion preferences shorten it.

- A focused project gallery supports pointer dragging, touch swiping, left/right keyboard navigation and wheel/trackpad gestures, wrapping from the last project to the first.
- Overview spreads all five projects into a contact sheet; project names return to a focused view.
- Subtle pointer response adds depth without automatic animation loops.
- About opens a native modal panel with education, professional background and expandable experience. Escape closes it and restores focus.
- The homepage has no banners, ticker, hero slogan or long biography.
- Reduced-motion preferences disable transitions and pointer tilt.

## Content

- Homepage elements live in `src/components/`; the profile panel is opened by `Navbar.jsx`.
- The gallery projects and interaction logic are in `src/components/Work.jsx`. Civic Watch uses the original Wix SVG and app screens in `public/images/civic-watch/`; its five-second Y-axis spin is rendered by `CivicLogo.jsx`, with pause and reduced-motion support.
- Affinity’s research case study is in `src/pages/ThesisCase.jsx`.
- Emelinn, Motion and Spiral case studies are in `src/pages/ProjectCase.jsx`.
- Shared case layout is in `src/components/CaseLayout.jsx`.
- Global typography, responsive layouts and reduced-motion styles are in `src/index.css`.
- Existing project images and thesis material are in `public/images/`.
- The English CV is at `public/Sandra-Saeboe-CV.pdf`.

The portfolio uses existing project material and professional background supplied in the portfolio and prior CV chats. Samto and HelloKefi are represented as experience; no speculative client visuals or outcome statistics have been added.

## Deployment

The existing site is hosted at https://portfolio-sandrasaeboe.vercel.app. This checkout builds as a static Create React App project. In Vercel use `npm run build` and output directory `build`. `vercel.json` rewrites project routes to the app entry point so direct case-study links work.

A local rebuild does not change the published site. Deploy through the existing Vercel project or its connected Git repository after reviewing the new content.
