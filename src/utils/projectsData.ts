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
  galleryScreens?: {
    id: string;
    title: string;
    type: "UI Screen" | "Wireframe" | "Design System" | "Prototype";
    image: string;
    aspectRatio?: "16/9" | "4/3" | "9/16" | "21/9";
    caption: string;
  }[];
  client?: string;
  coverImage?: string;
  problem?: string;
  solution?: string;
  result?: string;
  cardProblem?: string;
  cardSolution?: string;
  cardResult?: string;
}

export const PROJECTS_LIST_REFERENCE: Project[] = [
  {
    title: "ZDR - Zimark Deal Room",
    id: "zdr-zimark-deal-room",
    category: "Product Designer & Builder",
    description: "A centralized digital deal room platform connecting sales teams and clients in real time.",
    image: "https://i.postimg.cc/wBrcxBS6/Gemini-Generated-Image-6ams0h6ams0h6ams.jpg",
    year: "2026",
    role: "Product manager | AI GTM Engineering",
    deliverables: [
      "Product Strategy",
      "User Research",
      "UX/UI Design",
      "Prototyping",
      "Design System",
      "Lovable Build",
      "Supabase Backend",
      "Full-Stack Implementation"
    ],
    client: "Zimark",
    coverImage: "https://i.postimg.cc/pT882Jf5/Screenshot-2026-08-30-at-9-37-05.jpg",
    cardProblem: "Zimark’s sales process was scattered across multiple channels (email, WhatsApp, Google Drive, and CRM), leading to lost information, lack of transparency, and no single source of truth for deal tracking.",
    cardSolution: "ZDR (Zimark Deal Room) - a centralized digital platform where each deal gets a shared, branded room. Sales reps share all necessary assets via a single link, giving clients a personalized, transparent experience while tracking activity in real time.",
    cardResult: "Unified the entire sales workflow into a single source of truth, eliminated manual operational friction, and delivered a seamless, premium client experience.",
    problem: "Zimark's sales process was scattered across emails, WhatsApp, Google Drive, and CRM. A salesperson managed dozens of conversations at the same time with different clients, each on a different channel. There was no single place where both sides saw the same picture - what was sent, what was done, and what the next step is. Information got lost, clients did not get a unified experience, and no one really knew where each deal stood.",
    solution: "ZDR (Zimark Deal Room) - a platform that creates a shared digital room for each deal. The salesperson opens a room, puts inside all the content the client needs (presentations, documents, tasks, forms, questions), and sends one link. The client enters a personalized room with their logo that provides a personal experience and personal touch, sees everything organized, and works with complete transparency. The salesperson sees in real time what the client did and what is missing - and both sides are always on the same page.",
    result: "Key results, impact, and user experience improvements.",
    details: {
      headline: "Case Study: ZDR - Zimark Deal Room",
      contextLabel: "CONTEXT",
      contextValue: "Product Designer & Builder",
      overview: "Comprehensive overview and goals of this project will be updated here.",
      focusAreas: [
        {
          title: "01 - Research, Discovery & PRD",
          description: "Analyzed Zimark’s end-to-end sales processes, mapped out bottlenecks caused by scattered tools, and defined the complete product requirements (PRD) and MVP scope from scratch."
        },
        {
          title: "02 - UX Architecture & Flows",
          description: "Designed the user experience and complete user flow architecture for the Deal Room platform. Created an intuitive workflow that unifies sales management with a clean, transparent, and centralized client portal (Single Source of Truth)."
        },
        {
          title: "03 - UI Design, AI Copilot & Business Potential",
          description: "Built the high-fidelity product interface and UI, including customized client branding. Integrated AI capabilities as a personal assistant (Copilot) for data analysis, real-time activity tracking, and a business potential meter."
        }
      ],
      figmaLink: "https://www.figma.com/proto/SUl4rIeKIyDz7eUj2j9GiO/ZDR?node-id=47-2&p=f&m=draw&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=47%3A2&show-proto-sidebar=1&page-id=0%3A1&t=rzjPjPGlVdqFFn6h-1",
      buttonLabel: "Explore Prototype"
    }
  },
  {
    title: "CANDLE&CO",
    id: "candle",
    category: "E-commerce store for desktop and mobile devices",
    description: "A beautiful and easy-to-use e-commerce website designed for my handmade candle brand.",
    image: "https://i.postimg.cc/rmSKQSKr/image.png",
    year: "2023",
    role: "Brand Owner & Web Designer",
    deliverables: ["UX/UI Design", "Wix Store Setup", "E-commerce Setup", "Brand Design"],
    moreImages: [
      "https://i.postimg.cc/kGf4rwK0/Screenshot-2026-06-16-at-15-15-09.png",
      "https://i.postimg.cc/PBCv4bkN/image.png",
      "https://i.postimg.cc/ry0MqVTB/Screenshot-2026-06-16-at-15-18-53.png",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200"
    ],
    galleryScreens: [
      {
        id: "candle-screen-1",
        title: "Boutique E-Commerce Storefront",
        type: "UI Screen",
        image: "https://i.postimg.cc/kGf4rwK0/Screenshot-2026-06-16-at-15-15-09.png",
        aspectRatio: "16/9",
        caption: "Main desktop landing page highlighting organic soy wax collections & seasonal promotions."
      },
      {
        id: "candle-screen-2",
        title: "Product Detail & Custom Fragrance Selector",
        type: "UI Screen",
        image: "https://i.postimg.cc/PBCv4bkN/image.png",
        aspectRatio: "16/9",
        caption: "High-contrast product viewer with scent notes breakdown and quick add-to-cart."
      },
      {
        id: "candle-screen-3",
        title: "Mobile Shopping Checkout Flow",
        type: "Wireframe",
        image: "https://i.postimg.cc/ry0MqVTB/Screenshot-2026-06-16-at-15-18-53.png",
        aspectRatio: "16/9",
        caption: "Optimized 2-step mobile checkout flow designed to maximize direct conversion from Instagram."
      },
      {
        id: "candle-screen-4",
        title: "Brand Identity & Packaging Tokens",
        type: "Design System",
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200",
        aspectRatio: "16/9",
        caption: "Color palettes, typography pairings, and minimalist label design system guidelines."
      }
    ],
    client: "Candle&Co. (Boutique E-Commerce)",
    coverImage: "https://i.postimg.cc/kGf4rwK0/Screenshot-2026-06-16-at-15-15-09.png",
    problem: "Before this, customers could only discover products on social media. There was no single, organized place to browse.",
    solution: "I built a dedicated Wix store to bring all our handmade candles into one clean, well-structured space.",
    result: "Orders increased and customers can now browse and check out directly on our website.",
    details: {
      headline: "Case Study: Candle & Co.",
      contextLabel: "CONTEXT",
      contextValue: "E-commerce store designed for desktop and mobile",
      overview: "This is an e-commerce website I designed and built for my own handmade candle brand. The main goal was to make it easy for our Instagram followers to find and buy our products online.",
      focusAreas: [
        {
          title: "01 - Visual Identity and Trust",
          description: "Since this is a boutique brand, I made sure the design is clean and premium. The website matches our Instagram aesthetic perfectly, which builds trust with new customers."
        },
        {
          title: "02 - Simple Shopping Flow",
          description: "Before launching this site, we took orders manually via direct messages. I built a clear product catalog optimized for mobile so customers can find products and complete their purchase in seconds."
        },
        {
          title: "03 - Product Management",
          description: "I managed this project from start to finish. Along with building the Wix site, I handled product photography, wrote the text, and updated the storefront for new product launches."
        }
      ],
      figmaLink: "https://candleandcogroup.wixsite.com/my-site-2",
      buttonLabel: "Visit Live Website"
    }
  },
  {
    title: "Chef & Dine",
    id: "r48",
    category: "Mobile App Design",
    description: "A mobile app concept for R48, a luxury chef restaurant, designed to make reservations simple and elegant.",
    image: "https://i.postimg.cc/90G2Dzky/image.png",
    year: "2024",
    role: "Lead UX/UI Designer (Academic Project)",
    deliverables: ["Mobile UX Flow", "Figma Design System", "High-Fidelity Prototype", "UI Design"],
    moreImages: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200"
    ],
    galleryScreens: [
      {
        id: "r48-screen-1",
        title: "Home Screen & Chef Recommendations",
        type: "UI Screen",
        image: "https://i.postimg.cc/90G2Dzky/image.png",
        aspectRatio: "16/9",
        caption: "Main restaurant app home feed featuring daily tasting menus and sommelier pairings."
      },
      {
        id: "r48-screen-2",
        title: "Table Booking & Time Slot Selection",
        type: "Prototype",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200",
        aspectRatio: "16/9",
        caption: "Streamlined 3-tap reservation widget with calendar date picker and guest preferences."
      },
      {
        id: "r48-screen-3",
        title: "Digital Menu Wireframes & Category Navigation",
        type: "Wireframe",
        image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200",
        aspectRatio: "16/9",
        caption: "Wireframe breakdown of meal categories grouped by Breakfast, Lunch, and Dinner."
      },
      {
        id: "r48-screen-4",
        title: "Luxury Design System & Color Tokens",
        type: "Design System",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200",
        aspectRatio: "16/9",
        caption: "Dark mode typography specs, accent color system, and custom component tokens."
      }
    ],
    client: "R48 Chef Restaurant (Academic Concept)",
    problem: "Making table reservations and browsing menus can feel slow and complicated on traditional restaurant sites.",
    solution: "Designed a clean mobile app focused on easy booking and beautiful food photography.",
    result: "Improved the user experience by creating a simple table booking flow that takes just three clicks.",
    details: {
      headline: "Case Study: Chef & Dine (R48)",
      contextLabel: "CONTEXT",
      contextValue: "Mobile app design concept",
      overview: "This is a mobile app concept for a fine-dining restaurant. The main goal was to turn a high-end, luxury restaurant experience into a clean and intuitive digital product.",
      focusAreas: [
        {
          title: "01 - Visual Strategy",
          description: "Instead of a crowded layout, I organized the menu by time of day: Breakfast, Lunch, and Dinner. Using elegant typography and beautiful food photography, the app feels premium while keeping everything easy to browse."
        },
        {
          title: "02 - Quick Reservations",
          description: "Guests at high-end restaurants want a fast, effortless experience. I designed a short and clear table booking flow that lets users reserve their spot in just a few taps."
        },
        {
          title: "03 - Figma Design System",
          description: "I built a fully interactive prototype with 5 complete screens and created a structured Figma Design System using reusable components to make sure the project is ready for developer handoff."
        }
      ],
      figmaLink: "https://www.figma.com/design/8ufhTM0iu2tDSdA192a8JM/Project-1--Chef?node-id=0-1&t=OBNJlhNGk2IwvhKp-1",
      buttonLabel: "Open Figma Prototype"
    }
  },
  {
    title: "UX UI CLUB\nAPP",
    id: "club",
    category: "Mobile App Design & Branding",
    description: "Branding and app design for the Reichman University UX/UI Club, creating an easy way for students to join and register for events.",
    image: "https://i.postimg.cc/vmP4323h/image.png",
    year: "2024",
    role: "Community Designer & Project Manager",
    deliverables: ["Student Research", "UX/UI Design", "Figma Variables", "Brand Identity"],
    moreImages: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200",
      "https://images.unsplash.com/photo-1581291518655-9523c932dedf?q=80&w=1200",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200"
    ],
    galleryScreens: [
      {
        id: "club-screen-1",
        title: "Student Community Hub & Event Feed",
        type: "UI Screen",
        image: "https://i.postimg.cc/vmP4323h/image.png",
        aspectRatio: "16/9",
        caption: "Central dashboard highlighting upcoming workshops, guest speakers, and registration."
      },
      {
        id: "club-screen-2",
        title: "Workshop One-Tap Registration Flow",
        type: "UI Screen",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200",
        aspectRatio: "16/9",
        caption: "Intuitive registration modal reducing friction for Reichman University students."
      },
      {
        id: "club-screen-3",
        title: "Figma Component Architecture & Variables",
        type: "Design System",
        image: "https://images.unsplash.com/photo-1581291518655-9523c932dedf?q=80&w=1200",
        aspectRatio: "16/9",
        caption: "Scalable component library built with Figma variables, auto-layout, and tokens."
      }
    ],
    client: "Reichman University (UX/UI Club App)",
    problem: "Student sign-ups and workshop details were scattered across paper forms and online sheets.",
    solution: "Designed a single mobile app with a clear event schedule and a simple registration form.",
    result: "Reduced sign-up friction, allowing students to register for events in less than three clicks.",
    details: {
      headline: "Case Study: UX/UI Club App",
      contextLabel: "CONTEXT",
      contextValue: "Mobile app design and branding",
      overview: "This is an app design for the UX/UI Club at Reichman University, where I also serve as community manager. I designed this app to move our club registration online, making our events and workshops easy for students to access.",
      focusAreas: [
        {
          title: "01 - Product Goals",
          description: "We started by writing a Product Requirement Document (PRD) to define what students needed. This helped us build a clear feature list and keep the design focused on solving real student problems."
        },
        {
          title: "02 - Team Collaboration",
          description: "I led a small design team to deliver the project before our university registration week. I assigned tasks, guided the design process, and ensured we finished the project on time."
        },
        {
          title: "03 - User Flow & Content",
          description: "We structured the app content to highlight our workshops, guest speakers, and student testimonials. We also designed a simple registration flow so students can sign up in just three taps."
        },
        {
          title: "04 - Branding & Logo Design",
          description: "I also designed the club's new visual identity and logo. Keeping a consistent style across the brand and the app helped build a professional and welcoming student community."
        }
      ],
      figmaLink: "https://www.figma.com/design/lvp6sJ9Smfk8ROWRk6Fziw/project-3--UXUI-club-app?node-id=0-1&t=wEFy2xW4YroNhftT-1",
      buttonLabel: "Open Figma Prototype"
    }
  },
  {
    title: "TAMIR CARMEL",
    id: "tamir-carmel",
    category: "Real Estate Portfolio Website",
    description: "A clean, modern website designed for a real estate entrepreneur specializing in urban renewal projects.",
    image: "https://i.postimg.cc/4dH3t8QJ/Screenshot-2026-06-16-at-12-06-09.png",
    year: "2024",
    role: "Lead UX/UI Designer",
    deliverables: ["UX/UI Design", "Information Architecture", "Accessibility Audit", "Brand Style"],
    moreImages: [
      "https://i.postimg.cc/y6LPVK1d/Screenshot-2026-06-16-at-14-32-54.png",
      "https://i.postimg.cc/rwqck5Q5/Screenshot-2026-06-16-at-14-32-37.png",
      "https://i.postimg.cc/NFxJ72mt/Screenshot-2026-06-16-at-12-22-30.png"
    ],
    galleryScreens: [
      {
        id: "tamir-screen-1",
        title: "Urban Renewal Portfolio Overview",
        type: "UI Screen",
        image: "https://i.postimg.cc/4dH3t8QJ/Screenshot-2026-06-16-at-12-06-09.png",
        aspectRatio: "16/9",
        caption: "High-contrast portfolio homepage showcasing active urban renewal developments."
      },
      {
        id: "tamir-screen-2",
        title: "Interactive Project Map & Filtering",
        type: "UI Screen",
        image: "https://i.postimg.cc/y6LPVK1d/Screenshot-2026-06-16-at-14-32-54.png",
        aspectRatio: "16/9",
        caption: "Geographic map breakdown allowing property owners to search projects by status."
      },
      {
        id: "tamir-screen-3",
        title: "Accessible Contact & Inquiry Form",
        type: "UI Screen",
        image: "https://i.postimg.cc/rwqck5Q5/Screenshot-2026-06-16-at-14-32-37.png",
        aspectRatio: "16/9",
        caption: "Large-font accessible contact interface tailored for property owners over 50."
      }
    ],
    client: "Tamir Carmel (Urban Renewal Real Estate)",
    problem: "Older property owners struggled with cluttered and confusing layouts on real estate websites.",
    solution: "Created a clean, high-contrast website with large fonts and simple, spacious navigation.",
    result: "Built stronger credibility, allowing users to find local projects and contact agents with ease.",
    details: {
      headline: "Case Study: Tamir Carmel Website",
      contextLabel: "CONTEXT",
      contextValue: "Website design for urban renewal",
      overview: "This is a website designed for Tamir Carmel, a real estate developer specializing in urban renewal. I designed the site from start to finish to create a professional online presence that builds trust with property owners and partners.",
      focusAreas: [
        {
          title: "01 - Web Strategy",
          description: "We organized the website content into four core sections: planning, finance, development, and sales. This layout helps visitors quickly understand the developer's expertise and professional approach."
        },
        {
          title: "02 - Designing for Accessibility",
          description: "Since many of our target users are over 50 years old, accessibility was a key focus. I used large fonts, high-contrast colors, and big tap targets to make the site easy to read and navigate on any device."
        },
        {
          title: "03 - Project Catalog",
          description: "I created an interactive map and a simple filtering system. This lets property owners easily view local projects and filter them by project status (like 'planning' or 'completed') without scrolling through long pages."
        },
        {
          title: "04 - Premium Look & Feel",
          description: "I used a clean, minimalist visual style with an elegant grey and gold color scheme. Adding smooth transitions and simple interactive forms gives the website a professional and premium feel."
        }
      ],
      figmaLink: "https://tamircarmel.netlify.app",
      buttonLabel: "Visit Live Website"
    }
  },
  {
    title: "Social Robot\nGroup",
    id: "social-robot",
    category: "Human-Robot Interaction Design",
    description: "Coming Soon",
    image: "https://i.postimg.cc/FR0dmRZg/Whats-App-Image-2026-05-25-at-12-52-18.jpg",
    year: "Coming Soon",
    role: "HCI Researcher & Sound Designer",
    deliverables: ["HRI Research", "Interaction Testing", "Behavior Design"],
    moreImages: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200"
    ],
    isComingSoon: true,
    client: "HRI Research Lab (Academic HRI Case Study)",
    problem: "Human-robot interfaces can feel unnatural and lack clear, comforting feedback.",
    solution: "Created clear sensory feedback loops and behavior scripts to make interactions more natural.",
    result: "Refined the robot's physical and auditory responses during field tests.",
    details: {
      headline: "Case Study: Social Robot Group",
      contextLabel: "CONTEXT",
      contextValue: "Human-robot interaction study",
      overview: "Details about this human-robot interaction study will be published soon.",
      focusAreas: [
        {
          title: "01 - Research and Design",
          description: "Coming soon."
        }
      ],
      figmaLink: "#",
      buttonLabel: "Coming Soon"
    }
  }
];
