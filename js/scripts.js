// assets/js/scripts.js

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupHeroCarousel();
        this.injectContent();
        this.setupIntersectionObserver();
        this.setupContactForm();
    }

    // Configuration des écouteurs d'événements
    setupEventListeners() {
        // Header au scroll
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Menu mobile
        const menuToggle = document.getElementById('menuToggle');
        const nav = document.querySelector('.nav');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.classList.toggle('active');
                nav.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', !isExpanded);
            });
        }
        
        // Fermer le menu en cliquant sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Modales
        this.setupModals();
    }

    // Gestion du scroll pour le header
    handleScroll() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Configuration du carrousel hero
    setupHeroCarousel() {
        const carousel = document.getElementById('heroCarousel');
        if (!carousel) return;

        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const indicators = carousel.querySelectorAll('.indicator');

        let currentSlide = 0;
        let autoplayInterval;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            currentSlide = index;
        };

        const nextSlide = () => {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        };

        const prevSlide = () => {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        };

        // Contrôles
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        // Indicateurs
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showSlide(index));
        });

        // Autoplay
        const startAutoplay = () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        };

        const stopAutoplay = () => {
            clearInterval(autoplayInterval);
        };

        // Pause au survol
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide;
        });

        // Démarrer l'autoplay
        startAutoplay();
    }

    // Injection du contenu dynamique
    injectContent() {
        this.injectKits();
        this.injectProjects();
        this.injectTestimonials();
    }

    // Injection des kits
    injectKits() {
        const kitsGrid = document.getElementById('kitsGrid');
        if (!kitsGrid) return;

        const kitsData = [
            {
                id: "kit-growth",
                title: "Kit Standard",
                tagline: "Le minimum pour un lancement pro",
                price: "À partir de 40.000 FCFA",
                image: "assets/images/kits/kit-1.jpg",
                bullets: [
                    "Logo (Création/Refonte)",
                    "identité visuelle",
                    "Carte de visite ou",
                    "Flyer",
                    "NB : Offre limitée à la CONCEPTION"
                ]
            },
            {
                id: "kit-brand",
                title: "Kit Avancé",
                tagline: "Pour une Identité de marque forte",
                price: "À partir de 45.000 FCFA",
                image: "assets/images/kits/kit-2.jpg",
                bullets: [
                    "Logo (Création/Refonte)",
                    "identité visuelle",
                    "Carte de visite",
                    "Flyer",
                    "Brochure"
                ]
            },
            {
                id: "kit-social",
                title: "Kit Professionnel",
                tagline: "Pour une marque qui se respect 😇",
                price: "À partir de 55.000FCFA€",
                image: "assets/images/kits/kit-3.jpg",
                bullets: [
                    "Kit Avancé +",
                    "Roll-up",
                    "Visuels pour les RS",
                ]
            },
            {
                id: "kit-webstarter",
                title: "Kit Premium",
                tagline: "Pour allez loin",
                price: "À partir de 70.000 FCFA",
                image: "assets/images/kits/kit-4.jpg",
                bullets: [
                    "Kit Professionnel +",
                    "Création et gestion des pages(RS)"
                ]
            },
            {
                id: "kit-photo-pack",
                title: "Kit Deluxe",
                tagline: "Images professionnelles Absolue 👏🏿",
                price: "À partir de 150.000FCFA",
                image: "assets/images/kits/kit-5.jpg",
                bullets: [
                    "Kit Premium",
                    "Conception et Réalisation de site web",
                    "Et plus...😻"
                ]
            }
        ];

        const kitsHTML = kitsData.map(kit => `
            <div class="kit-card" data-kit-id="${kit.id}">
                <div class="kit-image">
                    <picture>
                        <source srcset="${kit.image.replace('.jpg', '.webp')}" type="image/webp">
                        <img src="${kit.image}" alt="${kit.title}" loading="lazy">
                    </picture>
                </div>
                <div class="kit-content">
                    <h3>${kit.title}</h3>
                    <p class="kit-tagline">${kit.tagline}</p>
                    <p class="kit-price">${kit.price}</p>
                    
                    <ul class="kit-bullets">
                        ${kit.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                    </ul>
                    
                    <button class="btn btn-primary kit-details-btn" data-kit-id="${kit.id}">
                        Voir le kit
                    </button>
                </div>
            </div>
        `).join('');

        kitsGrid.innerHTML = kitsHTML;

        // Événements pour les boutons de détails
        kitsGrid.querySelectorAll('.kit-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const kitId = e.target.getAttribute('data-kit-id');
                this.openKitModal(kitId, kitsData);
            });
        });
    }

    // Injection des projets
    injectProjects() {
        const portfolioGrid = document.getElementById('portfolioGrid');
        if (!portfolioGrid) return;

        const projectsData = [
            {
                id: "projet-identite-1",
                title: "Refonte-Identité Visuelle-Design Creative",
                category: "identite",
                description: "Design Creative est une agence dédiée à la création visuelle professionnelle pour les PME et les entreprises en lancement.",
                role: "Designer principal",
                image: "../assets/images/projets/projet-identite-1.jpg"
            },
            {
                id: "projet-identite-2",
                title: "Charte graphique complet-KEYLO ASSURANCE",
                category: "identite",
                description: "Keylo Assurances – CCAK Sarl est un cabinet tchadien de conseil et de courtage en assurances, engagé à rendre la protection accessible, claire et fiable pour tous",
                role: "Designer principal",
                image: "../assets/images/projets/projet-identite-2.jpg"
            },
            {
                id: "projet-identite-3",
                title: "Concours national de création de logo : Logo gagnant",
                category: "identite",
                description: "AILC, créée suite au Dialogue National Inclusif et Souverain de 2022, joue un rôle central dans la prévention et la lutte contre la corruption au Tchad.",
                role: "Designer principal",
                image: "../assets/images/projets/projet-identite-3.jpg"
            },
            {
                id: "projet-identite-4",
                title: "Projet RAHA TRANSPORT, Société de Transports-Transites",
                category: "identite",
                description: "Réalisation de Kit d'éléments visuels",
                role: "Designer principal",
                image: "../assets/images/projets/projet-identite-4.jpg"
            },
            {
                id: "projet-web-1",
                title: "Portfolio-Iny MARIAMA : Mannequin. Originaire de N'Djamena, basée à Douala",
                category: "web",
                description: "https://www.peacequare4.github.io/iny-mariama-portfolio/",
                role: "Dev Front",
                image: "../assets/images/projets/projet-web-1.jpg"
            },
            {
                id: "projet-web-2",
                title: "Application Web - ARASSEDE DELAPAIX (Design Creative)",
                category: "web",
                description: "www.delapaix.pro",
                role: "Dev Front",
                image: "../assets/images/projets/projet-web-2.jpg"
            }
        ];

        const projectsHTML = projectsData.map(project => `
            <div class="project-card ${project.category}" data-project-id="${project.id}">
                <div class="project-image">
                    <picture>
                        <source srcset="${project.image.replace('.jpg', '.webp')}" type="image/webp">
                        <img src="${project.image}" alt="${project.title}" loading="lazy">
                    </picture>
                    <div class="project-overlay">
                        <span class="project-category">${project.category === 'identite' ? 'Identité Visuelle' : 'Développement Web'}</span>
                        <button class="btn btn-outline view-project-btn" data-project-id="${project.id}">
                            Voir le projet
                        </button>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <small><strong>Rôle:</strong> ${project.role}</small>
                </div>
            </div>
        `).join('');

        portfolioGrid.innerHTML = projectsHTML;

        // Configuration des filtres
        this.setupProjectFilters();

        // Événements pour les boutons de projets
        portfolioGrid.querySelectorAll('.view-project-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectId = e.target.getAttribute('data-project-id');
                this.openProjectModal(projectId, projectsData);
            });
        });
    }

    // Configuration des filtres de projets
    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Mettre à jour les boutons actifs
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filtrer les projets
                projectCards.forEach(card => {
                    if (filter === 'all' || card.classList.contains(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Injection des témoignages
    injectTestimonials() {
        const testimonialsCarousel = document.getElementById('testimonialsCarousel');
        if (!testimonialsCarousel) return;

        const testimonialsData = [
            {
                name: "Adjam ardai",
                role: "Architecte et Fondateur",
                company: "Vri-Simai",
                quote: "je lui ai contacté pour la création du logo, carte de visite et autres pour mon entreprise, Vri-Simaï. J'étais à 100% satisfait du résultat produit par Mr Arassedé Delapaix à travers Design Créative. Son professionnalisme m'a convaincu dès notre premier contact.",
                project: "Création du logo + Supports de communication",
                avatar: "assets/images/testimonials/adjam.jpg"
            },
            {
                name: "Nodjibeye Chérubin",
                role: "Fondateur",
                company: "Ministère les citoyens célestes",
                quote: "Nous avons été profondément touchés par votre manière de travailler avec passion et authenticité. Le service offert par Design Creative a dépassé nos attentes et nous en sommes pleinement satisfaits. Nous avons déjà hâte de collaborer à un nouveau projet avec vous !",
                project: "Création d'une nouvelle identité visuelle pour MCC",
                avatar: "assets/images/testimonials/cherubin.jpg"
            },
            {
                name: "Ngassala Romain",
                role: "PDG de l'entreprise ITI",
                company: "Incubateur Technologique de l'Innovation",
                quote: "Arassedé a su traduire notre vision en une identité visuelle forte et cohérente. Son expertise en design et développement nous a permis de nous démarquer sur un marché très concurrentiel.",
                project: "Refonte l'Identité visuelle",
                avatar: "assets/images/testimonials/romain.jpg"
            }
        ];

        const testimonialsHTML = testimonialsData.map(testimonial => `
            <div class="testimonial-card">
                <div class="testimonial-content">
                    <div class="testimonial-text">
                        <p>"${testimonial.quote}"</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            <img src="${testimonial.avatar}" alt="${testimonial.name}" loading="lazy">
                        </div>
                        <div class="author-info">
                            <h4>${testimonial.name}</h4>
                            <p>${testimonial.role}, ${testimonial.company}</p>
                            <span class="project-link">Projet: ${testimonial.project}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        testimonialsCarousel.innerHTML = testimonialsHTML;
    }

    // Configuration de l'Intersection Observer
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animation des compteurs
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observer les éléments à animer
        document.querySelectorAll('.slide-up, .stat-number').forEach(el => {
            observer.observe(el);
        });
    }

    // Animation des compteurs
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Configuration des modales
    setupModals() {
        const modal = document.getElementById('modal');
        const modalClose = modal.querySelector('.modal-close');
        const modalOverlay = modal.querySelector('.modal-overlay');

        const closeModal = () => {
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

        // Fermer avec ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
                closeModal();
            }
        });
    }

    // Ouvrir la modale d'un kit
    openKitModal(kitId, kitsData) {
        const kit = kitsData.find(k => k.id === kitId);
        if (!kit) return;

        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modalBody');

        const modalContent = `
            <div class="kit-modal">
                <h2>${kit.title}</h2>
                <p class="kit-modal-tagline">${kit.tagline}</p>
                
                <div class="kit-modal-content">
                    <div class="kit-modal-image">
                        <picture>
                            <source srcset="${kit.image.replace('.jpg', '.webp')}" type="image/webp">
                            <img src="${kit.image}" alt="${kit.title}" loading="lazy">
                        </picture>
                    </div>
                    
                    <div class="kit-modal-details">
                        <div class="kit-price-large">${kit.price}</div>
                        <p class="kit-description"> ${kit.tagline.toLowerCase()}</p>
                        
                        <div class="kit-includes">
                            <h3>Ce qui est inclus :</h3>
                            <ul>
                                ${kit.bullets.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="kit-delivery">
                            <strong>Délai de livraison :</strong> 1 et 3 semaines
                        </div>
                        
                        <div class="kit-modal-actions">
                            <button class="btn btn-primary" onclick="portfolioApp.showOrderForm('${kit.id}')">
                                Commander ce kit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modalBody.innerHTML = modalContent;
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    /* Fonctionnalité à venir
    <button class="btn btn-secondary">
                                Télécharger la brochure
                            </button>
                            */
    // Ouvrir la modale d'un projet
    openProjectModal(projectId, projectsData) {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;

        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modalBody');

        const modalContent = `
            <div class="project-modal">
                <h2>${project.title}</h2>
                <p class="project-category-badge">${project.category === 'identite' ? 'Identité Visuelle' : 'Développement Web'}</p>
                
                <div class="project-carousel">
                    <div class="carousel-container">
                        <div class="carousel-slide active">
                            <img src="${project.image}" alt="${project.title}" loading="lazy">
                        </div>
                    </div>
                </div>
                
                <div class="project-details">
                    <div class="project-case-study">
                        <h3>Case Study</h3>
                        <div class="case-study-section">
                            <h4>Le défi</h4>
                            <p>${project.description}</p>
                        </div>
                        <div class="case-study-section">
                            <h4>Mon approche</h4>
                            <p> ------------   </p>
                            <p>  ---------  </p>
                        </div>
                    </div>
                    
                    <div class="project-tech">
                        <h4>Technologies & Outils maitrisés :</h4>
                        <div class="tech-tags">
                            <span class="tech-tag">PS, AI, Id, </span>
                            <span class="tech-tag">ADOBE XD</span>
                            <span class="tech-tag">HTML/CSS/JS</span>
                            <span class="tech-tag">TailWind</span>
                            <span class="tech-tag">REACT JS</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modalBody.innerHTML = modalContent;
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    // Afficher le formulaire de commande
    showOrderForm(kitId) {
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modalBody');

        const orderFormHTML = `
            <div class="order-form">
                <h2>Commander un kit</h2>
                <p>Remplissez ce formulaire pour passer commande. Je vous recontacterai sous 24h pour finaliser les détails.</p>
                
                <form id="orderForm">
                    <input type="hidden" name="kit" value="${kitId}">
                    
                    <div class="form-group">
                        <label for="order-name" class="form-label">Nom complet *</label>
                        <input type="text" id="order-name" name="name" required class="form-input">
                    </div>
                    
                    <div class="form-group">
                        <label for="order-email" class="form-label">Email *</label>
                        <input type="email" id="order-email" name="email" required class="form-input">
                    </div>
                    
                    <div class="form-group">
                        <label for="order-company" class="form-label">Entreprise</label>
                        <input type="text" id="order-company" name="company" class="form-input">
                    </div>
                    
                    <div class="form-group">
                        <label for="order-message" class="form-label">Détails du projet *</label>
                        <textarea id="order-message" name="message" rows="4" required class="form-input" placeholder="Décrivez brièvement votre projet et vos attentes..."></textarea>
                    </div>
                    
                    <div class="form-group checkbox-group">
                        <input type="checkbox" id="order-consent" name="consent" required>
                        <label for="order-consent" class="checkbox-label">
                            J'accepte que mes données soient utilisées pour traiter ma demande *
                        </label>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-full">
                        <span class="btn-text">Envoyer ma demande</span>
                        <div class="btn-loader" aria-hidden="true"></div>
                    </button>
                </form>
            </div>
        `;

        modalBody.innerHTML = orderFormHTML;

        // Configuration du formulaire de commande
        const orderForm = document.getElementById('orderForm');
        if (orderForm) {
            orderForm.addEventListener('submit', this.handleOrderSubmit.bind(this));
        }
    }

    /* Configuration du formulaire de contact
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', this.handleContactSubmit.bind(this));
    }
*/
setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Désactiver la validation HTML5 par défaut
    contactForm.setAttribute('novalidate', 'true');
    
    contactForm.addEventListener('submit', this.handleFormspreeSubmit.bind(this));
}

// Nouvelle méthode pour gérer Formspree
async handleFormspreeSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    console.log('📤 Tentative d\'envoi du formulaire...');
    
    // Validation manuelle
    if (!this.validateForm(form)) {
        console.log('❌ Validation échouée');
        return;
    }
    
    // État de chargement
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        console.log('🔄 Envoi vers Formspree...');
        
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        console.log('📨 Réponse reçue:', response.status);
        
        if (response.ok) {
            console.log('✅ Formulaire envoyé avec succès!');
            this.showToast('Message envoyé avec succès! Je vous répondrai rapidement.', 'success');
            form.reset();
        } else {
            throw new Error('Erreur HTTP: ' + response.status);
        }
        
    } catch (error) {
        console.error('❌ Erreur d\'envoi:', error);
        this.showToast('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}
    // Gestion de la soumission du formulaire de contact
    async handleContactSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        
        // Validation
        if (!this.validateForm(form)) {
            return;
        }
        
        // État de chargement
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Simulation d'envoi - remplacer par votre endpoint
            const response = await this.submitForm(formData);
            
            this.showToast('Message envoyé avec succès! Je vous répondrai rapidement.', 'success');
            form.reset();
            
        } catch (error) {
            this.showToast('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
            console.error('Erreur formulaire:', error);
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    // Gestion de la soumission du formulaire de commande
    async handleOrderSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        
        // Validation
        if (!this.validateForm(form)) {
            return;
        }
        
        // État de chargement
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Simulation d'envoi
            await this.submitForm(formData);
            
            this.showToast('Demande envoyée! Je vous recontacte sous 24h.', 'success');
            
            // Fermer la modale après succès
            setTimeout(() => {
                document.getElementById('modal').setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }, 2000);
            
        } catch (error) {
            this.showToast('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    // Validation du formulaire
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showInputError(input, 'Ce champ est obligatoire');
                isValid = false;
            } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
                this.showInputError(input, 'Veuillez entrer un email valide');
                isValid = false;
            } else {
                this.clearInputError(input);
            }
        });
        
        return isValid;
    }

    // Validation d'email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Affichage des erreurs de champ
    showInputError(input, message) {
        this.clearInputError(input);
        input.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'input-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #e53e3e;
            font-size: 0.875rem;
            margin-top: 0.5rem;
        `;
        
        input.parentNode.appendChild(errorElement);
    }

    // Effacement des erreurs de champ
    clearInputError(input) {
        input.classList.remove('error');
        const existingError = input.parentNode.querySelector('.input-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // Soumission du formulaire (simulation)
    async submitForm(formData) {
        // Simulation d'envoi - remplacer par votre logique d'envoi
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simuler un succès 90% du temps
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Erreur de réseau'));
                }
            }, 1500);
        });
    }

    // Affichage des notifications
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        const styles = {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '12px',
            color: 'white',
            zIndex: '10000',
            maxWidth: '300px',
            boxShadow: '0 20px 60px rgba(11, 18, 32, 0.15)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            fontWeight: '500'
        };
        
        Object.assign(toast.style, styles);
        
        // Couleurs selon le type
        const colors = {
            success: '#10B981',
            error: '#EF4444',
            info: '#2B73B9',
            warning: '#F59E0B'
        };
        
        toast.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(toast);
        
        // Animation d'entrée
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 10);
        
        // Supprimer après 5 secondes
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);
    }
}

// Initialisation de l'application
const portfolioApp = new PortfolioApp();

// Exposer l'application globalement pour les appels depuis le HTML
window.portfolioApp = portfolioApp;