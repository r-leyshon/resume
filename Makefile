.PHONY: help install install-merge render render-anon validate test-themes clean anonymize export export-anon statement-pdf merge-application check-node

# Check Node.js version
check-node:
	@node_version=$$(node -v | sed 's/v//;s/\..*//'); \
	if [ "$$node_version" -lt 20 ]; then \
		echo "❌ Error: Node.js v20+ required (current: $$(node -v))"; \
		echo "Run: nvm use 20"; \
		exit 1; \
	fi

# Default target
help:
	@echo "Resume Management Commands:"
	@echo ""
	@echo "  make install           - Install required npm packages (includes pdf-lib)"
	@echo "  make install-merge     - Install PDF merging dependencies"
	@echo "  make render            - Render resume.json to index.html"
	@echo "  make render-anon       - Render anon-resume.json to anon-resume.html"
	@echo "  make validate          - Validate resume.json schema"
	@echo "  make test-themes       - Generate samples for all themes"
	@echo "  make anonymize         - Create anonymized version (anon-resume.json)"
	@echo "  make export            - Export resume to PDF (resume.pdf)"
	@echo "  make export-anon       - Export anonymized resume to PDF"
	@echo "  make statement-pdf     - Convert personal statement to PDF"
	@echo "  make merge-application - Merge statement + resume into application.pdf"
	@echo "  make clean             - Remove generated HTML files"
	@echo ""
	@echo "Note: Requires Node.js v20+. Run 'nvm use 20' if needed."
	@echo ""

# Install dependencies
install:
	@echo "Installing npm dependencies..."
	npm install

# Install Node.js dependencies for PDF merging
install-merge:
	@echo "Installing pdf-lib library..."
	npm install
	@echo "✓ pdf-lib installed"

# Render the resume with the default theme
render: check-node
	@echo "Rendering resume with Kendall theme..."
	npx resumed render resume.json -o index.html
	@echo "✓ Resume rendered to index.html"

# Render the anonymized resume
render-anon: anonymize check-node
	@echo "Rendering anonymized resume with Kendall theme..."
	npx resumed render anon-resume.json -o anon-resume.html
	@echo "✓ Anonymized resume rendered to anon-resume.html"

# Validate the resume.json
validate: check-node
	@echo "Validating resume.json..."
	node scripts/validate-json.js resume.json

# Test all themes (generates samples in theme-samples/)
test-themes:
	@echo "Testing all themes..."
	cd theme-samples && ./test-themes.sh

# Clean generated files (keeps index.html for GitHub Pages)
clean:
	@echo "Cleaning generated files..."
	rm -f theme-samples/resume-*.html
	rm -f anon-resume.json anon-resume.html anon-resume.pdf
	rm -f personal-statement.pdf application.pdf
	@echo "✓ Cleaned (index.html preserved for GitHub Pages)"

# Re-render after changes
rebuild: render
	@echo "✓ Rebuild complete"

# Anonymize resume for sharing
anonymize: check-node
	@echo "Anonymizing resume.json..."
	node scripts/anonymize.js resume.json anon-resume.json
	@echo "✓ Created anon-resume.json (personal details redacted)"

# Export resume to PDF
export: check-node
	@echo "Exporting resume to PDF..."
	npx resumed export resume.json -o resume.pdf
	@echo "✓ Resume exported to resume.pdf"

# Export anonymized resume to PDF
export-anon: anonymize check-node
	@echo "Exporting anonymized resume to PDF..."
	npx resumed export anon-resume.json -o anon-resume.pdf
	@echo "✓ Anonymized resume exported to anon-resume.pdf"

# Convert personal statement to PDF
statement-pdf: check-node
	@echo "Converting personal statement to PDF..."
	node scripts/merge-statement.js personal-statement.txt personal-statement.pdf
	@echo "✓ Personal statement PDF created"

# Merge personal statement and resume into single application PDF
merge-application: statement-pdf export check-node
	@echo "Merging resume and personal statement..."
	node scripts/merge-pdfs.js resume.pdf personal-statement.pdf application.pdf
	@echo "✓ Application PDF created: application.pdf"
	@echo ""
	@echo "Your complete application is ready:"
	@echo "  📄 application.pdf (Resume + Personal Statement)"
