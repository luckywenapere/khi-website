// Redesign v2 Phase A: stage recovered wp-export assets into public/images.
// Photo PNGs are converted to JPEG; logos stay PNG. Run once:
//   node scripts/stage-v2-assets.mjs
import { mkdirSync, rmSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const U = join(ROOT, "docs", "wp-export", "uploads");
const P = join(ROOT, "public", "images");

const jobs = [
  // ---- Partner logos (all three recovered) ----
  {
    src: join(U, "2025/05/1001136152.png"),
    dest: "partners/hopeful-hands.png",
    kind: "logo",
  },
  {
    src: join(U, "2025/05/Mask-group-2.png"),
    dest: "partners/kenvic.png",
    kind: "logo",
  },
  {
    src: join(U, "2025/04/IMG-20250423-WA0023.jpg"),
    dest: "partners/ramadan-food-aid.jpg",
    kind: "logo",
  },

  // ---- IWD / Margaret Umeche gallery: the REAL 8 Mar 2025 KSU Kabba set ----
  ...[
    "WA0065",
    "WA0067",
    "WA0068",
    "WA0069",
    "WA0078",
    "WA0079",
    "WA0080",
    "WA0087",
    "WA0089",
  ].map((n) => ({
    src: join(U, `2025/04/IMG-20250408-${n}.jpg`),
    dest: `projects/iwd-menstrual-hygiene/IMG-20250408-${n}.jpg`,
    kind: "photo",
  })),
  {
    src: join(U, "2025/04/margaret.jpg"),
    dest: "projects/iwd-menstrual-hygiene/margaret.jpg",
    kind: "photo",
  },

  // ---- Kenvic gallery additions (Instagram originals) ----
  {
    src: join(
      U,
      "2025/04/488368810_18077458573689143_5797451484621136337_n.jpg",
    ),
    dest: "projects/kenvic-leadership-conference/kenvic-students.jpg",
    kind: "photo",
  },
  {
    src: join(
      U,
      "2025/04/489760981_18077876092689143_4782598486767479375_n.jpg",
    ),
    dest: "projects/kenvic-leadership-conference/kenvic-podium.jpg",
    kind: "photo",
  },
  {
    src: join(
      U,
      "2025/04/487691683_18077363203689143_5935401722804834561_n.jpg",
    ),
    dest: "projects/kenvic-leadership-conference/kenvic-anniversary.jpg",
    kind: "photo",
  },

  // ---- Scholarship gallery additions ----
  {
    src: join(U, "2025/04/20250205_111249.jpg"),
    dest: "projects/khi-scholarship-cohort-1/certificate-award.jpg",
    kind: "photo",
  },
  {
    src: join(U, "2025/04/20250206_093514.jpg"),
    dest: "projects/khi-scholarship-cohort-1/gss-kuje-sign.jpg",
    kind: "photo",
  },
  {
    src: join(U, "2025/04/20250304_112339.jpg"),
    dest: "projects/khi-scholarship-cohort-1/cohort-certificates.jpg",
    kind: "photo",
  },
  {
    src: join(U, "2025/04/20250304_112452.jpg"),
    dest: "projects/khi-scholarship-cohort-1/school-seminar.jpg",
    kind: "photo",
  },
  {
    src: join(U, "2025/04/school-2.jpg"),
    dest: "projects/khi-scholarship-cohort-1/ict-lab-award.jpg",
    kind: "photo",
  },
  {
    src: join(U, "2025/04/school-4.jpg"),
    dest: "projects/khi-scholarship-cohort-1/ict-lab-group.jpg",
    kind: "photo",
  },

  // ---- Pads & Pals additions (photo PNGs → JPEG) ----
  {
    src: join(U, "2025/07/1001371298.png"),
    dest: "projects/pads-and-pals/frame-prop.jpg",
    kind: "photo",
  },
  {
    src: join(U, "2025/07/1001371243.png"),
    dest: "projects/pads-and-pals/walk-banner.jpg",
    kind: "photo",
  },
  {
    src: join(U, "2025/07/1001371291.png"),
    dest: "projects/pads-and-pals/school-outreach.jpg",
    kind: "photo",
  },
  {
    src: join(U, "2025/07/1001371292_1.png"),
    dest: "projects/pads-and-pals/volunteer-talk.jpg",
    kind: "photo",
  },
  {
    src: join(U, "2025/07/1001371295.png"),
    dest: "projects/pads-and-pals/distribution-line.jpg",
    kind: "photo",
  },
  {
    src: join(U, "2025/07/1001371294.png"),
    dest: "projects/pads-and-pals/one-act-of-kindness.jpg",
    kind: "photo",
  },

  // ---- Home dark CTA band (the old site's closing-band photo) + About collage ----
  {
    src: join(U, "2025/04/donate-1.jpg"),
    dest: "home/they-need-your-help.jpg",
    kind: "photo",
  },
  {
    src: join(U, "2025/04/lady-working.jpg"),
    dest: "about/sewing-training.jpg",
    kind: "photo",
  },
  {
    src: join(U, "2025/04/school-building.jpg"),
    dest: "about/school-compound.jpg",
    kind: "photo",
  },
];

// Ramadan gallery: move the three face-free photos out of the misassigned IWD
// dir; the two green-box-redacted recipient files are DELETED site-wide.
const moves = [
  [
    "projects/iwd-menstrual-hygiene/IMG-20250318-WA0298.jpg",
    "projects/ramadan-food-distribution/bags-packed.jpg",
  ],
  [
    "projects/iwd-menstrual-hygiene/IMG-20250320-WA0183.jpg",
    "projects/ramadan-food-distribution/bags-in-car.jpg",
  ],
  [
    "projects/iwd-menstrual-hygiene/IMG-20250320-WA0184.jpg",
    "projects/ramadan-food-distribution/bag-label.jpg",
  ],
];
const deletions = [
  "projects/iwd-menstrual-hygiene/IMG-20250320-WA0181.jpg", // green-box baked in
  "projects/iwd-menstrual-hygiene/IMG-20250320-WA0182.jpg", // green-box baked in
];

const CAP = 1600;
async function stagePhoto(src, dest) {
  const out = join(P, dest);
  mkdirSync(join(out, ".."), { recursive: true });
  const meta = await sharp(src).metadata();
  let pipe = sharp(src).rotate();
  if (Math.max(meta.width ?? 0, meta.height ?? 0) > CAP)
    pipe = pipe.resize({
      width: (meta.width ?? 0) >= (meta.height ?? 0) ? CAP : null,
      height: (meta.height ?? 0) > (meta.width ?? 0) ? CAP : null,
      fit: "inside",
    });
  await pipe.jpeg({ quality: 80, mozjpeg: true }).toFile(out);
  console.log("photo:", dest);
}
async function stageLogo(src, dest) {
  const out = join(P, dest);
  mkdirSync(join(out, ".."), { recursive: true });
  if (extname(dest) === ".png")
    await sharp(src).png({ compressionLevel: 9 }).toFile(out);
  else await sharp(src).jpeg({ quality: 85, mozjpeg: true }).toFile(out);
  console.log("logo: ", dest);
}

for (const job of jobs) {
  if (!existsSync(job.src)) {
    console.error("MISSING SOURCE:", job.src);
    process.exitCode = 1;
    continue;
  }
  if (job.kind === "logo") await stageLogo(job.src, job.dest);
  else await stagePhoto(job.src, job.dest);
}
for (const [from, to] of moves) {
  const src = join(P, from);
  if (!existsSync(src)) {
    console.log("move-skip (absent):", from);
    continue;
  }
  await stagePhoto(src, to); // re-encode into place
  rmSync(src);
  console.log("moved:", from, "->", to);
}
for (const del of deletions) {
  const p = join(P, del);
  if (existsSync(p)) {
    rmSync(p);
    console.log("deleted (green-box):", del);
  }
}
console.log("\nDone.");
