const { PDFDocument, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
const fs = require('fs');
const path = require('path');

async function createHebrewCV() {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  
  // Standard A4 page: 595.28 x 841.89 points
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  
  // LiberationSans fonts are high-quality metrically compatible Arial-equivalent fonts
  const fontRegularPath = '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf';
  const fontBoldPath = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf';
  
  if (!fs.existsSync(fontRegularPath) || !fs.existsSync(fontBoldPath)) {
    throw new Error('Required premium system fonts (LiberationSans) are not available.');
  }
  
  const fontRegularBytes = fs.readFileSync(fontRegularPath);
  const fontBoldBytes = fs.readFileSync(fontBoldPath);
  
  const fontRegular = await pdfDoc.embedFont(fontRegularBytes);
  const fontBold = await pdfDoc.embedFont(fontBoldBytes);
  
  // Design system matching portfolio palette
  const primaryBlue = rgb(0.04, 0.36, 0.68); // #0a5ca8
  const darkInk = rgb(0.12, 0.12, 0.14);
  
  const marginX = 40;
  let currentY = height - 40;
  const contentWidth = width - marginX * 2;
  
  // Helper for right-aligned text placement
  function drawRTLline(text, x, y, maxWidth, fontSize, font, color) {
    const lineWidth = font.widthOfTextAtSize(text, fontSize);
    const drawX = x + maxWidth - lineWidth;
    
    page.drawText(text, {
      x: drawX,
      y: y,
      size: fontSize,
      font,
      color,
    });
  }

  // Right-aligned RTL paragraph wrapping helper using native browser/device RTL rendering support
  function drawWrappedRTLText(text, x, y, maxWidth, fontSize, font, color, lineHeight = 1.35) {
    const words = text.split(' ');
    const lines = [];
    let currentLineWords = [];
    
    for (let i = 0; i < words.length; i++) {
      const testLineWords = [...currentLineWords, words[i]];
      const testLineText = testLineWords.join(' ');
      const testLineWidth = font.widthOfTextAtSize(testLineText, fontSize);
      
      if (testLineWidth > maxWidth && currentLineWords.length > 0) {
        lines.push(currentLineWords.join(' '));
        currentLineWords = [words[i]];
      } else {
        currentLineWords = testLineWords;
      }
    }
    if (currentLineWords.length > 0) {
      lines.push(currentLineWords.join(' '));
    }
    
    let startY = y;
    lines.forEach(line => {
      drawRTLline(line, x, startY, maxWidth, fontSize, font, color);
      startY -= fontSize * lineHeight;
    });
    
    return startY;
  }

  // --- HEADER SECTION ---
  // Name (Huge, Bold, Blue on Right)
  drawRTLline('יואב ענבי', marginX, currentY - 14, contentWidth, 24, fontBold, primaryBlue);
  
  // Contact details right-aligned
  const contactLines = [
    'תל אביב-יפו | 054-3455947 | YOAVANAVI1@GMAIL.COM',
    'תיק עבודות: YOAVANAVIPORTFOLIO.NETLIFY.APP',
    'לינקדין: LINKEDIN.COM/IN/YOAV-ANAVI'
  ];
  
  let contactY = currentY - 2;
  contactLines.forEach((cline) => {
    drawRTLline(cline, marginX, contactY, contentWidth, 8, fontBold, darkInk);
    contactY -= 11;
  });
  
  currentY -= 48;
  
  // Section separator helper
  function drawSectionHeader(title) {
    currentY -= 6;
    drawRTLline(title, marginX, currentY, contentWidth, 11, fontBold, primaryBlue);
    currentY -= 12;
  }

  // --- PROFILE ---
  drawSectionHeader('פרופיל');
  const profileText = "סטודנט לתקשורת ו-HCI באוניברסיטת רייכמן, המשלב רקע פיקודי ומבצעי מיחידה 8200 עם ניסיון מעשי במוצר, UI/UX ועבודה עם כלי בינה מלאכותית (AI). מביא איתו הבנה עסקית, חשיבה מוצרית ויכולת מוכחת לקחת אתגרים מהעולם האמיתי ולתרגם אותם למוצרים ופתרונות עובדים.";
  currentY = drawWrappedRTLText(profileText, marginX, currentY, contentWidth, 8.5, fontRegular, darkInk, 1.35);
  currentY += 2;

  // --- EXPERIENCE ---
  drawSectionHeader('ניסיון מקצועי');
  
  const experiences = [
    {
      title: "התמחות כמנהל מוצר ומהנדס GTM מבוסס AI | זימרק (Zimark) | יולי 2026 - ספטמבר 2026",
      bullets: [
        "הובלה מקצה לקצה של אפיון ובניית פלטפורמה רב-תחומית בסטארט-אפ, תוך אספקת פתרון משולב לצוותי מכירות, לקוחות והנהלה בזמן אמת.",
        "ביצוע מחקר, ניתוח תובנות וסיעור מוחות באמצעות Claude ו-Gemini כדי לנתח דרישות מורכבות למפרטי מוצר מדויקים.",
        "עיצוב של 24 מסכים אינטרקטיביים לכדי אב-טיפוס ב-Figma ובניית הפלטפורמה בפועל באמצעות Lovable."
      ]
    },
    {
      title: "מנהל מועדון ה-UI/UX | אוניברסיטת רייכמן | 2025 - הווה",
      bullets: [
        "צמיחה של המועדון לאחת מהקהילות המבוקשות ביותר ברייכמן באמצעות מיתוג אסטרטגי וניהול תפעולי. הבאת מרצים מובילים מהתעשייה, מה שהעצים משמעותית את המוניטין והביקוש להצטרפות למועדון בקמפוס.",
        "הובלת פרויקטים ויוזמות דיגיטליות, כולל הגדרת דרישות מוצר ואפיון UX עבור אפליקציית הרישום המרכזית של המועדון במטרה לייעל את חוויית המשתמש."
      ]
    },
    {
      title: "מנהל מבצעים ולוגיסטיקה (במילואים) | צה\"ל | 2023 - הווה",
      bullets: [
        "ניהול מערכות מבצעיות ולוגיסטיות בהיקף נרחב, הבטחת קבלת החלטות מהירה וביצוע משימות מורכבות בסביבות לחץ גבוה ולוחות זמנים צפופים."
      ]
    },
    {
      title: "מנהל רכש דיגיטלי ותפעול טכנולוגי | יחידה 8200 | 2021 - 2022",
      bullets: [
        "הובלת פרויקטים של רכש טכנולוגי, תוך שמירה על סנכרון שוטף וניהול ממשקים בין הפיקוד הבכיר, צוותי מו\"פ וספקים חיצוניים.",
        "יישום מודלים לניהול משאבים שגישרו בין פתרונות טכנולוגיים לאסטרטגיה ארגונית."
      ]
    },
    {
      title: "עוזר וסגן למפקד בסיס | יחידה 8200 | 2018 - 2021",
      bullets: [
        "קבלת תעודת הצטיינות על ניהול מבצעי מטה מורכבים וממשקים טכנולוגיים קריטיים חוצי-ארגון."
      ]
    }
  ];

  experiences.forEach(exp => {
    drawRTLline(exp.title, marginX, currentY, contentWidth, 8.5, fontBold, darkInk);
    currentY -= 11.5;
    
    exp.bullets.forEach(bullet => {
      // Draw standard clean bullet points
      currentY = drawWrappedRTLText(`• ${bullet}`, marginX, currentY, contentWidth, 8, fontRegular, darkInk, 1.35);
      currentY += 1.5;
    });
    currentY -= 2;
  });

  // --- PROJECTS ---
  drawSectionHeader('פרויקטים');
  
  const projects = [
    {
      title: "CANDLE & CO. | הקמת מותג וחנות איקומרס",
      bullet: "הקמה ובנייה מאפס של מותג מסחר אלקטרוני עצמאי לנרות בעבודת יד, כולל ניהול מחזור חיי המוצר המלא, עיצוב UI/UX מקצה לקצה והקמת חנות ה-Storefront בפועל."
    },
    {
      title: "אפליקציית קהילת ה-UI/UX | מענה חירום מהיר",
      bullet: "הובלת אפיון מהיר ועיצוב ה-UX לאפליקציית הרישום של קהילת הסטודנטים, תוך אספקת פתרון דיגיטלי זריז תחת תנאי חירום כדי לשמור על מעורבות הקהילה."
    }
  ];

  projects.forEach(proj => {
    drawRTLline(proj.title, marginX, currentY, contentWidth, 8.5, fontBold, darkInk);
    currentY -= 11.5;
    
    currentY = drawWrappedRTLText(`• ${proj.bullet}`, marginX, currentY, contentWidth, 8, fontRegular, darkInk, 1.35);
    currentY -= 1;
  });

  // --- EDUCATION ---
  drawSectionHeader('השכלה');
  drawRTLline('אוניברסיטת רייכמן | 2024 - הווה', marginX, currentY, contentWidth, 8.5, fontBold, darkInk);
  currentY -= 11.5;
  currentY = drawWrappedRTLText('• תואר ראשון (.B.A) בתקשורת ו-HCI (אינטראקציה בין אדם למחשב).', marginX, currentY, contentWidth, 8, fontRegular, darkInk, 1.35);
  currentY -= 2;

  // --- SKILLS & TOOLS ---
  drawSectionHeader('כישורים וכלים');
  
  const skills = [
    { label: "עיצוב ומוצר: ", detail: "Figma, עקרונות UI/UX, בניית שלד (Wireframing), אבות-טיפוס (Prototyping), אפיון מוצר." },
    { label: "בינה מלאכותית וטכנולוגיה: ", detail: "Claude, Gemini, Lovable, תהליכי עבודה מבוססי AI." },
    { label: "שפות: ", detail: "עברית (שפת אמי), אנגלית (שוטפת)." }
  ];

  skills.forEach(skill => {
    const combinedText = `• ${skill.label}${skill.detail}`;
    drawRTLline(combinedText, marginX, currentY, contentWidth, 8.5, fontRegular, darkInk);
    currentY -= 12.5;
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, 'public', 'Yoav_Anavi_CV_HE.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('Hebrew PDF generated successfully at:', outputPath);
}

createHebrewCV().catch(err => {
  console.error('Error generating Hebrew PDF:', err);
  process.exit(1);
});
