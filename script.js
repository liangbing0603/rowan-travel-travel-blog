// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // FAQ 折叠（仅在 contact.html 页面存在）
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const answer = btn.nextElementSibling;
            answer.classList.toggle('active');
        });
    });

    // 联系表单提交（模拟）
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // 订阅表单提交（所有页面）
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thanks for subscribing! Check your inbox for updates.');
            this.reset();
        });
    });

    // 搜索框提示（博客侧边栏）
    const searchBox = document.querySelector('.search-box input');
    if (searchBox) {
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                alert(`Search feature coming soon! You searched for: ${this.value}`);
            }
        });
    }
});