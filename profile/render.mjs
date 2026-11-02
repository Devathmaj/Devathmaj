#!/usr/bin/env node
/**
 * Renders profile/profile.json into assets/profile.svg.
 *
 * GitHub strips inline styles and table attributes from README HTML, so the
 * editorial layout is drawn once here and embedded as a single SVG instead.
 *
 * Run locally: node profile/render.mjs
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const data = JSON.parse(readFileSync(resolve(here, "profile.json"), "utf8"));
const output = resolve(root, "assets", "profile.svg");

const PAPER = "#f4efe4";
const INK = "#141210";
const MUTED = "#8a8172";
const SOFT = "#6b6355";
const RULE = "#c9c1b0";
const SERIF = "Georgia, 'Times New Roman', serif";
const MONO = "ui-monospace, Menlo, Consolas, monospace";

const W = 1200;
const M = 72;
const RIGHT = W - M;

const CONTENT_TOP = 270;
const LABEL_Y = 296;
const FIRST_ITEM_Y = 330;
const WORK_LINE = 30;
const CRED_LINE = 24;
const NOTE_GAP = 34;
const NOTE_LINE = 22;

const escapeText = (value) =>
  String(value).replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char]));

const escapeAttr = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  }[char]));

const attrs = (values) =>
  Object.entries(values)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([key, value]) => `${key}="${escapeAttr(value)}"`)
    .join(" ");

const line = (x1, y1, x2, y2, stroke, width) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}" />`;

const text = ({
  x,
  y,
  content,
  size = 16,
  fill = INK,
  family = SERIF,
  weight,
  italic = false,
  anchor,
  spacing,
  href,
}) => {
  const node = `<text ${attrs({
    x,
    y,
    "font-family": family,
    "font-size": size,
    fill,
    "font-weight": weight,
    "font-style": italic ? "italic" : undefined,
    "text-anchor": anchor,
    "letter-spacing": spacing,
  })}>${escapeText(content)}</text>`;

  return href
    ? `<a href="${escapeAttr(href)}" target="_blank">${node}</a>`
    : node;
};

const textBlock = ({
  x,
  ys,
  lines,
  href,
  ...style
}) => {
  const nodes = lines
    .map((content, index) => text({ x, y: ys[index], content, ...style }))
    .join("\n      ");

  return href
    ? `<a href="${escapeAttr(href)}" target="_blank">\n      ${nodes}\n    </a>`
    : nodes;
};

// ---------------------------------------------------------------- column math

const work = data.selectedWork;
const workNoteLines = work.noteLines ?? [work.note];
const workYs = work.items.map((_, index) => FIRST_ITEM_Y + index * WORK_LINE);
const workNoteY = workYs[workYs.length - 1] + NOTE_GAP;
const workNoteYs = workNoteLines.map((_, index) => workNoteY + index * NOTE_LINE);

const credentials = data.credentials;
let credentialCursor = FIRST_ITEM_Y;
const credentialItems = credentials.items.map((item) => {
  const lines = item.lines ?? [item.text];
  const ys = lines.map((_, index) => credentialCursor + index * CRED_LINE);
  credentialCursor = ys[ys.length - 1] + CRED_LINE + 8;
  return { item, lines, ys };
});
const lastCredentialY = Math.max(
  ...credentialItems.flatMap(({ ys }) => ys)
);
const credentialNoteLines = credentials.noteLines ?? [credentials.note];
const credentialNoteY = lastCredentialY + NOTE_GAP;
const credentialNoteYs = credentialNoteLines.map(
  (_, index) => credentialNoteY + index * NOTE_LINE
);

const principle = data.principle;
const boxTop = CONTENT_TOP;
const boxLabelY = LABEL_Y;
const quoteY = 326;
const quoteLineHeight = 26;
const quoteYs = principle.quote.map((_, index) => quoteY + index * quoteLineHeight);
const attributionY = quoteYs[quoteYs.length - 1] + 24;
const boxBottom = attributionY + 14;
const websiteY = boxBottom + 30;
const emailY = websiteY + 24;

const contentBottom = Math.max(
  workNoteYs[workNoteYs.length - 1] + 10,
  credentialNoteYs[credentialNoteYs.length - 1] + 10,
  emailY + 8
);
const columnRuleBottom = contentBottom + 12;
const footerRuleY = columnRuleBottom + 18;
const folioY = footerRuleY + 20;
const H = folioY + 28;

const columns = {
  left: { x: M, width: 340 },
  middle: { x: 452, width: 300 },
  right: { x: 792, width: RIGHT - 792 },
};
const dividerOne = columns.left.x + columns.left.width;
const dividerTwo = columns.middle.x + columns.middle.width;

// ---------------------------------------------------------------------- draw

const parts = [];

parts.push(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc">`,
  `  <title id="title">${escapeText(`${data.name} — ${data.masthead}`)}</title>`,
  `  <desc id="desc">${escapeText(
    `${data.name}, ${data.tagline}. Selected work: ${work.items
      .map((item) => item.text ?? item.lines.join(" "))
      .join(", ")}. Credentials: ${credentials.items
      .map((item) => item.text ?? item.lines.join(" "))
      .join(", ")}.`
  )}</desc>`,
  `  <defs>`,
  `    <filter id="grain" x="0" y="0" width="100%" height="100%">`,
  `      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="3" result="noise" />`,
  `      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.08  0 0 0 0 0.07  0 0 0 0 0.05  0 0 0 0.42 0" />`,
  `    </filter>`,
  `  </defs>`,
  `  <rect width="${W}" height="${H}" fill="${PAPER}" />`,
  `  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.35" />`
);

// Masthead
parts.push(
  `  ${line(M, 40, RIGHT, 40, INK, 3)}`,
  `  ${text({
    x: M,
    y: 70,
    content: data.masthead,
    size: 22,
    weight: 700,
    spacing: 7,
  })}`,
  `  ${text({
    x: RIGHT,
    y: 70,
    content: `${data.issue} · ${data.year} · ${data.location}`,
    size: 11.5,
    fill: MUTED,
    family: MONO,
    anchor: "end",
    spacing: 3,
  })}`,
  `  ${line(M, 88, RIGHT, 88, INK, 0.8)}`
);

// Headline
parts.push(
  `  ${text({
    x: M,
    y: 174,
    content: data.name,
    size: 72,
    weight: 700,
    spacing: -1.5,
  })}`,
  `  ${text({
    x: M,
    y: 214,
    content: data.tagline,
    size: 22,
    fill: "#4a443a",
    italic: true,
  })}`,
  `  ${line(M, 244, RIGHT, 244, RULE, 0.8)}`
);

// Column rules
parts.push(
  `  ${line(dividerOne, 272, dividerOne, columnRuleBottom, RULE, 0.8)}`,
  `  ${line(dividerTwo, 272, dividerTwo, columnRuleBottom, RULE, 0.8)}`
);

// Selected work
parts.push(
  `  ${text({
    x: columns.left.x,
    y: LABEL_Y,
    content: `— ${work.label}`,
    size: 11,
    fill: MUTED,
    family: MONO,
    spacing: 3.5,
  })}`
);

work.items.forEach((item, index) => {
  parts.push(
    `  ${text({
      x: columns.left.x,
      y: workYs[index],
      content: item.text,
      size: 20,
      weight: 700,
      href: item.href,
    })}`
  );
});

parts.push(
  `  ${textBlock({
    x: columns.left.x,
    ys: workNoteYs,
    lines: workNoteLines,
    size: 17,
    fill: SOFT,
    italic: true,
    href: work.noteHref,
  })}`
);

// Credentials
parts.push(
  `  ${text({
    x: columns.middle.x,
    y: LABEL_Y,
    content: `— ${credentials.label}`,
    size: 11,
    fill: MUTED,
    family: MONO,
    spacing: 3.5,
  })}`
);

credentialItems.forEach(({ item, lines, ys }) => {
  parts.push(
    `  ${textBlock({
      x: columns.middle.x,
      ys,
      lines,
      size: 19,
      weight: 700,
      href: item.href,
    })}`
  );
});

parts.push(
  `  ${textBlock({
    x: columns.middle.x,
    ys: credentialNoteYs,
    lines: credentialNoteLines,
    size: 16,
    fill: SOFT,
    italic: true,
    href: credentials.noteHref,
  })}`
);

// Principle box
parts.push(
  `  <rect x="${columns.right.x}" y="${boxTop}" width="${columns.right.width}" height="${boxBottom - boxTop}" fill="${INK}" />`,
  `  ${text({
    x: columns.right.x + 20,
    y: boxLabelY,
    content: `— ${principle.label}`,
    size: 11,
    fill: MUTED,
    family: MONO,
    spacing: 3.5,
  })}`,
  `  ${textBlock({
    x: columns.right.x + 20,
    ys: quoteYs,
    lines: principle.quote,
    size: 19,
    fill: PAPER,
    italic: true,
  })}`,
  `  ${text({
    x: columns.right.x + 20,
    y: attributionY,
    content: `— ${principle.attribution}`,
    size: 11.5,
    fill: "#9a917f",
    family: MONO,
    spacing: 1.5,
  })}`,
  `  ${text({
    x: columns.right.x,
    y: websiteY,
    content: principle.website,
    size: 21,
    href: principle.websiteHref,
  })}`,
  `  ${text({
    x: columns.right.x,
    y: emailY,
    content: principle.email,
    size: 13,
    fill: MUTED,
    family: MONO,
    spacing: 1,
    href: `mailto:${principle.email}`,
  })}`
);

// Folio
parts.push(
  `  ${line(M, footerRuleY, RIGHT, footerRuleY, INK, 2)}`,
  `  ${text({
    x: M,
    y: folioY,
    content: data.footer.left,
    size: 11,
    fill: MUTED,
    family: MONO,
    spacing: 2.5,
    href: data.footer.leftHref,
  })}`,
  `  ${text({
    x: RIGHT,
    y: folioY,
    content: data.footer.right,
    size: 11,
    fill: MUTED,
    family: MONO,
    anchor: "end",
    spacing: 2.5,
  })}`,
  `</svg>`
);

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${parts.join("\n")}\n`, "utf8");

console.log(`Wrote ${output}`);
