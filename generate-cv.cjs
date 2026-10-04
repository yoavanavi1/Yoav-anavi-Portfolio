const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createCV() {
  const pdfDoc = await PDFDocument.create();
  
  // Standard A4 page: 595.28 x 841.89 points
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  
  const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  
  const darkInk = rgb(0.12, 0.12, 0.14);
  const lineGray = rgb(0.7, 0.7, 0.7);
  
  const marginX = 45;
  let currentY = height - 45;
  const contentWidth = width - marginX * 2;
  
  // Helper for drawing text with wrap
  function drawWrappedText(text, x, y, maxWidth, fontSize, font, color, lineHeight = 1.25) {
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

  // --- HEADER PHOTO ---
  try {
    const imageUrl = "https://i.postimg.cc/bNnyxPYD/Whats-App-Image-2026-05-18-at-11-26-11.jpg";
    const res = await fetch(imageUrl);
    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      const imageBytes = Buffer.from(arrayBuffer);
      const image = await pdfDoc.embedJpg(imageBytes);
      
      const photoWidth = 80;
      const photoHeight = 100;
      page.drawImage(image, {
        x: width - marginX - photoWidth,
        y: currentY - photoHeight + 10,
        width: photoWidth,
        height: photoHeight,
      });
    }
  } catch (err) {
    console.warn("Could not embed photo:", err.message);
  }

  // --- HEADER ---
  page.drawText('Yoav Anavi', {
    x: marginX,
    y: currentY,
    size: 24,
    font: fontBold,
    color: darkInk,
  });
  currentY -= 18;

  const contactDetails = [
    { label: "Phone: ", value: "054-3455947" },
    { label: "Address: ", value: "10 Moshe Perlok St., Tel Aviv" },
    { label: "Email: ", value: "yoavanavi1@gmail.com" },
    { label: "Portfolio: ", value: "yoavanaviportfolio.netlify.app" },
    { label: "LinkedIn: ", value: "linkedin.com/in/yoav-anavi" }
  ];

  contactDetails.forEach(contact => {
    page.drawText(contact.label, {
      x: marginX,
      y: currentY,
      size: 9.5,
      font: fontBold,
      color: darkInk
    });
    const labelWidth = fontBold.widthOfTextAtSize(contact.label, 9.5);
    page.drawText(contact.value, {
      x: marginX + labelWidth,
      y: currentY,
      size: 9.5,
      font: fontRegular,
      color: darkInk
    });
    currentY -= 12.5;
  });

  currentY -= 15;

  // Helper for Section Heading
  function drawSectionHeader(title) {
    currentY -= 12;
    page.drawText(title, {
      x: marginX,
      y: currentY,
      size: 11.5,
      font: fontBold,
      color: darkInk,
    });
    currentY -= 4;
    page.drawLine({
      start: { x: marginX, y: currentY },
      end: { x: width - marginX, y: currentY },
      thickness: 0.5,
      color: lineGray,
    });
    currentY -= 12;
  }

  // --- PROFILE ---
  drawSectionHeader('PROFILE');
  const profileText = "Communications student specializing in HCI at Reichman University, with experience leading digital products from requirements to a working version. Combines design thinking, business understanding and advanced use of AI tools, together with management experience from Unit 8200.";
  currentY = drawWrappedText(profileText, marginX, currentY, contentWidth, 9.5, fontRegular, darkInk, 1.25);

  // --- EDUCATION ---
  drawSectionHeader('EDUCATION');
  
  page.drawText("B.A. in Communications, HCI specialization (3rd year) | Reichman University | 2024 - Present", {
    x: marginX,
    y: currentY,
    size: 9.5,
    font: fontBold,
    color: darkInk
  });
  currentY -= 12;

  page.drawText("Head of the UX/UI Club | Reichman University | 2025 - Present", {
    x: marginX,
    y: currentY,
    size: 9.5,
    font: fontBold,
    color: darkInk
  });
  currentY -= 11;
  
  const eduBullet = "Lead the club's strategy and team management: building work plans, recruiting and training department managers, and preserving the community's culture";
  page.drawText('-', {
    x: marginX + 4,
    y: currentY,
    size: 9,
    font: fontBold,
    color: darkInk
  });
  currentY = drawWrappedText(eduBullet, marginX + 14, currentY, contentWidth - 14, 9, fontRegular, darkInk, 1.2);
  currentY -= 4;

  // --- PROFESSIONAL EXPERIENCE ---
  drawSectionHeader('PROFESSIONAL EXPERIENCE');
  
  const experiences = [
    {
      title: "Product Management & AI GTM Engineering Intern | Zimark | Jul 2026 - Sep 2026",
      bullets: [
        "Identified a fragmented sales process (20+ messages per deal across email, WhatsApp and Drive) and built ZDR, an internal platform for the sales and marketing teams that centralizes files, tasks and client communication in one shared link. From writing the PRD and designing 24 screens in Figma to a working app with users, permissions and a database, built with AI.",
        "Conducted competitive research and led feedback and improvement cycles with internal stakeholders."
      ]
    },
    {
      title: "CANDLE & CO | Founder & Designer",
      bullets: [
        "Founded an independent candle brand and designed its full brand identity, including the logo. Built a Wix catalog of 50-60 products that replaced searching through Instagram posts, making ordering faster and clearer for customers."
      ]
    },
    {
      title: "UX/UI Club Community App",
      bullets: [
        "Led the end-to-end design of the sign-up and onboarding flow under emergency conditions, creating a simple experience that kept the community active."
      ]
    }
  ];

  experiences.forEach(exp => {
    page.drawText(exp.title, {
      x: marginX,
      y: currentY,
      size: 9.5,
      font: fontBold,
      color: darkInk
    });
    currentY -= 11;
    
    exp.bullets.forEach(bullet => {
      page.drawText('-', {
        x: marginX + 4,
        y: currentY,
        size: 9,
        font: fontBold,
        color: darkInk
      });
      currentY = drawWrappedText(bullet, marginX + 14, currentY, contentWidth - 14, 9, fontRegular, darkInk, 1.25);
      currentY -= 2;
    });
    currentY -= 4;
  });

  // --- MILITARY SERVICE ---
  drawSectionHeader('MILITARY SERVICE');
  
  const military = [
    {
      title: "Operations & Logistics Manager | Reserves | 2023 - Present",
      bullets: []
    },
    {
      title: "Digital Procurement & Technology Operations Manager | Unit 8200 | 2021 - 2022",
      bullets: [
        "Led complex technology procurement projects, matching the right technology to the organization's needs."
      ]
    },
    {
      title: "Base Commander Assistant & Deputy | Unit 8200 | 2018 - 2021",
      bullets: [
        "Coordinated technology projects across departments to improve operations. Received an award of excellence for managing strategic projects."
      ]
    }
  ];

  military.forEach(mil => {
    page.drawText(mil.title, {
      x: marginX,
      y: currentY,
      size: 9.5,
      font: fontBold,
      color: darkInk
    });
    currentY -= 11;
    
    mil.bullets.forEach(bullet => {
      page.drawText('-', {
        x: marginX + 4,
        y: currentY,
        size: 9,
        font: fontBold,
        color: darkInk
      });
      currentY = drawWrappedText(bullet, marginX + 14, currentY, contentWidth - 14, 9, fontRegular, darkInk, 1.25);
      currentY -= 2;
    });
    currentY -= 3;
  });

  // --- SKILLS ---
  drawSectionHeader('SKILLS');
  
  const skills = [
    { label: "Product Design & Building: ", detail: "Figma, UX/UI, prototyping, AI tools (Lovable, Claude)" },
    { label: "Product Management: ", detail: "Writing PRDs, defining requirements, QA, managing teams and stakeholders" },
    { label: "Languages: ", detail: "Hebrew (native), English (fluent)" }
  ];

  skills.forEach(skill => {
    page.drawText(skill.label, {
      x: marginX,
      y: currentY,
      size: 9.5,
      font: fontBold,
      color: darkInk
    });
    
    const labelWidth = fontBold.widthOfTextAtSize(skill.label, 9.5);
    page.drawText(skill.detail, {
      x: marginX + labelWidth,
      y: currentY,
      size: 9.5,
      font: fontRegular,
      color: darkInk
    });
    
    currentY -= 14;
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
