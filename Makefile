.PHONY: help install render validate test-themes clean

# Default target
help:
	@echo "Resume Management Commands:"
	@echo ""
	@echo "  make install       - Install required npm packages"
	@echo "  make render        - Render resume.json to index.html"
	@echo "  make validate      - Validate resume.json schema"
	@echo "  make test-themes   - Generate samples for all themes"
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
	@echo "Cleaning theme sample HTML files..."
	rm -f theme-samples/resume-*.html
	@echo "✓ Cleaned (index.html preserved for GitHub Pages)"

# Re-render after changes
rebuild: render
	@echo "✓ Rebuild complete"

