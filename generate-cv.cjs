const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createCV() {
  const pdfDoc = await PDFDocument.create();
  
  // Standard A4 page: 595.28 x 841.89 points
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  
  // Colors matching the original design
  const primaryBlue = rgb(0.04, 0.36, 0.68); // #0a5ca8
  const darkInk = rgb(0.12, 0.12, 0.14);
  const linkBlue = rgb(0.04, 0.36, 0.68);
  
  const marginX = 38;
  let currentY = height - 40;
  const contentWidth = width - marginX * 2;
  
  // Helper for drawing text with wrap
  function drawWrappedText(text, x, y, maxWidth, fontSize, font, color, lineHeight = 1.32) {
    const words = text.split(' ');
    let line = '';
    let startY = y;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + (line ? ' ' : '') + words[i];
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > maxWidth && line.length > 0) {
        page.drawText(line, {
          x,
          y: startY,
          size: fontSize,
          font,
          color,
        });
        startY -= fontSize * lineHeight;
        line = words[i];
      } else {
        line = testLine;
      }
    }
    if (line.length > 0) {
      page.drawText(line, {
        x,
        y: startY,
        size: fontSize,
        font,
        color,
      });
      startY -= fontSize * lineHeight;
    }
    return startY;
  }

  // --- HEADER ---
  // Name
  page.drawText('YOAV ANAVI', {
    x: marginX,
    y: currentY - 14,
    size: 26,
    font: fontBold,
    color: primaryBlue,
  });
  
  // Contact details on the right
  const contactLines = [
    'TEL AVIV-YAFO | 054-3455947 | YOAVANAVI1@GMAIL.COM',
    'PORTFOLIO: YOAVANAVIPORTFOLIO.NETLIFY.APP',
    'LINKEDIN: LINKEDIN.COM/IN/YOAV-ANAVI'
  ];
  
  let contactY = currentY - 2;
  contactLines.forEach((cline) => {
    page.drawText(cline, {
      x: marginX + 175,
      y: contactY,
      size: 7.5,
      font: fontBold,
      color: darkInk,
    });
    contactY -= 11.5;
  });
  
  currentY -= 40;
  
  // Helper for Section Heading
  function drawSectionHeader(title) {
    currentY -= 6;
    page.drawText(title, {
      x: marginX,
      y: currentY,
      size: 13,
      font: fontBold,
      color: primaryBlue,
    });
    currentY -= 14;
  }

  // --- PROFILE ---
  drawSectionHeader('PROFILE');
  const profileText = "Communications and HCI student at Reichman University, blending operational and leadership background from Unit 8200 with hands-on experience in product, UX/UI, and AI workflows. Bringing business understanding, product mindset, and a proven ability to take real-world challenges and translate them into working products and solutions.";
  currentY = drawWrappedText(profileText, marginX, currentY, contentWidth, 8.5, fontRegular, darkInk, 1.35);
  currentY += 2;

  // --- EXPERIENCE ---
  drawSectionHeader('EXPERIENCE');
  
  const experiences = [
    {
      title: "AI GTM ENGINEER INTERN | ZIMARK | 2026 – PRESENT",
      bullets: [
        "SPEARHEADED THE END-TO-END CONCEPTUALIZATION AND BUILDING OF A CROSS-FUNCTIONAL PLATFORM IN A STARTUP, DELIVERING AN INTEGRATED SOLUTION FOR SALES TEAMS, CLIENTS, AND EXECUTIVE LEADERSHIP IN REAL TIME.",
        "CONDUCTED RESEARCH, INSIGHTS ANALYSIS, AND IDEATION SESSIONS USING CLAUDE AND GEMINI TO TRANSLATE COMPLEX REQUIREMENTS INTO PRECISE PRODUCT SPECIFICATIONS.",
        "DESIGNED USER FLOWS AND INTERACTIVE PROTOTYPES IN FIGMA, ALONGSIDE THE HANDS-ON BUILDING OF THE PLATFORM USING LOVABLE."
      ]
    },
    {
      title: "MANAGER OF UX/UI STUDENT CLUB | REICHMAN UNIVERSITY | 2024 – PRESENT",
      bullets: [
        "Managed a community of 80+ students, leading strategy, branding, and ongoing club operations with students and industry professionals.",
        "Led digital projects and initiatives, including product requirements and UX definition for the club's central registration app to optimize user experience."
      ]
    },
    {
      title: "OPERATIONS & LOGISTICS MANAGER (RESERVES) | IDF | 2023 – PRESENT",
      bullets: [
        "MANAGED LARGE-SCALE OPERATIONS AND LOGISTICS SYSTEMS, ENSURING RAPID DECISION-MAKING AND EXECUTING COMPLEX TASKS UNDER HIGH-PRESSURE ENVIRONMENTS AND TIGHT DEADLINES."
      ]
    },
    {
      title: "DIGITAL PROCUREMENT & TECHNOLOGY OPERATIONS | UNIT 8200 | 2021 – 2022",
      bullets: [
        "LED TECH PROCUREMENT PROJECTS, MAINTAINING ONGOING COORDINATION AND INTERFACE MANAGEMENT BETWEEN SENIOR COMMAND, R&D TEAMS, AND VENDORS.",
        "IMPLEMENTED RESOURCE MANAGEMENT MODELS THAT BRIDGED TECHNICAL SOLUTIONS WITH ORGANIZATIONAL STRATEGY."
      ]
    },
    {
      title: "ASSISTANT TO BASE COMMANDER | UNIT 8200 | 2018 – 2021",
      bullets: [
        "AWARDED CERTIFICATE OF EXCELLENCE FOR MANAGING COMPLEX STAFF OPERATIONS AND CRITICAL CROSS-ORGANIZATIONAL TECHNOLOGICAL INTERFACES."
      ]
    }
  ];

  experiences.forEach(exp => {
    page.drawText(exp.title, {
      x: marginX,
      y: currentY,
      size: 8.5,
      font: fontBold,
      color: darkInk
    });
    currentY -= 11.5;
    
    exp.bullets.forEach(bullet => {
      page.drawText('•', {
        x: marginX + 4,
        y: currentY,
        size: 8,
        font: fontBold,
        color: darkInk
      });
      currentY = drawWrappedText(bullet, marginX + 14, currentY, contentWidth - 14, 8, fontRegular, darkInk, 1.32);
      currentY += 1.5;
    });
    currentY -= 2;
  });

  // --- PROJECTS ---
  drawSectionHeader('PROJECTS');
  
  const projects = [
    {
      title: "CANDLE & CO. | FOUNDER & E-COMMERCE CREATOR",
      bullet: "FOUNDED AND BUILT AN INDEPENDENT E-COMMERCE BRAND FOR HANDMADE CANDLES FROM SCRATCH, MANAGING THE FULL PRODUCT LIFECYCLE, END-TO-END UX/UI DESIGN, AND STOREFRONT EXECUTION."
    },
    {
      title: "UX/UI CLUB COMMUNITY APP | RAPID EMERGENCY RESPONSE",
      bullet: "LED THE RAPID PRODUCT DEFINITION AND UX DESIGN FOR THE STUDENT COMMUNITY REGISTRATION APP, DELIVERING AN AGILE DIGITAL SOLUTION UNDER EMERGENCY CONDITIONS TO MAINTAIN COMMUNITY ENGAGEMENT."
    },
    {
      title: "ZDR SYSTEM | ZIMARK PLATFORM",
      bullet: "CONCEPTUALIZED AND BUILT A CROSS-FUNCTIONAL INTERNAL PLATFORM IN A STARTUP ENVIRONMENT, DELIVERING AN INTEGRATED, REAL-TIME SOLUTION FOR SALES TEAMS, CLIENTS, AND EXECUTIVE LEADERSHIP."
    }
  ];

  projects.forEach(proj => {
    page.drawText(proj.title, {
      x: marginX,
      y: currentY,
      size: 8.5,
      font: fontBold,
      color: darkInk
    });
    currentY -= 11.5;
    
    page.drawText('•', {
      x: marginX + 4,
      y: currentY,
      size: 8,
      font: fontBold,
      color: darkInk
    });
    currentY = drawWrappedText(proj.bullet, marginX + 14, currentY, contentWidth - 14, 8, fontRegular, darkInk, 1.32);
    currentY -= 1;
  });

  // --- SKILLS & TOOLS ---
  drawSectionHeader('SKILLS & TOOLS');
  
  const skills = [
    { label: "Design & Product: ", detail: "Figma, UI/UX Principles, Wireframing, Prototyping, Product Definition." },
    { label: "AI & Tech: ", detail: "Claude, Gemini, Lovable, AI Workflows." },
    { label: "Languages: ", detail: "Hebrew (Native), English (Fluent)." }
  ];

  skills.forEach(skill => {
    page.drawText('•', {
      x: marginX + 4,
      y: currentY,
      size: 8.5,
      font: fontBold,
      color: darkInk
    });
    
    page.drawText(skill.label, {
      x: marginX + 14,
      y: currentY,
      size: 8.5,
      font: fontBold,
      color: darkInk
    });
    
    const labelWidth = fontBold.widthOfTextAtSize(skill.label, 8.5);
    page.drawText(skill.detail, {
      x: marginX + 14 + labelWidth,
      y: currentY,
      size: 8.5,
      font: fontRegular,
      color: darkInk
    });
    
    currentY -= 12.5;
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, 'public', 'Yoav_Anavi_CV.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('PDF generated successfully at:', outputPath);
}

createCV().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
