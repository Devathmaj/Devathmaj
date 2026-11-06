#!/usr/bin/env node
/**
 * Render the self-contained README artwork: node profile/render.mjs
 * CSS inside an SVG image works in GitHub and VS Code Markdown previews.
 * No scripts, remote fonts, or external animation services are required.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(resolve(root, "profile/profile.json"), "utf8"));
const output = resolve(root, "assets/profile.svg");

const PAPER = "#f4efe4";
const INK = "#141210";
const MUTED = "#8a8172";
const SOFT = "#6b6355";
const RULE = "#c9c1b0";
const SERIF = "Georgia, 'Times New Roman', serif";
const MONO = "ui-monospace, Menlo, Consolas, monospace";
const W = 1200;
const H = 744;
const M = 48;
const RIGHT = W - M;
const CYCLE = 12;

const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
}[char]));
const attrs = (values) => Object.entries(values)
  .filter(([, value]) => value !== undefined)
  .map(([key, value]) => `${key}="${escape(value)}"`).join(" ");
const text = (x, y, content, options = {}) => `<text ${attrs({
  x, y, fill: INK, "font-family": SERIF, "font-size": 20, ...options,
})}>${escape(content)}</text>`;
const label = (x, y, content, options = {}) => text(x, y, content, {
  fill: SOFT, "font-family": MONO, "font-size": 11, "letter-spacing": 2, ...options,
});
const line = (x1, y1, x2, y2, stroke = RULE, width = 1) =>
  `<line ${attrs({ x1, y1, x2, y2, stroke, "stroke-width": width })} />`;
const rect = (x, y, width, height, fill, options = {}) =>
  `<rect ${attrs({ x, y, width, height, fill, ...options })} />`;
const link = (href, content) => `<a href="${escape(href)}">${content}</a>`;
const itemText = (item) => item.text ?? item.lines.join(" ");
// Negative delays start every loop in a useful state, with no initial blank cycle.
const delay = (index, count) => index === 0 ? 0 : (index - count) * CYCLE / count;
const sequence = (name, count, active, inactive) => `@keyframes ${name} {
    0%, ${80 / count}% { ${active} }
    ${100 / count}%, 96% { ${inactive} }
    100% { ${active} }
  }`;

const description = `${data.name}, ${data.tagline}. Selected work: ${data.selectedWork.items.map(itemText).join(", ")}. Credentials: ${data.credentials.items.map(itemText).join(", ")}. ${data.principle.quote.join(" ")}`;
const parts = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc">`,
  `<title id="title">${escape(`${data.name} — ${data.masthead}`)}</title>`,
  `<desc id="desc">${escape(description)}</desc>`,
  `<defs>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="3" />
      <feColorMatrix type="matrix" values="0 0 0 0 0.08  0 0 0 0 0.07  0 0 0 0 0.05  0 0 0 0.3 0" />
    </filter>
    <clipPath id="focus-window"><rect x="48" y="264" width="700" height="48" /></clipPath>
    <clipPath id="top-rule"><rect x="48" y="70" width="1104" height="4" /></clipPath>
  </defs>`,
  `<style>
    .enter { animation: enter 1000ms cubic-bezier(0.23, 1, 0.32, 1) both; }
    .projects { animation-delay: 160ms; }
    .instrument { animation-delay: 240ms; }
    .credentials { animation-delay: 320ms; }
    @keyframes enter { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
    .rule-runner { animation: rule-runner 12s linear infinite; }
    @keyframes rule-runner { from { transform: translateX(-160px); } to { transform: translateX(1104px); } }
    .focus { opacity: 0; animation: focus ${CYCLE}s cubic-bezier(0.77, 0, 0.175, 1) infinite; }
    ${sequence("focus", data.focus.length, "opacity: 1; transform: translateY(0);", "opacity: 0; transform: translateY(14px);")}
    .orbit { transform-origin: 984px 256px; animation: orbit 18s linear infinite; }
    .orbit-inner { animation-duration: 12s; animation-direction: reverse; }
    @keyframes orbit { to { transform: rotate(360deg); } }
    .phase { opacity: 0; animation: phase ${CYCLE}s ease infinite; }
    ${sequence("phase", data.footer.stages.length, "opacity: 1;", "opacity: 0;")}
    .project-signal { transform-box: fill-box; transform-origin: left; animation: project-signal ${CYCLE}s cubic-bezier(0.77, 0, 0.175, 1) infinite; }
    ${sequence("project-signal", data.selectedWork.items.length, "transform: scaleX(1); opacity: 1;", "transform: scaleX(0.12); opacity: 0.35;")}
    .principle-line { animation: principle-line ${CYCLE}s ease infinite; }
    ${sequence("principle-line", data.principle.quote.length, "opacity: 1; transform: translateX(4px);", "opacity: 0.55; transform: translateX(0);")}
    .principle-mark { opacity: 0; animation: principle-mark ${CYCLE}s ease infinite; }
    ${sequence("principle-mark", data.principle.quote.length, "opacity: 1;", "opacity: 0;")}
    .folio-cursor { animation: folio-cursor 6s linear infinite; }
    @keyframes folio-cursor { 0% { transform: translateX(0); opacity: 0; } 5%, 95% { opacity: 1; } 100% { transform: translateX(160px); opacity: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .enter, .orbit, .project-signal, .principle-line { animation: none; transform: none; opacity: 1; }
      .focus, .phase, .rule-runner, .principle-mark, .folio-cursor { animation: none; opacity: 0; }
      .focus:first-child, .phase:first-child { opacity: 1; transform: none; }
    }
  </style>`,
  rect(0, 0, W, H, PAPER),
  rect(0, 0, W, H, PAPER, { filter: "url(#grain)", opacity: 0.3 }),
];

// Edition line and a moving printer's rule.
parts.push(
  label(M, 45, "D / AK", { fill: INK, "font-size": 16, "font-weight": 700, "letter-spacing": 3 }),
  label(174, 45, `${data.masthead} — ENGINEERING & CRAFT`),
  label(RIGHT, 45, `${data.issue} / ${data.year} / ${data.location}`, { "text-anchor": "end" }),
  line(M, 72, RIGHT, 72, INK, 2),
  `<g clip-path="url(#top-rule)" aria-hidden="true">${rect(M, 70, 160, 4, MUTED, { class: "rule-runner" })}</g>`,
  `<g class="enter">`,
  label(M, 115, "SOFTWARE ENGINEER", { "letter-spacing": 3 }),
  ...data.nameLines.map((name, index) => text(M - 3, 181 + index * 70, name, {
    "font-size": 78, "font-weight": 700, "letter-spacing": -3,
  })),
  `<g clip-path="url(#focus-window)">`,
  `<g>`,
  ...data.focus.map((focus, index) => `<g class="focus" style="animation-delay: ${delay(index, data.focus.length)}s">
    ${text(M, 297, focus, { "font-size": 31, "font-style": "italic", fill: SOFT })}
    ${label(752, 292, `${String(index + 1).padStart(2, "0")} / ${String(data.focus.length).padStart(2, "0")}`, { "text-anchor": "end" })}
  </g>`),
  `</g></g></g>`,
);

// Project index: the horizontal signals share the twelve-second editorial rhythm.
parts.push(`<g class="enter projects">`, line(M, 326, 752, 326, INK), label(M, 353, data.selectedWork.label), label(752, 353, `INDEX / 01—${String(data.selectedWork.items.length).padStart(2, "0")}`, { "text-anchor": "end" }));
data.selectedWork.items.forEach((item, index) => {
  const y = 397 + index * 51;
  parts.push(
    label(M, y, String(index + 1).padStart(2, "0")),
    link(item.href, text(94, y + 2, item.text, { "font-size": 30 })),
    line(606, y - 8, 710, y - 8),
    rect(606, y - 10, 104, 4, INK, { class: "project-signal", style: `animation-delay: ${delay(index, data.selectedWork.items.length)}s` }),
    text(750, y, "↗", { "text-anchor": "end", "font-family": MONO, "font-size": 24, fill: SOFT }),
    line(M, y + 18, 752, y + 18),
  );
});
parts.push(link(data.selectedWork.noteHref, text(M, 554, `${data.selectedWork.noteLines.join(" ")} ↗`, { "font-size": 18, "font-style": "italic", fill: SOFT })), `</g>`);

// The dark instrument panel is decorative, not a live status or activity metric.
parts.push(
  `<g class="enter instrument">`, rect(800, 104, 352, 474, INK),
  label(824, 135, "ENGINEERING IN MOTION", { fill: MUTED, "font-size": 10, "letter-spacing": 2.4 }),
  `<g aria-hidden="true">`,
  `<circle cx="984" cy="256" r="88" fill="none" stroke="${SOFT}" stroke-width="0.7" />`,
  `<circle cx="984" cy="256" r="61" fill="none" stroke="${SOFT}" stroke-width="0.7" stroke-dasharray="2 7" />`,
  line(880, 256, 898, 256, MUTED), line(1070, 256, 1088, 256, MUTED),
  line(984, 153, 984, 168, MUTED), line(984, 344, 984, 359, MUTED),
  `<g class="orbit"><circle cx="984" cy="168" r="5" fill="${PAPER}" />${rect(981, 341, 6, 6, MUTED)}</g>`,
  `<g class="orbit orbit-inner"><circle cx="1045" cy="256" r="3" fill="${PAPER}" /></g>`,
  `<g>`,
  ...data.footer.stages.map((stage, index) => `<g class="phase" style="animation-delay: ${delay(index, data.footer.stages.length)}s">
    ${label(984, 243, `${String(index + 1).padStart(2, "0")} / ${String(data.footer.stages.length).padStart(2, "0")}`, { "text-anchor": "middle", fill: MUTED, "font-size": 10 })}
    ${text(984, 274, stage, { fill: PAPER, "text-anchor": "middle", "font-size": 23, "letter-spacing": 1 })}
  </g>`),
  `</g></g>`,
  line(824, 378, 1128, 378, SOFT, 0.7),
  label(824, 402, data.principle.attribution, { fill: MUTED, "font-size": 10 }),
  ...data.principle.quote.map((quote, index) => `<g>
    ${rect(813, 419 + index * 32, 2, 22, PAPER, { class: "principle-mark", style: `animation-delay: ${delay(index, data.principle.quote.length)}s` })}
    <g class="principle-line" style="animation-delay: ${delay(index, data.principle.quote.length)}s">
      ${text(824, 437 + index * 32, quote, { fill: PAPER, "font-size": 23, "font-style": "italic" })}
    </g>
  </g>`),
  link(data.principle.websiteHref, label(824, 554, `${data.principle.website} ↗`, { fill: PAPER, "font-size": 12, "letter-spacing": 1 })),
  `</g>`,
);

// Credentials and contact details remain readable throughout every animation.
parts.push(`<g class="enter credentials">`, line(M, 604, RIGHT, 604, INK), label(M, 629, data.credentials.label));
data.credentials.items.forEach((item, index) => {
  const x = M + index * 414;
  const lines = item.lines ?? [item.text];
  parts.push(link(item.href, lines.map((content, row) => text(x, 659 + row * 23, content, { "font-size": 19 })).join("\n")));
});
parts.push(
  label(920, 629, "LET’S CONNECT"),
  link(`mailto:${data.principle.email}`, text(920, 658, "Send a note ↗", { "font-size": 21, "font-style": "italic" })),
  label(920, 681, data.principle.email, { "font-size": 10, "letter-spacing": 0 }),
  `</g>`,
  line(M, 704, RIGHT, 704, INK, 2),
  link(data.footer.leftHref, label(M, 727, data.footer.left, { "font-size": 10 })),
  `<g aria-hidden="true">${line(820, 722, 980, 722)}${rect(820, 720, 4, 4, INK, { class: "folio-cursor" })}</g>`,
  label(RIGHT, 727, "ALWAYS ITERATING", { "text-anchor": "end", "font-size": 10, "letter-spacing": 1.5 }),
  `</svg>`,
);

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${parts.join("\n")}\n`, "utf8");
console.log(`Wrote ${output}`);
