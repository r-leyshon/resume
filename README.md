# Rich Leyshon - Resume

[![Resume](https://img.shields.io/badge/Resume-Online-blue)](https://r-leyshon.github.io/resume/)

A professional resume built with [JSON Resume](https://jsonresume.org/) and rendered using the [resumed](https://github.com/rbardini/resumed) CLI tool.

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher required)
- npm (comes with Node.js)
- Make (optional, for using Makefile commands)

### Node.js Version Management

The `resumed` CLI tool requires Node.js v20+. If you're using an older version, upgrade using [nvm](https://github.com/nvm-sh/nvm):

```bash
# Install nvm (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js v20
nvm install 20

# Use Node.js v20
nvm use 20

# Set as default (optional)
nvm alias default 20

# Verify version
node --version  # Should show v20.x.x
```

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
make help              # Show all available commands
make install           # Install npm dependencies
make install-merge     # Install PDF merging dependencies
make render            # Render resume.json to index.html
make render-anon       # Render anonymized resume to anon-resume.html
make validate          # Validate resume.json
make test-themes       # Generate samples for all themes
make anonymize         # Create anonymized resume (anon-resume.json)
make export            # Export resume to PDF (resume.pdf)
make export-anon       # Export anonymized resume to PDF
make statement-pdf     # Convert personal statement to PDF
make merge-application # Merge resume + statement into application.pdf
make clean             # Remove generated HTML files
make rebuild           # Clean and re-render
```

### Anonymization & PDF Export

The project includes tools for creating anonymized versions of your resume and exporting to PDF:

```bash
# Create anonymized version (removes personal info, URLs, photo)
make anonymize

# Export to PDF
make export              # Creates resume.pdf
make export-anon         # Creates anon-resume.pdf

# Merge resume with personal statement
make merge-application   # Creates application.pdf
```

All anonymized files and PDFs are automatically gitignored.

## 📁 Project Structure

```
resume/
├── .github/
│   └── workflows/
│       └── render-resume.yml      # Auto-build and deploy
├── scripts/                       # Utility scripts ✅ Committed
│   ├── anonymize.js               # Resume anonymization
│   ├── merge-statement.js         # Personal statement PDF generation
│   ├── merge-pdfs.js              # PDF merging
│   └── validate-json.js           # JSON validation
├── .gitignore                     # Git ignore rules
├── resume.json                    # Resume data (edit this!) ✅ Committed
├── package.json                   # npm dependencies ✅ Committed
├── Makefile                       # Build automation ✅ Committed
├── www/                           # Static assets ✅ Committed
│   └── fin-conf-2020-bw.jpg
├── portfolio/                     # Interactive portfolio ✅ Committed (including HTML!)
│   ├── index.html                 # Portfolio page ✅ Committed (static HTML)
│   ├── styles.css                 # Glassmorphism design
│   ├── portfolio.js               # Interactive functionality
│   ├── portfolio.json             # Projects data source
│   └── README.md                  # Portfolio documentation
├── index.html                     # Resume HTML ❌ Build artifact (gitignored, auto-generated)
├── resume.pdf                     # Resume PDF ❌ Build artifact (gitignored)
├── anon-resume.json               # Anonymized resume ❌ Build artifact (gitignored)
├── anon-resume.html               # Anonymized HTML ❌ Build artifact (gitignored)
├── anon-resume.pdf                # Anonymized PDF ❌ Build artifact (gitignored)
├── personal-statement.pdf         # Statement PDF ❌ Build artifact (gitignored)
├── application.pdf                # Merged application ❌ Build artifact (gitignored)
└── theme-samples/                 # Theme testing ❌ Not committed
    ├── test-themes.sh             # Theme testing script
    ├── www/                       # Copied assets for theme samples
    └── resume-*.html              # Generated theme samples
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

## 🔄 Resume vs Portfolio: Key Difference

**Resume (index.html):**
- ✅ Auto-generated by CI/CD from `resume.json`
- ❌ Gitignored (build artifact)
- 🔄 Edit `resume.json` → push → auto-deployed

**Portfolio (portfolio/*.html):**
- ✅ Static handcrafted files
- ✅ Must be committed to git
- 🔄 Edit HTML/CSS/JS → commit → push → deployed

## 📁 Project Portfolio

An interactive showcase of projects from prototypes to production systems.

### What is it?

Project Portfolio is a sleek, glassmorphism-styled web page showcasing projects at different stages of development - from experimental prototypes to production systems. Each project is categorized by type and demonstrates engineering thinking, technical learning, and iterative development.

**Development Stages:**

- **🔬 Exploration** - Early experimentation and feasibility testing
- **🛠️ Development** - Active building and iteration
- **🚀 Deployed** - Live demos and production systems
- **📦 Archived** - Completed projects with documented learnings

**Project Categories:**

- **AI & Automation** - LLM applications, agentic systems, intelligent automation
- **Search & RAG** - Semantic search, retrieval-augmented generation, knowledge systems
- **Observability & Monitoring** - Infrastructure monitoring, LLM evaluation, system health
- **Data Visualization & Education** - Interactive dashboards, educational tools, exploratory data analysis

### Features

- **Category Organization**: Projects organized by type (AI & Automation, Search & RAG, Observability, Data Visualization)
- **Stage Filtering**: Filter projects by development stage
- **Detailed Views**: Click any project for achievements, tech stack, and learnings
- **Glassmorphism Design**: Sleek frosted-glass aesthetic with smooth transitions
- **Zero Dependencies**: Pure HTML/CSS/JavaScript

### Accessing the Portfolio

Visit from the resume homepage or directly at: [https://r-leyshon.github.io/resume/portfolio/](https://r-leyshon.github.io/resume/portfolio/)

### Adding New Projects

**Important:** Unlike the resume, portfolio HTML files are **manually created and must be committed** to git. They are not auto-generated.

Edit `portfolio/portfolio.json` and add a new entry:

```json
{
  "id": "unique-id",
  "title": "Project Name",
  "tagline": "One-line description",
  "category": "ai-automation|search-rag|observability|data-visualization",
  "stage": "exploration|development|deployed|archived",
  "status": "prototype|production",
  "planted": "YYYY-MM-DD",
  "lastUpdated": "YYYY-MM-DD",
  "tags": ["tag1", "tag2"],
  "techStack": ["Tech1", "Tech2"],
  "description": "Detailed description...",
  "achievements": ["Achievement 1"],
  "links": {
    "demo": "https://...",
    "github": "https://..."
  },
  "learnings": "What you learned..."
}
```

Then commit and push - GitHub Actions will automatically deploy the update.

See [portfolio/README.md](portfolio/README.md) for more details.

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

## 🔧 Troubleshooting

### Node.js Version Issues

If you see errors like `SyntaxError: The requested module 'node:util' does not provide an export named 'styleText'`, you're using Node.js v18 or older. The `resumed` tool requires Node.js v20+.

**Solution:**

```bash
# Check your current version
node --version

# If < v20, upgrade using nvm
nvm install 20
nvm use 20

# Clear any cached packages
rm -rf ~/node_modules/resumed

# Test the fix
npx resumed --version
```

### Commands Not Working

If `make` commands fail, you can run the underlying commands directly:

```bash
# Instead of: make render
npx resumed render resume.json -o index.html

# Instead of: make export
npx resumed export resume.json -o resume.pdf

# Instead of: make validate
node scripts/validate-json.js resume.json
```

## 📄 License

See [LICENSE](LICENSE) file for details.

## 🙋 Maintenance

**Created by:** Rich Leyshon  
**Last Updated:** November 2025  
**Tool:** JSON Resume + resumed CLI
