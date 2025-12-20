#!/usr/bin/env node

/**
 * Merge two PDF files using pdf-lib
 * Usage: node merge-pdfs.js statement.pdf resume.pdf output.pdf
 */

const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function mergePDFs(resumePath, statementPath, outputPath) {
  try {
    // Read the PDF files
    console.log(`Reading ${resumePath}...`);
    const resumeBytes = fs.readFileSync(resumePath);
    
    console.log(`Reading ${statementPath}...`);
    const statementBytes = fs.readFileSync(statementPath);
    
    // Load the PDFs
    const resumePdf = await PDFDocument.load(resumeBytes);
    const statementPdf = await PDFDocument.load(statementBytes);
    
    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();
    
    // Copy pages from resume FIRST
    console.log('Adding resume pages...');
    const resumePages = await mergedPdf.copyPages(
      resumePdf,
      resumePdf.getPageIndices()
    );
    resumePages.forEach(page => mergedPdf.addPage(page));
    
    // Copy pages from statement SECOND
    console.log('Adding personal statement pages...');
    const statementPages = await mergedPdf.copyPages(
      statementPdf,
      statementPdf.getPageIndices()
    );
    statementPages.forEach(page => mergedPdf.addPage(page));
    
    // Save the merged PDF
    console.log(`Writing merged PDF to ${outputPath}...`);
    const mergedBytes = await mergedPdf.save();
    fs.writeFileSync(outputPath, mergedBytes);
    
    console.log(`✓ Successfully merged PDFs into ${outputPath}`);
    
  } catch (error) {
    console.error(`Error merging PDFs: ${error.message}`);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length !== 3) {
    console.error('Usage: node merge-pdfs.js <resume.pdf> <statement.pdf> <output.pdf>');
    process.exit(1);
  }
  
  const [resumePath, statementPath, outputPath] = args;
  
  await mergePDFs(resumePath, statementPath, outputPath);
}

main();

