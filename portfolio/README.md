# 📁 Project Portfolio

**Prototypes to Production**

A sleek showcase of projects from experimental prototypes to production systems, demonstrating engineering thinking and iterative development.

## Overview

Project Portfolio is an interactive showcase of projects at various stages of development. Each project is categorized by type and displays its current stage with visual indicators and detailed information.

### Development Stages

- **🔬 Exploration** - Early experimentation and feasibility testing
- **🛠️ Development** - Active building and iteration
- **🚀 Deployed** - Live demos and production systems
- **📦 Archived** - Completed projects with documented learnings

### Categories

- **AI & Automation** - LLM applications, agentic systems, intelligent automation
- **Search & RAG** - Semantic search, retrieval-augmented generation, knowledge systems
- **Observability & Monitoring** - Infrastructure monitoring, LLM evaluation, system health
- **Data Visualization & Education** - Interactive dashboards, educational tools, exploratory data analysis

## Structure

```
portfolio/
├── index.html      # Main page with project showcase
├── styles.css      # Glassmorphism design system
├── portfolio.js    # Interactive functionality
├── portfolio.json  # Projects data source
└── README.md       # This file
```

## Adding a New Project

Edit `garden.json` and add a new entry to the `projects` array:

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
  "description": "Detailed description of the project and what problem it solves...",
  "achievements": [
    "Key achievement or milestone 1",
    "Key achievement or milestone 2"
  ],
  "links": {
    "demo": "https://example.com/demo",
    "github": "https://github.com/username/repo"
  },
  "learnings": "What you learned from this project..."
}
```

### Field Descriptions

| Field | Required | Description |
|-------|----------|-------------|
| `id` | ✅ | Unique identifier (kebab-case) |
| `title` | ✅ | Project name |
| `tagline` | ✅ | One-line description (problem it solves) |
| `category` | ✅ | Project category (ai-automation, search-rag, observability, data-visualization) |
| `stage` | ✅ | Development stage (concept, exploration, development, deployed, archived) |
| `status` | ✅ | Current status (idea, prototype, production) |
| `planted` | ✅ | Start date (YYYY-MM-DD) |
| `lastUpdated` | ✅ | Last update date (YYYY-MM-DD) |
| `tags` | ✅ | Array of relevant tags |
| `techStack` | ✅ | Array of technologies used |
| `description` | ✅ | Detailed project description |
| `achievements` | Optional | Array of key achievements or milestones |
| `links` | Optional | Object with `demo` and/or `github` URLs |
| `learnings` | Optional | Key takeaways and lessons learned |

## Design System

### Glassmorphism Aesthetics

The design uses a glassmorphism approach with:

- **Frosted glass effects** using `backdrop-filter: blur()`
- **Semi-transparent backgrounds** with subtle borders
- **Soft shadows** with color-tinted shadows
- **Smooth animations** with cubic-bezier easing

### Categories

Projects are organized into three main categories:

- **AI & Automation**: LLM applications, agentic systems, intelligent automation
- **Search & RAG**: Semantic search, retrieval-augmented generation, knowledge systems
- **Observability**: Infrastructure monitoring, LLM evaluation, system health

### Stage Colors

Each stage has a distinct gradient:

```css
--deployed: linear-gradient(135deg, #10b981 0%, #059669 100%);      /* Green */
--development: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);   /* Blue */
--exploration: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);   /* Purple */
--archived: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);      /* Gray */
```

## Features

- **Interactive Cards**: Hover effects and smooth transitions
- **Stage Filtering**: Click filter buttons to view specific stages
- **Modal Details**: Click any project for full information
- **Keyboard Navigation**: Full keyboard accessibility (Tab, Enter, Esc)
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Zero Dependencies**: Pure HTML/CSS/JavaScript
- **Responsive Design**: Mobile-friendly layout
- **Performance**: Lightweight and fast loading

## Development

### Local Testing

```bash
# Serve locally (Python 3)
python3 -m http.server 8000

# Serve locally (Node.js)
npx http-server
```

Then visit: `http://localhost:8000/portfolio/`

### Deployment

Changes to `portfolio/` are automatically deployed via GitHub Actions when pushed to `main`. The workflow:

1. Validates JSON
2. Renders the resume
3. Copies `portfolio/` to deployment
4. Deploys to GitHub Pages

## Accessibility

The project follows accessibility best practices:

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus visible indicators
- Screen reader friendly
- Reduced motion support (`prefers-reduced-motion`)

## License

Part of the Rich Leyshon resume project, licensed under the MIT License.
