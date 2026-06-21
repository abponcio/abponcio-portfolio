export const siteCopy = {
  hero: {
    roleEyebrow: {
      before: "Product Engineering Manager",
      accent: "@ Hello Chef",
    },
    tagline:
      "I help people do their best, simplify the hard stuff, and empower businesses to",
    taglineAccent: "grow.",
  },
  work: {
    eyebrow: "Select Projects",
    subtitle: "Building at scale · since 2021",
  },
  philosophy: {
    headline: {
      before: "Obsess about the",
      accent: "problem.",
      after: "Not the solution.",
    },
  },
  about: {
    eyebrow: "The Long Game",
    headline: {
      before: "From Manila to",
      accent: "Dubai.",
    },
    bio: "Twelve years of building things that last. I started as a web dev intern in the Philippines, and these days I lead product engineering across continents. I still stay close to the work: solving hard problems, debugging systems, and shipping features that matter.",
  },
  life: {
    headline: {
      before: "Life outside the",
      accent: "build.",
    },
    subtitle:
      "The instinct to ship something from scratch started long before the code.",
    buildsLabel: "What I build",
    stackLabel: "Stack I trust",
  },
  contact: {
    headline: {
      before: "Let's build something that",
      accent: "lasts.",
    },
    cta: "Say hello",
    email: "mailto:anthonybryleponcio@gmail.com",
    linkedin: "https://linkedin.com/in/anthony-bryle-poncio-bba14995",
  },
  footer: {
    copyright: "© 2026 Anthony Bryle Poncio · abponcio.com",
    status: "Dubai, UAE · Heads down at Hello Chef",
  },
};

export const caseStudies = [
  {
    num: "01",
    title: "The One-Click Day",
    result: "32,000+ prints a week, automated",
    slug: "label-tool",
  },
  {
    num: "02",
    title: "Questions, Answered",
    result: "Self-serve for the whole company",
    slug: "self-serve-data",
  },
  {
    num: "03",
    title: "We Delivered the Boxes",
    result: "Brought in-house, big savings",
    slug: "last-mile-delivery",
  },
  {
    num: "04",
    title: "Built Lean",
    result: "Small, autonomous, high impact",
    slug: "the-team",
  },
];

export const principles = [
  {
    head: "Simple beats clever",
    body: "If the answer feels complicated, it isn't simple enough yet. I keep slicing the problem until the right move is obvious.",
  },
  {
    head: "Progress beats perfect",
    body: "Real value in people's hands beats a perfect idea that never ships. Get it out, learn, make it better.",
  },
  {
    head: "No favourite tools",
    body: "I don't marry a stack. I reach for whatever solves the problem in the simplest way.",
  },
];

export const timeline = [
  { year: "2026", role: "Product Engineering Manager", org: "Hello Chef · Dubai" },
  { year: "2025", role: "Lead Product Engineer", org: "Hello Chef · Dubai" },
  { year: "2022", role: "Staff Software Engineer", org: "Hello Chef · Dubai" },
  { year: "2019", role: "Frontend Developer", org: "Hello Chef · Dubai" },
  { year: "2017", role: "Software Engineer → Lead", org: "Stratpoint · Manila" },
  { year: "2014", role: "Web Developer", org: "Openovate Labs · Manila" },
  { year: "2013", role: "Web Developer Intern", org: "TechRev · Cavite" },
];

export const beyondTheJob = [
  {
    icon: "honey" as const,
    label: "BeeLover",
    detail:
      "A honey business I run with my wife. We sell 100+ bottles at a single event. I was an entrepreneur before I had the title.",
  },
  {
    icon: "travel" as const,
    label: "Travel",
    detail:
      "Chasing the seven wonders of the world together. Dubai makes a pretty good base camp for it.",
  },
  {
    icon: "food" as const,
    label: "Food",
    detail:
      "I build the product I eat. I will happily go out of my way for a good shawarma or a great bowl of ramen.",
  },
  {
    icon: "plants" as const,
    label: "Plants",
    detail:
      "Repotting and selling them on the side. My first real instinct to grow something from scratch and ship it.",
  },
  {
    icon: "tennis" as const,
    label: "Tennis",
    detail:
      "My wife and I play together. It's part of our routine, our exercise, and honestly part of how we travel. If there's a court, we'll find it.",
  },
];

export const builds = [
  "Web Apps",
  "Mobile Apps",
  "DBT Models",
  "ML Training",
  "DevOps & IaC",
];

export const stack = [
  "Vue.js",
  "Laravel",
  "React Native",
  "Kubernetes",
  "Next.js",
  "TypeScript",
];

export const testimonials = [
  {
    quote:
      "He understands complex issues even when outside of his direct area of expertise, and he is extremely enthusiastic about his work, which is infectious. I often thought of Anthony as a professional I could always rely upon to get the job done.",
    name: "Mohammed Sirajuddin",
    org: "Product Engineer · Hello Chef",
  },
  {
    quote:
      "Anthony is one of the best people I have ever worked with. Not only a reliable and forward-thinking developer, but an inspiring team player. Ambitious and independent. Certainly worth recommending.",
    name: "Salam Waddah",
    org: "Software Engineer · HungerStation",
  },
  {
    quote:
      "Strong work ethic, unparalleled analytic and problem solving abilities. He assumed a leadership role, inspiring and motivating his colleagues. Anthony makes the impossible possible.",
    name: "Mary Grace Villaver, HFI-CUA",
    org: "Google & Human Factors Intl. Certified UX Designer",
  },
];

export type CaseStudyDetail = {
  num: string;
  title: string;
  tag: string;
  summary: string;
  problem: string;
  build: string;
  impact: { stat: string; label: string }[];
  tags: string[];
};

export const caseStudyDetails: CaseStudyDetail[] = [
  {
    num: "01",
    title: "The One-Click Day",
    tag: "Internal tooling · Still running",
    summary:
      "Two tools, one insight: if someone's spending their whole day doing something a computer should do, that's not a workflow problem. It's a build problem.",
    problem:
      "Before these tools existed, someone on the ops team printed recipe cards one by one, then hand-sorted them in order. Every single day. With around a thousand orders a week, that's roughly 4,000 cards to sort by hand. The labels were worse: just a Word doc they'd fill in manually and print in batches. No software. Just patience and a lot of clicking.",
    build:
      "I built two things: a recipe card printer in Electron that bulk-prints the right cards in the right order with one click, and a label printing tool that handles recipe and ingredient labels automatically. Combined, they now process over 32,000 prints a week. The ops team went from a full day of sorting to pressing a button. Both are still running today.",
    impact: [
      { stat: "32k+", label: "prints a week, automated" },
      { stat: "1 click", label: "replaced a full day's work" },
      { stat: "2020", label: "built it, still running" },
    ],
    tags: ["Electron", "PDF pipeline", "Label printing", "Internal tooling"],
  },
  {
    num: "02",
    title: "Questions, Answered",
    tag: "Data platform · One source of truth",
    summary:
      "Every field documented. Every model validated. AI-powered charts that won't hallucinate. We went from 'ask engineering' to 'answer it yourself.'",
    problem:
      "Every metric meant a ticket to the data team. Decisions waited days, and a small team quietly became the bottleneck for the entire business. Worse, when the data team shrank, the company nearly went blind.",
    build:
      "I built the entire data layer with dbt: every field documented, every model validated, every number traceable to a source. On top of that, I wired in AI-powered chart and dashboard building so anyone can explore data through conversation, not just SQL. The guardrails are baked in so it doesn't hallucinate. What comes out is trustworthy. It became the company's one source of truth: revenue, marketing performance, finance, operations, customer data — all of it clean, all of it consistent.",
    impact: [
      { stat: "1 source", label: "of truth across the business" },
      { stat: "Days → min", label: "time to any answer" },
      { stat: "AI charts", label: "validated, zero hallucinations" },
    ],
    tags: ["dbt", "Data modeling", "AI analytics", "Self-serve BI"],
  },
  {
    num: "03",
    title: "We Delivered the Boxes",
    tag: "Logistics · Ops",
    summary:
      "Brought delivery in-house with our own routing and dispatch, instead of leaning on third parties.",
    problem:
      "Relying on third-party delivery meant higher cost, less control over quality, and no visibility into the customer's very last moment with us.",
    build:
      "I helped build a fully integrated last-mile system: an optimized routing tool, a dispatch solution, and driver workflows. We even deliver boxes ourselves, so we feel exactly what our customers and drivers experience.",
    impact: [
      { stat: "Big", label: "cost savings" },
      { stat: "Higher", label: "delivery quality" },
      { stat: "Less", label: "third-party dependency" },
    ],
    tags: ["Routing", "Dispatch", "Logistics", "Ops"],
  },
  {
    num: "04",
    title: "Built Lean",
    tag: "Leadership · Culture",
    summary:
      "A small, autonomous team that ships outsized impact, on purpose.",
    problem:
      "Scale usually means more people and more process. We wanted the opposite: stay small, move fast, and own outcomes end to end.",
    build:
      "I built a culture of ownership: tight feedback loops, high trust, and engineers who stay close to the problem. We hire for curiosity and autonomy over raw headcount.",
    impact: [
      { stat: "Small", label: "by design" },
      { stat: "Autonomous", label: "owns outcomes" },
      { stat: "Impactful", label: "punches above its size" },
    ],
    tags: ["Leadership", "Culture", "Hiring", "Autonomy"],
  },
];

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#beyond", label: "Life" },
  { href: "#contact", label: "Contact" },
];
