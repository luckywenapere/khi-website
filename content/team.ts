export type Person = {
  name: string;
  role: string;
  /** Bio paragraphs, verbatim from pages/about-us.md (light typo cleanup). */
  bio: string[];
  /** [KHI] Headshot — see the proposed photo mapping; using PlaceholderImage until confirmed. */
  photo?: string;
};

/**
 * KHI team. Names and roles verified from pages/about-us.md (with the README's
 * five name corrections applied). Bios are verbatim with only obvious
 * transcription typos fixed.
 */
export const team: readonly Person[] = [
  {
    name: "Dr. Oluwaseun Yinka Alabi",
    role: "Executive Director",
    photo: "/images/people/dr-alabi.jpg",
    bio: [
      "Dr. Oluwaseun Yinka Alabi is a seasoned administrator, engineer, and project manager with extensive experience across health, finance, and diplomacy. He holds a Doctoral degree from Atlantic International University, USA, and degrees in Electrical Engineering from the University of Ilorin and the Federal University of Technology, Akure, both in Nigeria.",
      "Dr. Alabi is a Fellow of the Nigerian Society of Engineers and holds professional qualifications including Certified Facility Manager and Project Management Professional. He is currently the Head of Real Estate Administration and Projects at African Export-Import Bank, leading high-level project initiatives.",
      "Outside professional engagements, he is a strong advocate for leadership development, passionate about mentoring and developing young adults. He is a Pastor in the Deeper Life Bible Church and the founding Executive Director of Kind Humanitarian Initiative, focusing on youth development, girl-child education, and women's empowerment.",
      "Dr. Alabi has authored several scholarly articles and presentations on infrastructure development, facilities management, and leadership empowerment at local and international forums.",
    ],
  },
  {
    name: "Margaret Umeche",
    role: "Secretary / Admin",
    photo: "/images/people/Margaret-2.jpg",
    bio: [
      "Margaret Umeche is a Christian who is passionate about helping people find themselves. With experience grooming young people in leadership and service, she serves in different positions and volunteers across several disciplines.",
    ],
  },
  {
    name: "Mayowa J. Odu",
    role: "Financial Manager",
    photo: "/images/people/mayowa.jpg",
    bio: [
      "Mayowa J. Odu is an author, life-reality writer, and educational consultant with hands-on experience in study-abroad consultation and quality-education advocacy.",
      "He has a B.Eng in Agricultural Engineering from the Federal University of Technology, Akure, and is an alumnus of the African Centre for Leadership, Strategy and Development, where he served as Deputy Governor (Set 21). He is a member of the Young African Leaders Initiative (YALI) Abuja Hub and a serial volunteer for several NGOs.",
      "He is the founder of SAT Foundation, supporting talented but vulnerable youngsters aged 6–19, and a British Council–certified counselor / study-abroad agent at WIN Education. He is a quality-education, zero-hunger, and environmental-sustainability advocate.",
    ],
  },
  {
    name: "Fadeke Akinwale Akarakiri",
    role: "Programs / Project Team Lead",
    photo: "/images/people/folake.jpg",
    bio: [
      "Fadeke Akinwale Akarakiri is a dynamic leader with over 14 years of experience in the development sector as a project manager. She is a passionate advocate for vulnerable women and girls, spearheading impactful programs and policies that drive real change.",
      "A seasoned project manager and strategist, she has dedicated her career to creating opportunities, amplifying voices, and building sustainable solutions for those in need. She is a graduate of the African Centre for Leadership, Strategy, and Development, a current PhD student at the University of Abuja, and holds a Project Management Professional certification.",
      "Her contributions have earned her multiple recognitions, including the Community Leadership Award, Future Leaders Award, Inspirational Leaders Award, and Motivated Team Lead Award.",
    ],
  },
  {
    name: "Yagba Philip Ierendoo",
    role: "Procurement Officer",
    bio: [
      "Yagba Philip Ierendoo is a dedicated Water Resources Engineer with over five years of experience in WASH, water management, and research. He holds a first degree in Water Resources and Environmental Engineering from Ahmadu Bello University, Nigeria.",
      "Philip has led and supported numerous projects focused on sustainable water solutions, sanitation, and hygiene in humanitarian and development settings. He is the founder of WE-Safe International Initiatives and a member of global water networks such as IWA and WYPW.",
      "Passionate about climate resilience and community development, he combines technical expertise with a strong commitment to creating lasting impact in underserved communities.",
    ],
  },
  {
    name: "Tor Mwuese Blessing",
    role: "Communications Lead",
    photo: "/images/people/blessing-scaled.jpg",
    bio: [
      "Tor Mwuese Blessing is a highly motivated and passionate individual with a background in Business Administration (HND) and years of experience in education, imparting knowledge and inspiring growth.",
      "She also has experience in community development and social-media management, leveraging her skills to facilitate events, design graphics, and handle social-media platforms. As a dedicated volunteer, she is committed to creating positive impact and driving change.",
      "She completed a one-year leadership training program at the Centre for Leadership, Strategy and Development, enhancing her leadership skills and capacity to drive positive change.",
    ],
  },
  {
    name: "Honour Odozie",
    role: "Partnership / Volunteer Manager",
    // [KHI] Bio and headshot to be supplied; placeholder portrait until then.
    bio: [],
  },
  {
    name: "Ezinne Janefrances Nwonu",
    role: "Team Member",
    photo: "/images/people/ezinne.jpg",
    bio: [
      "Ezinne Janefrances Nwonu is a biomedical researcher. She holds a Master of Science in Immunology and a Bachelor of Technology in Biomedical Technology, and has contributed to several academic papers and book chapters. She is keen on making a positive impact in the health sector through scientific research and community-oriented initiatives.",
    ],
  },
  {
    name: "Barrister Anulika Njemanze",
    role: "Team Member",
    photo: "/images/people/anulika.jpg",
    bio: [
      "Renowned lawyer, mental-health advocate, social entrepreneur, HR expert, and founder/Executive Director of Kenvic Global Foundation. With over a decade of experience and a robust academic background in law (LLB, BL) and international human-resource management (Executive Master's), Anulika Njemanze has established herself as a force for transformative change.",
      "Her passion for humanity, growth, and progress inspired Kenvic Global Foundation, dedicated to restoring lives and hope through advocacy and empowerment across education, child-rights protection, nutrition, leadership development, and empowerment schemes. Its flagship programs, the Leadership and Empowerment Conference (LEC) and the Women in Agriculture Community Training Initiative (WACTI), build skills, confidence, and economic opportunity.",
      "She is also a serial entrepreneur and founder of POTA NIG LTD, a brand promoting local agricultural produce to help alleviate hunger.",
    ],
  },
];
