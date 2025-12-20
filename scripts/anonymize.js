#!/usr/bin/env node

/**
 * Anonymize resume.json by replacing personal information
 * Usage: node anonymize.js resume.json anon-resume.json
 */

const fs = require('fs');

// Anonymization mapping
const ANONYMIZATION_MAP = {
  // Personal details
  'Rich Leyshon': 'Anonymous Applicant',
  'Richard Leyshon': 'Anonymous Applicant',
  'leyshonrr@hotmail.co.uk': 'candidate@example.com',
  
  // GitHub
  'r-leyshon': 'anonymous-user',
  
  // LinkedIn
  'richard-leyshon': 'candidate',
  
  // Location details
  'Cardiff / Newport': 'Major City',
  'Wales': 'Region',
  'Cardiff': 'Major City',
  
  // Educational institutions
  'University of Wales Institute, Cardiff': 'Major University',
  'Cardiff University': 'Major University',
  
  // Schools
  'St Illtyd\'s, Fitzalan, and Bassaleg High Schools': 'Various Secondary Schools',
  
  // Organizations
  'Data Cymru': 'Regional Data Consultancy',
  'Wales Audit Office': 'Regional Audit Office',
  'Acorn Learning Solutions': 'Professional Training Provider',
  
  // Specific people/places in content
  'Welsh authorities': 'regional authorities',
  'Caribbean': 'international',
  'Kenya': 'international',
  'UK ': '', // Remove UK references where they appear standalone
  'Royal Statistical Society': 'National Statistical Society',
  'Ordnance Survey': 'National Mapping Agency',
  'Alan Turing Institute': 'National Research Institute',
};

// Location-specific removals
const LOCATION_PATTERNS = [
  /Cardiff/gi,
  /Newport/gi,
  /Wales/gi,
  /Welsh/gi,
];

function anonymizeString(str) {
  if (typeof str !== 'string') return str;
  
  let result = str;
  
  // Apply exact replacements
  for (const [original, replacement] of Object.entries(ANONYMIZATION_MAP)) {
    result = result.replace(new RegExp(original, 'g'), replacement);
  }
  
  // Remove all URLs from strings (including those in HTML anchor tags)
  // Remove anchor tags but keep the link text
  result = result.replace(/<a\s+[^>]*href="[^"]*"[^>]*>(.*?)<\/a>/gi, '$1');
  
  // Remove any standalone URLs that might remain
  result = result.replace(/https?:\/\/[^\s<>"]+/gi, '[URL removed]');
  
  return result;
}

function anonymizeObject(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => anonymizeObject(item));
  } else if (obj !== null && typeof obj === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      // Skip 'url' fields entirely
      if (key === 'url') {
        continue;
      }
      result[key] = anonymizeObject(value);
    }
    return result;
  } else if (typeof obj === 'string') {
    return anonymizeString(obj);
  }
  return obj;
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length !== 2) {
    console.error('Usage: node anonymize.js <input.json> <output.json>');
    process.exit(1);
  }
  
  const [inputFile, outputFile] = args;
  
  // Read the resume
  let resume;
  try {
    const content = fs.readFileSync(inputFile, 'utf8');
    resume = JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${inputFile}:`, err.message);
    process.exit(1);
  }
  
  // Remove image
  if (resume.basics && resume.basics.image) {
    delete resume.basics.image;
    console.log('✓ Removed profile image');
  }
  
  // Remove all social media profiles (GitHub, LinkedIn, Portfolio, etc.)
  if (resume.basics && resume.basics.profiles) {
    delete resume.basics.profiles;
    console.log('✓ Removed all social media profiles');
  }
  
  // Anonymize all strings in the resume
  const anonymized = anonymizeObject(resume);
  
  // Write the anonymized resume
  try {
    fs.writeFileSync(outputFile, JSON.stringify(anonymized, null, 2));
    console.log(`✓ Anonymized resume written to ${outputFile}`);
  } catch (err) {
    console.error(`Error writing ${outputFile}:`, err.message);
    process.exit(1);
  }
}

main();

