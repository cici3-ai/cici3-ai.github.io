// Mobile menu functionality
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const btn = document.querySelector('.mobile-menu-btn i');

    mobileNav.classList.toggle('active');

    if (mobileNav.classList.contains('active')) {
        btn.className = 'bi bi-x';
        document.body.style.overflow = 'hidden';
    } else {
        btn.className = 'bi bi-list';
        document.body.style.overflow = '';
    }
}

// Modal functionality with mobile improvements and form handling
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.classList.add('modal-open');

        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }

        setTimeout(() => {
            const firstInput = modal.querySelector('input[type="text"]');
            if (firstInput) firstInput.focus();
        }, 100);
    } else {
        console.error('Modal não encontrado!');
        alert('Entre em contato conosco pelo email: contato@cicitech.com.br');
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target == modal) {
        closeContactModal();
    }
};

// Setup modal close button
document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.onclick = function() {
            closeContactModal();
        };
    }
});

// Close modal with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeContactModal();
    }
});

// Pricing tabs functionality
function showPricingTab(tabName) {
    document.querySelectorAll('.pricing-content').forEach(content => {
        content.classList.remove('active');
    });

    document.querySelectorAll('.pricing-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(tabName + '-pricing').classList.add('active');
    event.target.classList.add('active');
}

// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

// Demo chat functionality
const answers = {
    'vendas': {
        user: '"Nossa margem líquida está caindo. Por quê?"',
        cici: 'Identifiquei 3 fatores principais: 📊 1) Aumento de 15% no custo de frete (maior impacto), 2) Mix de produtos: cresceu 23% a venda de itens de baixa margem vs alta margem, 3) Descontos: subiram de 8,2% para 11,7% sem critério. RECOMENDAÇÃO: Revisar política de frete para pedidos acima de R$ 200 e criar incentivos para produtos premium. Isso pode recuperar 4-6 pontos de margem em 60 dias.'
    },
    'vendedores': {
        user: '"Qual o faturamento por vendedor neste mês comparado ao mês passado?"',
        cici: 'Análise de performance por vendedor: 📈 João Silva: R$ 120k (+18% vs mês anterior), Maria Santos: R$ 85k (-5%), Carlos Lima: R$ 95k (+12%). DESTAQUE: João teve 23% mais conversões focando em produtos premium. OPORTUNIDADE: Maria está perdendo vendas em cross-sell (apenas 15% vs média de 28%). Sugiro treinamento específico em técnicas de venda consultiva para equalizar performance.'
    },
    'clientes': {
        user: '"Quais clientes têm risco de churn este mês?"',
        cici: 'Análise de churn identificou 23 clientes em risco alto (LTV total: R$ 340k): 🔴 Empresa Alpha: 65% probabilidade churn (sem compras há 45 dias + reduziu volume 40%), 🟡 Grupo Beta: 42% risco (padrão de pagamento mudou + reclamações aumentaram). Top 5 ações: 1) Contato comercial urgente Alpha, 2) Pesquisa NPS Grupo Beta, 3) Promoção retenção personalizada. Quer lista completa?'
    },
    'previsao': {
        user: '"Qual a previsão de faturamento para Q1?"',
        cici: 'Previsão Q1/2025: R$ 2.8M (±8% margem erro). 📈 Detalhamento: Jan: R$ 850k (baixa sazonalidade), Fev: R$ 920k (volta pós-férias), Mar: R$ 1.03M (alta histórica pré-outono). Cenários: Conservador R$ 2.6M | Otimista R$ 3.1M. Principais drivers: sazonalidade histórica + 3 novos produtos + campanha carnaval. Fatores de risco: inflação fornecedores + concorrente novo no mercado.'
    },
    'oportunidade': {
        user: '"Onde estou perdendo receita sem perceber?"',
        cici: 'Identifiquei 4 vazamentos de receita: 💰 1) Clientes categoria A comprando produtos B (R$ 180k potencial anual), 2) Região Sul subatendida: 40% menos reps vs potencial de mercado, 3) Cross-sell perdido: 67% dos clientes compram só 1 categoria vs histórico de quem compra 2+, 4) Timing: vendas terça/quarta são 23% menores sem motivo aparente. Maior oportunidade: campanha cross-sell pode gerar +R$ 280k em 6 meses.'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.question-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.question-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const answerKey = btn.dataset.answer;
            const answer = answers[answerKey];
            const chatResponse = document.getElementById('chat-response');

            chatResponse.innerHTML = '<div class="typing-indicator">CICI3 está analisando seus dados...</div>';

            setTimeout(() => {
                chatResponse.innerHTML = `
                    <div class="chat-message">
                        <div class="chat-user">Você:</div>
                        <div class="chat-response">${answer.user}</div>
                    </div>
                    <div class="chat-message">
                        <div class="chat-user">CICI3:</div>
                        <div class="chat-response">${answer.cici}</div>
                    </div>
                `;
            }, 2000);
        });
    });
});

// Smooth scroll for anchor links with mobile header offset
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = 80;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Animation trigger on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.reveal-up').forEach(el => {
        revealObserver.observe(el);
    });
});

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contactModal form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--coral-urgente)';
                    isValid = false;
                } else {
                    field.style.borderColor = 'var(--cinza-medio)';
                }
            });

            const emailField = form.querySelector('#email');
            if (emailField && emailField.value) {
                const email = emailField.value.toLowerCase();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Por favor, insira um email válido.');
                    return;
                }
            }

            if (!isValid) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;

            submitButton.innerHTML = 'Enviando... <i class="bi bi-hourglass-split"></i>';
            submitButton.disabled = true;

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    form.reset();
                    closeContactModal();
                } else {
                    throw new Error('Erro no envio');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao enviar mensagem. Tente novamente ou entre em contato pelo email: contato@cicitech.com.br');
            })
            .finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
        });

        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = 'var(--cinza-medio)';
            });
        });
    }
});

// Mobile nav UX
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    window.addEventListener('resize', function() {
        const mobileNav = document.getElementById('mobileNav');
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.addEventListener('scroll', function(e) {
            e.stopPropagation();
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileNav = document.getElementById('mobileNav');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

        if (mobileNav && mobileMenuBtn && !mobileNav.contains(event.target) && !mobileMenuBtn.contains(event.target) && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Pricing indicators (mobile only)
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        const indicators = document.querySelectorAll('.pricing-dot');
        const pricingGrid = document.querySelector('.pricing-grid');
        let currentIndex = 0;

        function updateIndicators() {
            indicators.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            currentIndex = (currentIndex + 1) % indicators.length;
        }

        if (indicators.length > 0) {
            indicators[0].classList.add('active');
        }

        setInterval(updateIndicators, 4000);

        if (pricingGrid) {
            pricingGrid.addEventListener('mouseover', function() {
                this.style.animationPlayState = 'paused';
            });

            pricingGrid.addEventListener('mouseout', function() {
                this.style.animationPlayState = 'running';
            });
        }
    }
});

// Handle orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }, 100);
});

// Set initial viewport height
document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
