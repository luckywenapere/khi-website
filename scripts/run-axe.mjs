// Standalone axe-core a11y scan over key routes using Playwright's matched
// Chromium. On the project route it opens the Lightbox so the dialog is scanned
// too. Usage: node scripts/run-axe.mjs
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE = "http://localhost:3000";
const ROUTES = [
  ["home", "/"],
  ["about", "/about"],
  ["program", "/programs/health-hygiene"],
  ["project", "/projects/khi-scholarship-cohort-1"],
  ["impact", "/impact"],
  ["stories", "/stories"],
  ["story", "/stories/back-2-school"],
  ["contact", "/contact"],
  ["donate", "/donate"],
];
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const browser = await chromium.launch();
const context = await browser.newContext();
const summary = [];
let total = 0;
for (const [name, path] of ROUTES) {
  const page = await context.newPage();
  await page.goto(BASE + path, { waitUntil: "networkidle" });

  // Project route: open the Lightbox so the dialog is included in the scan.
  if (name === "project") {
    const trigger = page.locator('[aria-label^="View image"]').first();
    if (await trigger.count()) {
      await trigger.click();
      await page.waitForTimeout(400);
    }
  }

  const r = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  total += r.violations.length;
  for (const v of r.violations) {
    console.log(
      `  [${name}] ${v.impact ?? "n/a"} — ${v.id}: ${v.help} (${v.nodes.length} node[s])`,
    );
  }
  summary.push({
    route: path,
    violations: r.violations.length,
    ids: r.violations.map((v) => v.id).join(", ") || "—",
  });
  await page.close();
}
await browser.close();
console.table(summary);
console.log(
  total === 0
    ? "\n✅ axe: 0 violations across all routes"
    : `\n❌ axe: ${total} violation(s)`,
);
