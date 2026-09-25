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
  const profileText = "Possesses strong design skills and a deep understanding of user experience, combining a command and operational background from Unit 8200 with the advanced application of AI tools. Proven ability to translate complex business and operational challenges into accessible and seamless digital products, leading processes from end to end and working effectively in a dynamic environment.";
  currentY = drawWrappedText(profileText, marginX, currentY, contentWidth, 8.5, fontRegular, darkInk, 1.35);
  currentY += 2;

  // --- EXPERIENCE ---
  drawSectionHeader('EXPERIENCE');
  
  const experiences = [
    {
      title: "INTERN- Product manager & AI GTM ENGINEER | ZIMARK | July2026 - September 2026",
      bullets: [
        "Led the end-to-end design and development of the ZDR platform, a sales management system.",
        "Conducted in-depth market research utilizing AI tools like Claude and Gemini.",
        "Defined precise product requirements and developed the product into a live, functioning platform using the Lovable platform."
      ]
    },
    {
      title: "Manager of UX/UI Student Club | Reichman University | 2025 - Present",
      bullets: [
        "Co-chair of the UX/UI Club at Reichman University, leading an expanded team of department managers.",
        "Provides strategic leadership, develops work plans, and mentors team managers to uphold the club's core DNA.",
        "Recruits and trains functional managers to ensure operational success and continued community growth."
      ]
    },
    {
      title: "Operations & Logistics Manager (Reserves) | IDF | 2023 - Present",
      bullets: [
        "Managed operational and logistical systems.",
        "Performed under high-pressure conditions and met strict deadlines.",
        "Led and supervised personnel during complex missions."
      ]
    },
    {
      title: "Digital Procurement & Technology Operations | Unit 8200 | 2021 – 2022",
      bullets: [
        "Managed strategic technological procurement projects, coordinating cross-functional interfaces between senior command, R&D teams, and external suppliers.",
        "Led resource optimization initiatives that aligned advanced technical solutions with organizational goals."
      ]
    },
    {
      title: "Assistant to Base Commander | Unit 8200 | 2018 – 2021",
      bullets: [
        "Served as Deputy Base Commander, managing complex staff operations.",
        "Directed critical cross-organizational technological interfaces to enhance operational efficiency.",
        "Received a Certificate of Excellence for exceptional leadership."
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
      title: "CANDLE & CO. | Founder & E-Commerce Creator",
      bullets: [
        "End-to-end establishment and management of an independent e-commerce brand for handmade candles, with full responsibility for the entire product lifecycle.",
        "Comprehensive UX/UI optimization, with a focus on streamlining the checkout process to reduce site abandonment.",
        "Utilization of high-quality imagery to showcase fine details and increase the store's conversion rate."
      ]
    },
    {
      title: "UX/UI CLUB COMMUNITY APP | Rapid Emergency Response",
      bullets: [
        "End-to-end UX/UI design and onboarding flow optimization for the UX/UI Club mobile application.",
        "Spearheaded the rapid development of an efficient digital solution under emergency constraints, successfully maintaining high community engagement.",
        "Defined intuitive user flows and interactive wireframes to ensure a seamless and accessible registration experience for community members."
      ]
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
    
    proj.bullets.forEach(bullet => {
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

  // --- EDUCATION ---
  drawSectionHeader('EDUCATION');
  
  page.drawText("Reichman University | 2024 - Present", {
    x: marginX,
    y: currentY,
    size: 8.5,
    font: fontBold,
    color: darkInk
  });
  currentY -= 11.5;
  page.drawText("B.A. in Communications & HCI", {
    x: marginX,
    y: currentY,
    size: 8,
    font: fontRegular,
    color: darkInk
  });
  currentY -= 14;

  // --- SKILLS & TOOLS ---
  drawSectionHeader('SKILLS & TOOLS');
  
  const skills = [
    { label: "Product and Design: ", detail: "Figma, UX/UI philosophies, wireframing, interactive prototyping, and brand transformation." },
    { label: "AI and Technology: ", detail: "Advanced AI integration (Gemini, Claude), Lovable workflows, and AI-driven development." },
    { label: "Management and Leadership: ", detail: "Project management, multidisciplinary teamwork, GTM strategy, and startup ecosystem collaboration." },
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
