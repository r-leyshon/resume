.PHONY: help install render render-anon validate test-themes clean anonymize export export-anon

# Default target
help:
	@echo "Resume Management Commands:"
	@echo ""
	@echo "  make install       - Install required npm packages"
	@echo "  make render        - Render resume.json to index.html"
	@echo "  make render-anon   - Render anon-resume.json to anon-resume.html"
	@echo "  make validate      - Validate resume.json schema"
	@echo "  make test-themes   - Generate samples for all themes"
	@echo "  make anonymize     - Create anonymized version (anon-resume.json)"
	@echo "  make export        - Export resume to PDF (resume.pdf)"
	@echo "  make export-anon   - Export anonymized resume to PDF"
	@echo "  make clean         - Remove generated HTML files"
	@echo ""

# Install dependencies
install:
	@echo "Installing npm dependencies..."
	npm install

# Render the resume with the default theme
render:
	@echo "Rendering resume with Kendall theme..."
	npx resumed render resume.json -o index.html
	@echo "✓ Resume rendered to index.html"

# Render the anonymized resume
render-anon: anonymize
	@echo "Rendering anonymized resume with Kendall theme..."
	npx resumed render anon-resume.json -o anon-resume.html
	@echo "✓ Anonymized resume rendered to anon-resume.html"

# Validate the resume.json
validate:
	@echo "Validating resume.json..."
	npx resumed validate resume.json

# Test all themes (generates samples in theme-samples/)
test-themes:
	@echo "Testing all themes..."
	cd theme-samples && ./test-themes.sh

# Clean generated files (keeps index.html for GitHub Pages)
clean:
	@echo "Cleaning generated files..."
	rm -f theme-samples/resume-*.html
	rm -f anon-resume.json anon-resume.html anon-resume.pdf
	@echo "✓ Cleaned (index.html preserved for GitHub Pages)"

# Re-render after changes
rebuild: render
	@echo "✓ Rebuild complete"

# Anonymize resume for sharing
anonymize:
	@echo "Anonymizing resume.json..."
	node anonymize.js resume.json anon-resume.json
	@echo "✓ Created anon-resume.json (personal details redacted)"

# Export resume to PDF
export:
	@echo "Exporting resume to PDF..."
	npx resumed export resume.json -o resume.pdf
	@echo "✓ Resume exported to resume.pdf"

# Export anonymized resume to PDF
export-anon: anonymize
	@echo "Exporting anonymized resume to PDF..."
	npx resumed export anon-resume.json -o anon-resume.pdf
	@echo "✓ Anonymized resume exported to anon-resume.pdf"

