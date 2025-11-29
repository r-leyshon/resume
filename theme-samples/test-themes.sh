#!/bin/bash

# Script to test multiple JSON Resume themes
# Run from theme-samples directory

# Change to parent directory to access resume.json and install themes
cd "$(dirname "$0")/.."

# Array of popular jsonresume themes to test
themes=(
  "jsonresume-theme-even"
  "jsonresume-theme-stackoverflow"
  "jsonresume-theme-elegant"
  "jsonresume-theme-kendall"
  "jsonresume-theme-flat"
  "jsonresume-theme-caffeine"
  "jsonresume-theme-class"
  "jsonresume-theme-short"
  "jsonresume-theme-slick"
)

echo "Installing themes..."
for theme in "${themes[@]}"; do
  # Check if theme is already installed
  if npm list "$theme" --depth=0 >/dev/null 2>&1; then
    echo "✓ $theme already installed, skipping..."
  else
    echo "Installing $theme..."
    npm install "$theme"
    
    if [ $? -eq 0 ]; then
      echo "✓ Installed $theme"
    else
      echo "✗ Failed to install $theme"
    fi
  fi
done

echo ""
echo "Rendering resume with each theme..."

# Copy image assets to theme-samples so they render correctly
echo "Copying image assets..."
cp -r www theme-samples/ 2>/dev/null || true

for theme in "${themes[@]}"; do
  # Extract theme name (remove "jsonresume-theme-" prefix)
  theme_name="${theme#jsonresume-theme-}"
  output_file="theme-samples/resume-${theme_name}.html"
  
  echo "Rendering with $theme_name theme..."
  npx resumed render resume.json -o "$output_file" --theme "$theme"
  
  if [ $? -eq 0 ]; then
    echo "✓ Created $output_file"
  else
    echo "✗ Failed to render with $theme"
  fi
done

echo ""
echo "Done! Check the theme-samples/ folder for all rendered resumes."
echo "Open them in your browser to compare:"
echo ""
ls -1 theme-samples/*.html

