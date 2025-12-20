#!/usr/bin/env node

/**
 * Generate a PDF from personal-statement.txt
 * Usage: node merge-statement.js personal-statement.txt personal-statement.pdf
 */

const fs = require('fs');
const puppeteer = require('puppeteer');

async function generatePDF(inputFile, outputFile) {
  try {
    // Read the text file
    const content = fs.readFileSync(inputFile, 'utf8');
    
    // Create HTML with proper formatting
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page {
      size: A4;
      margin: 2cm 2.5cm 2cm 2.5cm;
    }
    body {
      font-family: 'Helvetica', 'Arial', sans-serif;
      font-size: 10.5pt;
      line-height: 1.4;
      color: #333;
      max-width: 100%;
      margin: 0;
      padding: 0;
    }
    h1 {
      font-size: 15pt;
      font-weight: bold;
      margin-bottom: 0.7em;
      margin-top: 0;
      text-align: center;
    }
    p {
      margin-bottom: 0.65em;
      text-align: justify;
      text-indent: 0;
    }
    .section {
      margin-bottom: 0.65em;
    }
    ul {
      margin: 0.4em 0;
      padding-left: 2em;
    }
    li {
      margin-bottom: 0.25em;
    }
  </style>
</head>
<body>
  <h1>Personal Statement</h1>
  <div class="content">
    ${formatContent(content)}
  </div>
</body>
</html>
`;

    // Launch puppeteer and generate PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    await page.pdf({
      path: outputFile,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '2cm',
        right: '2.5cm',
        bottom: '2cm',
        left: '2.5cm'
      }
    });
    
    await browser.close();
    console.log(`✓ Personal statement PDF created: ${outputFile}`);
    
  } catch (error) {
    console.error('Error generating PDF:', error.message);
    process.exit(1);
  }
}

function formatContent(text) {
  // Split into paragraphs
  const lines = text.split('\n').filter(line => line.trim());
  
  let html = '';
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Check if it's a numbered point (starts with digit followed by period)
    if (/^\d+\./.test(trimmed)) {
      html += `<p><strong>${escapeHtml(trimmed)}</strong></p>\n`;
    }
    // Check if it's a bullet point
    else if (trimmed.startsWith('•')) {
      if (!html.includes('<ul>') || html.lastIndexOf('</ul>') > html.lastIndexOf('<ul>')) {
        html += '<ul>\n';
      }
      html += `<li>${escapeHtml(trimmed.substring(1).trim())}</li>\n`;
    }
    // Regular paragraph
    else {
      // Close any open list
      if (html.includes('<ul>') && html.lastIndexOf('</ul>') < html.lastIndexOf('<ul>')) {
        html += '</ul>\n';
      }
      html += `<p>${escapeHtml(trimmed)}</p>\n`;
    }
  }
  
  // Close any open list at the end
  if (html.includes('<ul>') && html.lastIndexOf('</ul>') < html.lastIndexOf('<ul>')) {
    html += '</ul>\n';
  }
  
  return html;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length !== 2) {
    console.error('Usage: node merge-statement.js <input.txt> <output.pdf>');
    process.exit(1);
  }
  
  await generatePDF(args[0], args[1]);
}

main();

