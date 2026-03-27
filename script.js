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

// 获取所有筛选按钮和所有目的地卡片
const filterBtns = document.querySelectorAll('.filter-btn');
const destinationCards = document.querySelectorAll('.destination-card');

// 为每个按钮添加点击事件
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 获取当前按钮的筛选值
        const filterValue = btn.getAttribute('data-filter');
        
        // 更新按钮的激活状态
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        // 遍历卡片，决定显示或隐藏
        destinationCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === cardCategory) {
                card.style.display = 'block';  // 或 'flex'，根据原始样式
            } else {
                card.style.display = 'none';
            }
        });
    });
});
