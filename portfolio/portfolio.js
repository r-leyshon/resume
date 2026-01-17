// ============================================
// State Management
// ============================================
let allProjects = [];
let currentFilter = 'all';

// ============================================
// Initialize
// ============================================
async function initGarden() {
    try {
        const data = await fetch('portfolio.json').then(r => r.json());
        // Sort projects by lastUpdated (most recent first)
        allProjects = data.projects.sort((a, b) => 
            new Date(b.lastUpdated) - new Date(a.lastUpdated)
        );
        renderPlants(allProjects);
        setupFilters();
        setupModal();
        setupKeyboard();
    } catch (error) {
        console.error('Failed to load projects:', error);
        showError();
    }
}

// ============================================
// Render Functions
// ============================================
function renderPlants(projects) {
    const garden = document.getElementById('garden');
    
    if (projects.length === 0) {
        garden.innerHTML = '<div class="no-results" style="grid-column: 1/-1; text-align: center; color: rgba(255,255,255,0.7); padding: 3rem;">No projects match this filter</div>';
        return;
    }
    
    garden.innerHTML = projects.map(createPlantCard).join('');
    
    // Add click listeners
    document.querySelectorAll('.plant-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            const project = allProjects.find(p => p.id === id);
            if (project) showModal(project);
        });
        
        // Keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

function createPlantCard(project) {
    const stageLabel = getStageLabel(project.stage);
    const categoryLabel = getCategoryLabel(project.category);
    
    return `
        <article class="plant-card ${project.stage}" data-id="${project.id}">
            <span class="stage-badge">${stageLabel}</span>
            <p class="category-label">${categoryLabel}</p>
            <h2>${project.title}</h2>
            <p class="tagline">${project.tagline}</p>
            <div class="tech-stack" aria-label="Technologies used">
                ${project.techStack.slice(0, 3).map(tech => 
                    `<span class="tech-badge">${tech}</span>`
                ).join('')}
                ${project.techStack.length > 3 ? 
                    `<span class="tech-badge">+${project.techStack.length - 3}</span>` : 
                    ''}
            </div>
        </article>
    `;
}

function getStageLabel(stage) {
    const labels = {
        'exploration': 'Exploration',
        'development': 'Development',
        'deployed': 'Deployed',
        'archived': 'Archived'
    };
    return labels[stage] || stage;
}

function getCategoryLabel(category) {
    const labels = {
        'ai-automation': 'AI & Automation',
        'search-rag': 'Search & RAG',
        'observability': 'Observability & Monitoring',
        'data-visualization': 'Data Visualization & Education'
    };
    return labels[category] || category;
}

// ============================================
// Modal Functions
// ============================================
function showModal(project) {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Clear existing content and add new content
    modalContent.innerHTML = createModalContent(project);
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Close modal');
    closeBtn.addEventListener('click', hideModal);
    modalContent.prepend(closeBtn);
    
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    
    // Focus the close button for accessibility
    setTimeout(() => {
        closeBtn.focus();
    }, 100);
}

function hideModal() {
    const modal = document.getElementById('modal');
    modal.hidden = true;
    document.body.style.overflow = '';
}

function createModalContent(project) {
    const stageLabel = getStageLabel(project.stage);
    const categoryLabel = getCategoryLabel(project.category);
    
    const linksHtml = project.links && (project.links.demo || project.links.github) ? `
        <div class="modal-section">
            <div class="modal-links">
                ${project.links.demo ? `<a href="${project.links.demo}" class="modal-link" target="_blank" rel="noopener noreferrer">View Demo →</a>` : ''}
                ${project.links.github ? `<a href="${project.links.github}" class="modal-link" target="_blank" rel="noopener noreferrer">GitHub →</a>` : ''}
            </div>
        </div>
    ` : '';
    
    return `
        <div class="modal-header">
            <div style="margin-bottom: 1rem;">
                <span class="stage-badge">${stageLabel}</span>
                <span style="margin-left: 0.75rem; font-size: 0.9rem; color: rgba(255,255,255,0.7);">${project.status}</span>
            </div>
            <h2 id="modal-title">${project.title}</h2>
            <p class="tagline">${project.tagline}</p>
            <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7); margin-top: 0.5rem;">${categoryLabel}</p>
        </div>
        
        <div class="modal-meta">
            <div class="meta-item">
                <strong>Started:</strong> ${formatDate(project.planted)}
            </div>
            <div class="meta-item">
                <strong>Last Updated:</strong> ${formatDate(project.lastUpdated)}
            </div>
        </div>
        
        <div class="modal-description">
            ${project.description}
        </div>
        
        ${project.achievements && project.achievements.length > 0 ? `
            <div class="modal-section">
                <h3>Key Achievements</h3>
                <ul>
                    ${project.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
        
        <div class="modal-section">
            <h3>Tech Stack</h3>
            <div class="tech-stack">
                ${project.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
        </div>
        
        ${project.tags && project.tags.length > 0 ? `
            <div class="modal-section">
                <h3>Tags</h3>
                <div class="tech-stack">
                    ${project.tags.map(tag => `<span class="tech-badge">#${tag}</span>`).join('')}
                </div>
            </div>
        ` : ''}
        
        ${project.learnings ? `
            <div class="modal-section">
                <h3>Key Learnings</h3>
                <p>${project.learnings}</p>
            </div>
        ` : ''}
        
        ${linksHtml}
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// ============================================
// Filter Functions
// ============================================
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            currentFilter = filter;
            
            // Update active state
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
            
            // Filter projects
            const filtered = filter === 'all' ? 
                allProjects : 
                allProjects.filter(project => project.stage === filter);
            
            renderPlants(filtered);
        });
    });
}

// ============================================
// Event Listeners
// ============================================
function setupModal() {
    const modal = document.getElementById('modal');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    backdrop?.addEventListener('click', hideModal);
}

function setupKeyboard() {
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('modal');
        
        // Escape key closes modal
        if (e.key === 'Escape' && !modal.hidden) {
            hideModal();
        }
    });
}

function showError() {
    const garden = document.getElementById('garden');
    garden.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: rgba(255,255,255,0.9); padding: 3rem;">
            <h2 style="margin-bottom: 1rem;">Failed to load projects</h2>
            <p style="color: rgba(255,255,255,0.7);">Please try refreshing the page</p>
        </div>
    `;
}

// ============================================
// Initialize on Page Load
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGarden);
} else {
    initGarden();
}
