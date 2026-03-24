// ===== 网站交互脚本 =====

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('Wanderlust Adventures 网站已加载');
    
    // 初始化所有功能
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    initNewsletterForm();
    initAnimations();
    initContactForm();
});

// ===== 移动端菜单切换 =====
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // 点击菜单项后关闭菜单（移动端）
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
        
        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// ===== 平滑滚动 =====
function initSmoothScroll() {
    // 为所有内部链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 计算偏移量（考虑固定导航栏）
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== 表单验证 =====
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // 清除之前的错误提示
        clearErrors();
        
        // 验证姓名
        if (!nameInput.value.trim()) {
            showError(nameInput, '请输入您的姓名');
            isValid = false;
        }
        
        // 验证邮箱
        if (!emailInput.value.trim()) {
            showError(emailInput, '请输入您的邮箱');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, '请输入有效的邮箱地址');
            isValid = false;
        }
        
        // 验证消息
        if (!messageInput.value.trim()) {
            showError(messageInput, '请输入您的消息');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, '消息内容至少需要10个字符');
            isValid = false;
        }
        
        if (isValid) {
            // 模拟表单提交
            showNotification('消息发送成功！我会尽快回复您。', 'success');
            contactForm.reset();
            
            // 在实际应用中，这里应该发送到服务器
            console.log('表单数据:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
        }
    });
    
    // 实时验证
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
}

function validateField(field) {
    let isValid = true;
    let errorMessage = '';
    
    switch (field.id) {
        case 'name':
            if (!field.value.trim()) {
                errorMessage = '请输入您的姓名';
                isValid = false;
            }
            break;
        case 'email':
            if (!field.value.trim()) {
                errorMessage = '请输入您的邮箱';
                isValid = false;
            } else if (!isValidEmail(field.value)) {
                errorMessage = '请输入有效的邮箱地址';
                isValid = false;
            }
            break;
        case 'message':
            if (!field.value.trim()) {
                errorMessage = '请输入您的消息';
                isValid = false;
            } else if (field.value.trim().length < 10) {
                errorMessage = '消息内容至少需要10个字符';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    } else {
        clearError(field);
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    const formGroup = input.closest('.form-group') || input.parentElement;
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    
    formGroup.appendChild(errorDiv);
    input.style.borderColor = '#e74c3c';
}

function clearError(input) {
    const formGroup = input.closest('.form-group') || input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.style.borderColor = '';
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('input, textarea').forEach(input => {
        input.style.borderColor = '';
    });
}

// ===== 新闻订阅表单 =====
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        if (!emailInput) return;
        
        if (!emailInput.value.trim()) {
            showNotification('请输入邮箱地址', 'error');
            return;
        }
        
        if (!isValidEmail(emailInput.value)) {
            showNotification('请输入有效的邮箱地址', 'error');
            return;
        }
        
        // 模拟订阅成功
        showNotification('订阅成功！感谢订阅我们的旅行资讯。', 'success');
        emailInput.value = '';
        
        // 在实际应用中，这里应该发送到服务器
        console.log('新闻订阅:', emailInput.value);
    });
}

// ===== 联系表单 =====
function initContactForm() {
    const contactForm = document.querySelector('form');
    if (!contactForm) return;
    
    // 为所有表单添加提交处理
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // 显示成功消息
        showNotification('消息已发送！我会尽快回复您。', 'success');
        this.reset();
        
        // 在实际应用中，这里应该发送到服务器
        console.log('联系表单数据:', data);
    });
}

// ===== 通知系统 =====
function showNotification(message, type = 'info') {
    // 移除现有的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 样式
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '9999';
    notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    notification.style.animation = 'fadeIn 0.3s ease-out';
    
    // 根据类型设置背景色
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#2ecc71';
            break;
        case 'error':
            notification.style.backgroundColor = '#e74c3c';
            break;
        case 'info':
            notification.style.backgroundColor = '#3498db';
            break;
        default:
            notification.style.backgroundColor = '#3498db';
    }
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        notification.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== 动画效果 =====
function initAnimations() {
    // 滚动时显示元素
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.destination-card, .blog-card, .about-content, .stat-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // 滚动时更新导航栏样式
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = 'var(--white)';
        }
    });
}

// ===== 工具函数 =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== 页面加载完成后的初始化 =====
window.addEventListener('load', function() {
    // 确保所有图片加载完成
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;
    
    images.forEach(img => {
        if (img.complete) {
            imagesLoaded++;
        } else {
            img.addEventListener('load', function() {
                imagesLoaded++;
                if (imagesLoaded === images.length) {
                    console.log('所有图片加载完成');
                }
            });
        }
    });
    
    // 添加页面加载完成类
    document.body.classList.add('loaded');
});

// ===== 控制台欢迎信息 =====
console.log('%c🌍 Welcome to Wanderlust Adventures!', 'color: #2ecc71; font-size: 18px; font-weight: bold;');
console.log('%c探索世界，发现美好。', 'color: #3498db; font-size: 14px;');