// Runs Lighthouse against key routes on the running prod server (:3000) and
// prints a score table. Usage: node scripts/run-lighthouse.mjs
import { execFileSync } from "node:child_process";
import { readFileSync, mkdirSync } from "node:fs";

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
mkdirSync(".lh", { recursive: true });
process.env.CHROME_PATH =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const rows = [];
for (const [name, path] of ROUTES) {
  const out = `.lh/${name}.json`;
  try {
    execFileSync(
      "npx",
      [
        "--yes",
        "lighthouse@12",
        `${BASE}${path}`,
        "--quiet",
        "--chrome-flags=--headless=new --no-sandbox --disable-gpu",
        "--only-categories=performance,accessibility,best-practices,seo",
        "--output=json",
        `--output-path=${out}`,
      ],
      { stdio: "ignore", shell: true, timeout: 120000 },
    );
  } catch {
    // chrome-launcher throws EPERM on temp cleanup (Windows) after writing the
    // report — ignore and read the JSON if it exists.
  }
  try {
    const r = JSON.parse(readFileSync(out, "utf8"));
    const c = r.categories;
    const s = (k) => Math.round((c[k]?.score ?? 0) * 100);
    rows.push({
      route: path,
      Perf: s("performance"),
      A11y: s("accessibility"),
      BP: s("best-practices"),
      SEO: s("seo"),
      LCP: r.audits["largest-contentful-paint"]?.displayValue ?? "",
      TBT: r.audits["total-blocking-time"]?.displayValue ?? "",
    });
  } catch {
    rows.push({
      route: path,
      Perf: "ERR",
      A11y: "",
      BP: "",
      SEO: "",
      LCP: "",
      TBT: "",
    });
  }
}
console.table(rows);
