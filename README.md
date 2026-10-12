# WebDev Lab

A complete, offline-capable S6 ICT web development handbook.

## Open locally
Extract the ZIP first. Open webdev-lab/index.html in a modern browser. Keep every file and folder together. No installation, Node.js, build process, backend, account or internet connection is needed for the handbook itself. External documentation and GitHub/ChatGPT services require internet access and appropriate school approval.

## Structure
- index.html: project brief, contact email, boundaries, progress tracker, full tutor prompt, multimedia, rubric and debugging.
- html.html: HTML reference.
- css.html: CSS reference and five interactive playgrounds.
- javascript.html: progressive reference and eight working demonstrations.
- github.html: Git, collaboration, optional Pages publication, CMS introduction and sources.
- example.html: complete fictional company site explanation and source panels.
- style.css / script.js: shared handbook styles and interactions.
- search-data.js: local topic index; no network request needed.
- images/: original SVG coffee, pastry, mountain and identity graphics.
- examples/: eight self-contained JavaScript examples and responsive layout demo.
- examples/alpine-coffee/: four-page fictional company site with its own CSS, JS and images.
- tutor-prompt.txt: exact complete tutor prompt from the supplied brief.
- TESTING.md: checks performed and limitations.

## Student workflow
Students work in pairs on a real local business prototype. A genuine contact attempt is required; a response is not. The eight project phases have no fixed timeline. Public publication requires teacher approval. AI is a tutor, not a developer; students must understand what they submit.

## Teacher editing
Edit the HTML files directly with a text editor. Shared presentation and behavior live in style.css and script.js. Update search-data.js when adding or renaming topics. Keep IDs unique and links consistent. The source panels on example.html are copies: update them if you modify the Alpine Coffee source.

## Progress and clipboard
Progress uses localStorage only in the current browser/profile and origin; it is not submitted or synchronized. File-URL storage behavior varies across browsers. If storage fails, a visible note explains that progress is temporary. Moving the folder or using a different browser may separate saved progress. Reset asks for confirmation. Clipboard uses the secure Clipboard API when available, falls back to legacy copying, then selects the text for manual Ctrl+C/Command+C. No external script or service is required.

## GitHub Pages (optional, teacher approval required)
1. Create a repository with the approved visibility. Ordinary GitHub Free personal repositories generally need to be public for Pages.
2. Upload the contents of webdev-lab, not just the ZIP or an extra enclosing folder. index.html must be at the repository root.
3. Settings → Pages → Build and deployment → Deploy from a branch.
4. Choose main and /(root), then Save. Alternatively put the entire site in /docs and choose /docs.
5. Wait for deployment and open the URL shown in Pages settings. Check Actions for errors.
6. Commit and push later changes to update the site.
Only root or /docs can be selected in basic branch deployment. This static site does not run PHP or a server database. A private repository does not by itself guarantee private Pages hosting. Official reference: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Assets and scope
All included illustrations are original SVGs created for this educational resource and may be reused in this classroom project. Alpine Coffee, its prices, hours and story are fictional; no real contact details, bookings, payments or message submission are included. The site supports Advanced web design and related project learning in European Schools ICT S6–S7 (2019-05-D-24-en-2). It does not cover the whole syllabus; practical CMS work needs separate teaching.
