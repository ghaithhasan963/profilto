const navLinks = [
  { name: "Work", link: "#work" },
  { name: "Experience", link: "#experience" },
  { name: "Skills", link: "#skills" },
  { name: "Testimonials", link: "#testimonials" },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "UI/UX", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Innovation", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 6, suffix: "+", label: "Years of Freelance Experience" },
  { value: 120, suffix: "+", label: "Happy Freelance Clients" },
  { value: 85, suffix: "+", label: "Completed Freelance Projects" },
  { value: 95, suffix: "%", label: "Client Satisfaction Rate" },
];

const logoIconsList = [
  { imgPath: "/images/logos/company-logo-1.png" },
  { imgPath: "/images/logos/company-logo-2.png" },
  { imgPath: "/images/logos/company-logo-3.png" },
  { imgPath: "/images/logos/company-logo-4.png" },
  { imgPath: "/images/logos/company-logo-5.png" },
  { imgPath: "/images/logos/company-logo-6.png" },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Creative Problem Solving",
    desc: "Finding smart, practical solutions for clients with limited resources.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Clear Communication",
    desc: "Working closely with clients to ensure their vision is fully realized.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Delivering projects on schedule without compromising quality.",
  },
];

const techStackImgs = [
  { name: "React Developer", imgPath: "/images/logos/react.png" },
  { name: "Python Developer", imgPath: "/images/logos/python.svg" },
  { name: "Backend Developer", imgPath: "/images/logos/node.png" },
  { name: "Interactive Developer", imgPath: "/images/logos/three.png" },
  { name: "Project Manager", imgPath: "/images/logos/git.svg" },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review:
      "Ghaith delivered a modern, responsive website for our startup, exceeding expectations in both design and functionality.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Freelance Frontend Developer",
    date: "2023 - Present",
    responsibilities: [
      "Designed and developed responsive websites for small businesses and startups.",
      "Collaborated with freelance designers to create unique UI/UX experiences.",
      "Optimized websites for performance and SEO.",
    ],
  },
  {
    review:
      "Working with Ghaith was seamless. He transformed our concept into a fully functional e-commerce platform.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Freelance Full Stack Developer",
    date: "2021 - 2023",
    responsibilities: [
      "Built full-stack web applications for freelance clients.",
      "Integrated secure payment gateways and custom APIs.",
      "Provided ongoing maintenance and feature updates.",
    ],
  },
  {
    review:
      "Ghaith created an interactive 3D portfolio site for our creative agency, helping us stand out in the market.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Freelance Interactive Developer",
    date: "2019 - 2021",
    responsibilities: [
      "Developed interactive 3D websites using Three.js and React Three Fiber.",
      "Collaborated with other freelancers to deliver multimedia-rich experiences.",
      "Implemented animations and effects for enhanced user engagement.",
    ],
  },
];

const expLogos = [
  { name: "NovaTech Solutions", imgPath: "/images/logo1.png" },
  { name: "BluePixel Agency", imgPath: "/images/logo2.png" },
  { name: "Skyline Creatives", imgPath: "/images/logo3.png" },
];

const testimonials = [
  {
    name: "Liam Carter",
    mentions: "@liamcarter",
    review:
      "Ghaith turned my business idea into a professional online store. His attention to detail and communication were excellent.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Sofia Martinez",
    mentions: "@sofiamartinez",
    review:
      "The 3D portfolio Ghaith built for me impressed all my clients. Highly recommended for creative web projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Noah Bennett",
    mentions: "@noahbennett",
    review:
      "Professional, fast, and creative — Ghaith delivered exactly what I needed for my freelance brand.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Ava Thompson",
    mentions: "@avathompson",
    review:
      "Ghaith redesigned my website from scratch, making it modern and mobile-friendly. Fantastic work.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Ethan Walker",
    mentions: "@ethanwalker",
    review:
      "From concept to launch, Ghaith handled everything smoothly. My site now loads faster and looks amazing.",
    imgPath: "/images/client4.png",
  },
  {
    name: "Mia Roberts",
    mentions: "@miaroberts",
    review:
      "Ghaith is a true professional. He understood my needs and delivered beyond expectations.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  { name: "insta", imgPath: "/images/insta.png" },
  { name: "fb", imgPath: "/images/fb.png" },
  { name: "x", imgPath: "/images/x.png" },
  { name: "linkedin", imgPath: "/images/linkedin.png" },
];
export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};