# Rich Leyshon - Resume

[![Resume](https://img.shields.io/badge/Resume-Online-blue)](https://r-leyshon.github.io/resume/)

A professional resume built with [JSON Resume](https://jsonresume.org/) and rendered using the [resumed](https://github.com/rbardini/resumed) CLI tool.

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)
- Make (optional, for using Makefile commands)

### Installation

```bash
# Install dependencies
npm install

# Or use make
make install
```

## 📝 Updating Your Resume

### 1. Edit the Resume Data

All resume content is stored in `resume.json` following the [JSON Resume schema](https://jsonresume.org/schema/).

```bash
# Edit the JSON file
vim resume.json  # or use your preferred editor
```

The resume includes:
- **basics**: Name, contact info, summary, profiles (GitHub, LinkedIn)
- **work**: Work experience with highlights
- **education**: Academic qualifications
- **skills**: Technical skills organized by category
- **awards**: Professional awards and recognitions
- **publications**: Publications and training materials
- **volunteer**: Volunteer work and mentorship
- **languages**: Spoken languages
- **interests**: Professional interests

### 2. Validate Your Changes

```bash
# Validate resume.json against the schema
npx resumed validate resume.json

# Or use make
make validate
```

### 3. Render to HTML

```bash
# Render using the default theme (Kendall)
npx resumed render resume.json -o index.html

# Or use make
make render
```

The rendered resume will be saved as `index.html`.

## 🎨 Themes

The resume uses the **Kendall** theme by default (specified in `resume.json` under `meta.theme`).

### Testing Different Themes

To preview your resume with multiple themes:

```bash
# Run the theme testing script
make test-themes
```

This will:
1. Install 9 different JSON Resume themes
2. Render your resume with each theme
3. Save samples in the `theme-samples/` directory

Preview the samples by opening the HTML files in `theme-samples/` in your browser.

### Changing the Default Theme

Edit `resume.json` and update the theme:

```json
{
  "meta": {
    "theme": "jsonresume-theme-kendall"
  }
}
```

Available themes in this project:
- `jsonresume-theme-kendall` (current default)
- `jsonresume-theme-even`
- `jsonresume-theme-stackoverflow`
- `jsonresume-theme-elegant`
- `jsonresume-theme-flat`
- `jsonresume-theme-caffeine`
- `jsonresume-theme-class`
- `jsonresume-theme-short`
- `jsonresume-theme-slick`

Browse more themes at [JSON Resume Themes](https://jsonresume.org/themes/).

## 🛠️ Makefile Commands

```bash
make help          # Show all available commands
make install       # Install npm dependencies
make render        # Render resume to HTML
make validate      # Validate resume.json
make test-themes   # Generate samples for all themes
make clean         # Remove generated HTML files
make rebuild       # Clean and re-render
```

## 📁 Project Structure

```
resume/
├── .github/
│   └── workflows/
│       └── render-resume.yml  # Auto-build and deploy
├── .gitignore            # Git ignore rules
├── resume.json           # Resume data (edit this!) ✅ Committed
├── package.json          # npm dependencies ✅ Committed
├── Makefile              # Build automation ✅ Committed
├── www/                  # Static assets ✅ Committed
│   └── fin-conf-2020-bw.jpg
├── index.html            # Generated HTML ❌ Build artifact (gitignored)
└── theme-samples/        # Theme testing ❌ Not committed
    ├── test-themes.sh    # Theme testing script
    ├── www/              # Copied assets for theme samples
    └── resume-*.html     # Generated theme samples
```

## 🖼️ Profile Photo

The profile photo is stored in `www/fin-conf-2020-bw.jpg` and referenced in `resume.json`:

```json
{
  "basics": {
    "image": "./www/fin-conf-2020-bw.jpg"
  }
}
```

For best results, use a **square image** (1:1 aspect ratio) to ensure it displays correctly as a circular profile picture in themes.

## 📦 Technologies Used

- [JSON Resume](https://jsonresume.org/) - Open source resume schema
- [resumed](https://github.com/rbardini/resumed) - Fast JSON Resume CLI renderer
- [jsonresume-theme-kendall](https://github.com/LinuxBozo/jsonresume-theme-kendall) - Default theme

## 🌐 Publishing

The resume is published to GitHub Pages at: [https://r-leyshon.github.io/resume/](https://r-leyshon.github.io/resume/)

### Initial Setup (One-time)

Configure GitHub Pages to deploy from GitHub Actions:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

That's it! The workflow is already configured.

### Automatic Deployment

The resume is automatically built and deployed when you push changes:

1. Edit `resume.json` with your changes
2. Commit and push to the `main` branch:
   ```bash
   git add resume.json
   git commit -m "Update work experience"
   git push
   ```
3. GitHub Actions will automatically:
   - ✅ Validate your `resume.json`
   - ✅ Render it to `index.html`
   - ✅ Deploy to GitHub Pages
   - 🚫 No commits to your repo (HTML is a build artifact)

### Local Preview

You can preview locally before pushing:

```bash
make render          # Generates index.html locally
open index.html      # Preview in browser
```

Note: `index.html` is gitignored and treated as a build artifact. Only `resume.json` is committed.

## 💡 Tips

### Link Formatting
All links in the resume use HTML anchor tags with `target="_blank"` to open in new tabs:

```json
"<a href=\"https://example.com\" target=\"_blank\">Link Text</a>"
```

### Text Formatting
Use `<strong>` tags for bold text (the Kendall theme doesn't support Markdown):

```json
"Created <strong>Magic Mail</strong>, an Ai-powered email automation system."
```

### Consistency
- Use "Ai" instead of "AI" (project preference)
- Use British spelling (e.g., "specialising", "recognising", "modelling")
- Keep dates in ISO format: `YYYY-MM-DD`

## 📄 License

See [LICENSE](LICENSE) file for details.

## 🙋 Maintenance

**Created by:** Rich Leyshon  
**Last Updated:** November 2025  
**Tool:** JSON Resume + resumed CLI
