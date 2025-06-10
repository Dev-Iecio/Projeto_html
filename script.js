document.addEventListener('DOMContentLoaded', function () {
    // ===== [MENU MOBILE] =====
    const mobileMenuButton = document.getElementById('mobile_menu_button');
    const navbar = document.getElementById('navbar');
    const mobileMenuIcon = mobileMenuButton.querySelector('i');

    mobileMenuButton.addEventListener('click', function (e) {
        e.stopPropagation();
        navbar.classList.toggle('mobile-active');
        mobileMenuIcon.classList.toggle('fa-list');
        mobileMenuIcon.classList.toggle('fa-times');
    });

    // ===== [DROPDOWN RESPONSIVO] =====
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const dropdownLinks = document.querySelectorAll('.dropdown > a');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (isMobile) {
                e.preventDefault();
                const dropdownContent = this.nextElementSibling;
                if (dropdownContent && dropdownContent.classList.contains('dropdown-content')) {
                    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
                }
            }
        });
    });

    // ===== [COMPORTAMENTOS GERAIS] =====
    document.addEventListener('click', function (e) {
        const path = e.composedPath();

        // Fecha menu mobile se clicar fora
        if (!path.includes(navbar)) {
            navbar.classList.remove('mobile-active');
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-list');
        }

        // Fecha dropdowns se clicar fora
        const dropdowns = document.querySelectorAll('.dropdown-content');
        if (!path.some(el => el.classList && el.classList.contains('dropdown'))) {
            dropdowns.forEach(d => d.style.display = 'none');
        }
    });

    // Previne fechamento ao clicar dentro
    navbar.addEventListener('click', e => e.stopPropagation());
    document.querySelectorAll('.dropdown').forEach(drop => {
        drop.addEventListener('click', e => e.stopPropagation());
    });

    // ===== [FAQ] =====
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Fecha outras respostas
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = '0';
                }
            });

            // Alterna a atual
            this.classList.toggle('active');
            answer.style.maxHeight = isActive ? '0' : answer.scrollHeight + 'px';
        });
    });

    // ===== [EFEITOS HOVER SOCIAL] =====
    const socialLinks = document.querySelectorAll('.social-icons a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.backgroundColor = '#ffcb45';
            link.style.color = '#1d1d1d';
            link.style.transform = 'translateY(-3px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.backgroundColor = '#333333';
            link.style.color = '#ffffff';
            link.style.transform = 'translateY(0)';
        });
    });

    // ===== [CONTROLE DE VÍDEO HERO] =====
    const heroVideo = document.querySelector('#hero-video video');
    if (heroVideo) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play();
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.5 });
        observer.observe(heroVideo);
    }
});
