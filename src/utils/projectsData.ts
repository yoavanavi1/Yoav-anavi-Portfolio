export interface FocusArea {
  title: string;
  description: string;
}

export interface ProjectDetails {
  headline: string;
  contextLabel: string;
  contextValue: string;
  overview: string;
  focusAreas?: FocusArea[];
  figmaLink?: string;
  buttonLabel?: string;
}

export interface Project {
  title: string;
  id: string;
  category: string;
  description: string;
  image: string;
  year: string;
  isComingSoon?: boolean;
  details: ProjectDetails;
  role?: string;
  deliverables?: string[];
  moreImages?: string[];
}

export const PROJECTS_LIST_REFERENCE: Project[] = [
  {
    title: "CANDLE&CO",
    id: "candle",
    category: "e-commerce platform optimized for both desktop and mobile web",
    description: "An E-commerce website design for desktop and mobile for my personal handmade candle brand, connecting premium aesthetics with a streamlined sales process.",
    image: "https://i.postimg.cc/MXkYrFPs/lwgw-'bh-bly-rq'.png",
    year: "2023",
    role: "Brand Owner & Wix Developer",
    deliverables: ["UX Research", "Wix Store Setup", "E-commerce Optimization", "Brand Identity"],
    moreImages: [
      "https://i.postimg.cc/kGf4rwK0/Screenshot-2026-06-16-at-15-15-09.png", // Wix Store layout screenshot
      "https://i.postimg.cc/PBCv4bkN/image.png", // Wix mobile storefront layout screenshot
      "https://i.postimg.cc/ry0MqVTB/Screenshot-2026-06-16-at-15-18-53.png"  // Wix mobile cart layout screenshot
    ],
    details: {
      headline: "CASE STUDY: CANDLE & CO.",
      contextLabel: "CONTEXT",
      contextValue: "E-COMMERCE PLATFORM OPTIMIZED FOR BOTH DESKTOP AND MOBILE WEB",
      overview: "This project is an E-commerce website I designed and built on Wix for my own handmade candle brand. The goal was to solve a real business need: creating a digital storefront that makes it easy for customers to move from our Instagram page directly to shopping.",
      focusAreas: [
        {
          title: "01 | Visual Identity & Trust",
          description: "Since it's a boutique brand, I focused on a clean and premium visual design. The website matches our social media style. This consistency helps build trust and makes the brand look professional the moment users enter the site."
        },
        {
          title: "02 | Product Optimization & UX",
          description: "Before this website, I managed sales manually, which meant answering a lot of customer questions. To fix this, I created an organized digital catalog. I optimized the experience for quick and easy navigation, focusing especially on a mobile-first approach. Now, customers can clearly see every product and buy on their own."
        },
        {
          title: "03 | End-to-End Product Management",
          description: "This project shows my ability to manage a product from start to finish. I built and managed the entire platform using Wix. I also handled everything behind the scenes: product photography, writing the text, and updating the site for new collections and promotions."
        }
      ],
      figmaLink: "https://candleandcogroup.wixsite.com/my-site-2",
      buttonLabel: "EXPLORE TO THE WEBSITE"
    }
  },
  {
    title: "Chef & Dine",
    id: "r48",
    category: "End-to-end mobile app design",
    description: "An academic project designing a clean and focused mobile app for the luxury chef restaurant R48, bringing an exclusive dining experience into a digital product.",
    image: "https://i.postimg.cc/90G2Dzky/image.png",
    year: "2024",
    role: "Academic Lead Interaction Designer",
    deliverables: ["Mobile UX Flow", "Figma Design System", "High-fidelity Prototype", "Interactive Micro-interactions"],
    moreImages: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200", // exquisite plate
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200", // intimate table setting
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200"  // elegant modern restaurant space
    ],
    details: {
      headline: "CASE STUDY: CHEF & DINE (R48)",
      contextLabel: "CONTEXT",
      contextValue: "END-TO-END MOBILE APP DESIGN",
      overview: "This project is a mobile app concept for a fine-dining restaurant. The main challenge was to take a luxury atmosphere and turn it into a simple and easy-to-use digital experience.",
      focusAreas: [
        {
          title: "01 | Visual Strategy",
          description: "Instead of a crowded photo gallery, I organized the design by the time of day: Breakfast, Lunch, and Dinner. I used clean white space, big images, and elegant text. This makes the app feel like a premium magazine, while keeping everything clear and easy to read."
        },
        {
          title: "02 | UX & Fast Reservation",
          description: "Customers at high-end restaurants expect a fast and smooth experience. Because of this, I created a very short table reservation flow. I removed all unnecessary steps so users can book a table quickly, while still feeling the premium vibe."
        },
        {
          title: "03 | Figma & Design System",
          description: "To show a real user flow, I built a fully interactive prototype with 5 complete screens. I also created a full Design System in Figma. I used components and variants to make sure the final design is pixel-perfect and ready for developers."
        }
      ],
      figmaLink: "https://www.figma.com/design/8ufhTM0iu2tDSdA192a8JM/Project-1--Chef?node-id=0-1&t=OBNJlhNGk2IwvhKp-1",
      buttonLabel: "EXPLORE FULL FLOW IN FIGMA"
    }
  },
  {
    title: "UX UI CLUB\nAPP",
    id: "club",
    category: "App for accessing information and registering for the Reichman UX UI club",
    description: "Leading the digital transformation of the Reichman University UX/UI Club: product definition, branding, and designing a mobile app for student information and fast registration.",
    image: "https://i.postimg.cc/vmP4323h/image.png",
    year: "2024",
    role: "Community UX Project Manager",
    deliverables: ["Students Research", "Product Strategy", "Figma Variables", "UX Audit", "Branding Guidelines"],
    moreImages: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200", // design wireframes & planning
      "https://images.unsplash.com/photo-1581291518655-9523c932dedf?q=80&w=1200", // interactive interface design mockup
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200"  // organic team whiteboard iteration
    ],
    details: {
      headline: "CASE STUDY: UX/UI CLUB APP",
      contextLabel: "CONTEXT",
      contextValue: "COMMUNITY PLATFORM DESIGN",
      overview: "This project is an app for the UX/UI Club at Reichman University, where I serve as the community manager. I led the digital transformation of our club registration, creating a centralized platform to replace physical fairs and make everything accessible online.",
      focusAreas: [
        {
          title: "01 | Product Strategy & PRD",
          description: "The project started with strategy. I co-authored the Product Requirement Document (PRD) with my team. We defined exactly what the students needed and used this document as our roadmap to ensure every screen solved a real problem without adding unnecessary features."
        },
        {
          title: "02 | Team Leadership & Execution",
          description: "I managed a design team to deliver a working product under tight deadlines before registration week. I divided tasks, guided the UX and UI processes, and kept everyone aligned to launch the application right on time."
        },
        {
          title: "03 | Information Architecture & UX",
          description: "To bring immediate value, we defined a clear Information Architecture (IA). We highlighted the management team, past testimonials, and workshop examples. At the same time, we designed a frictionless user flow, removing unnecessary questions so students can join the community in just a few clicks."
        },
        {
          title: "04 | Branding & Visual Identity",
          description: "As part of this transition, I also crafted the club's new visual identity and logo. It was important to keep a consistent design language across the brand and the app to show professionalism and a strong sense of community."
        }
      ],
      figmaLink: "https://www.figma.com/design/lvp6sJ9Smfk8ROWRk6Fziw/project-3--UXUI-club-app?node-id=0-1&t=wEFy2xW4YroNhftT-1",
      buttonLabel: "EXPLORE FULL FLOW IN FIGMA"
    }
  },
  {
    title: "TAMIR CARMEL",
    id: "tamir-carmel",
    category: "Real Estate Entrepreneur Website",
    description: "A premium website for Tamir Carmel, a real estate entrepreneur specializing in urban renewal, designed to build trust with owners and partners.",
    image: "https://i.postimg.cc/4dH3t8QJ/Screenshot-2026-06-16-at-12-06-09.png",
    year: "2024",
    role: "Lead UX/UI Designer",
    deliverables: ["Product Strategy", "Accessibility Audit", "Information Architecture", "Branding & Visual Identity"],
    moreImages: [
      "https://i.postimg.cc/y6LPVK1d/Screenshot-2026-06-16-at-14-32-54.png", 
      "https://i.postimg.cc/rwqck5Q5/Screenshot-2026-06-16-at-14-32-37.png", 
      "https://i.postimg.cc/NFxJ72mt/Screenshot-2026-06-16-at-12-22-30.png"
    ],
    details: {
      headline: "CASE STUDY: REAL ESTATE ENTREPRENEUR WEBSITE - TAMIR CARMEL",
      contextLabel: "CONTEXT",
      contextValue: "PREMIUM REAL ESTATE PORTAL",
      overview: "This project is a premium website for Tamir Carmel, a real estate entrepreneur specializing in urban renewal. I led the end-to-end UX/UI design process to create an authoritative digital presence that builds trust with property owners, investors, and strategic partners.",
      focusAreas: [
        {
          title: "01 | PRODUCT STRATEGY",
          description: "The design process started with understanding the specific needs of the real estate industry. We structured the content to highlight the company's four main pillars: Economics, Planning, Betterment, and Sales. The goal was to create a platform that doesn't just display properties, but clearly communicates value and professional expertise."
        },
        {
          title: "02 | ACCESSIBILITY & INCLUSIVE DESIGN",
          description: "Knowing that the target audience includes users aged 50 and above, accessibility was a top priority. I made sure to use large and readable typography, high contrast, and spacious mobile touch areas. This allowed me to keep a luxurious look while ensuring a smooth, frustration-free experience for a mature audience."
        },
        {
          title: "03 | INFORMATION ARCHITECTURE & UX",
          description: "To manage a growing list of projects, I defined a clean information architecture. I designed an interactive map to show the nationwide locations and added a smart filtering system. This allows users to easily sort projects by status—such as 'Occupied' or 'In Planning'—and find exactly what they are looking for without unnecessary scrolling."
        },
        {
          title: "04 | BRANDING & VISUAL IDENTITY",
          description: "I created a clean, minimalist, and precise visual language, using an elegant grey and gold color palette. To elevate the premium feel, I combined a subtle scroll effect with micro-interactions, like dynamic visual feedback in the contact form. Together, they create a cohesive sense of luxury."
        }
      ],
      figmaLink: "https://tamircarmel.netlify.app",
      buttonLabel: "EXPLORE THE LIVE WEBSITE"
    }
  },
  {
    title: "Social Robot\nGroup",
    id: "social-robot",
    category: "Co-designed human-robot interaction design",
    description: "Coming Soon.",
    image: "https://i.postimg.cc/FR0dmRZg/Whats-App-Image-2026-05-25-at-12-52-18.jpg",
    year: "Coming Soon",
    role: "HCI Researcher & Sound Designer",
    deliverables: ["Robotic Interactive Scripting", "Sensory Testing Loops", "Behavior Flow Models"],
    moreImages: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200", // robotic hands touching human
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200"  // professional interaction interface design
    ],
    isComingSoon: true,
    details: {
      headline: "CASE STUDY: SOCIAL ROBOT GROUP",
      contextLabel: "CONTEXT",
      contextValue: "CO-DESIGNED EXPERIENCE & ADVANCED ROBOTIC INTERACTIONS",
      overview: "Details about this design and interaction case study are coming very soon.",
      focusAreas: [
        {
          title: "01 | Research & Architecture",
          description: "Coming soon."
        }
      ],
      figmaLink: "#",
      buttonLabel: "COMING SOON"
    }
  }
];
