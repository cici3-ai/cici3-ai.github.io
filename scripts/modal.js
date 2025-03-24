document.addEventListener('DOMContentLoaded', function() {
  // Variável para armazenar a posição original do scroll
  let scrollPosition = 0;

  // Selecionar elementos
  const modal = document.getElementById('contactModal');
  if (!modal) {
    console.error('Modal de contato não encontrado!');
    return;
  }
  
  const closeButton = modal.querySelector('.close');
  
  // Encontrar todos os botões ou links que mencionam contato
  const allLinks = document.querySelectorAll('a, button');
  const contactButtons = [];
  
  allLinks.forEach(link => {
    const text = link.textContent.toLowerCase();
    // Verifique se o texto contém alguma palavra relacionada a contato
    if (text.includes('contato') || 
        text.includes('contact') || 
        text.includes('fale conosco') || 
        text.includes('entre em contato') ||
        link.classList.contains('contact-button') ||
        link.classList.contains('btn-contact') ||
        link.getAttribute('href') === '#contact') {
      contactButtons.push(link);
    }
  });
  
  console.log('Botões de contato encontrados:', contactButtons.length);
  
  // Função para abrir o modal
  function openModal() {
    // Salvar a posição atual do scroll
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Mostrar o modal
    modal.classList.add('show');
    
    // Fixar o body para prevenir scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollPosition}px`;
  }
  
  // Função para fechar o modal
  function closeModal() {
    // Esconder o modal
    modal.classList.remove('show');
    
    // Restaurar o scroll
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    
    // Retornar à posição original do scroll
    window.scrollTo(0, scrollPosition);
  }
  
  // Adicionar evento de clique aos botões de contato
  contactButtons.forEach(button => {
    console.log('Adicionando evento ao botão:', button.textContent.trim());
    button.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  });
  
  // Fechar o modal quando clicar no botão de fechar
  if (closeButton) {
    closeButton.addEventListener('click', function(e) {
      e.preventDefault();
      closeModal();
    });
  }
  
  // Fechar o modal quando clicar fora dele
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Fechar o modal quando pressionar ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  
  // Prevenir que toques no modal afetem a página por trás
  modal.addEventListener('touchmove', function(e) {
    if (e.target === modal) {
      e.preventDefault();
    }
  }, { passive: false });
  
  // Permitir scroll dentro do conteúdo do modal em dispositivos móveis
  const modalContent = modal.querySelector('.modal-content') || modal.querySelector('.modal-dialog');
  if (modalContent) {
    modalContent.addEventListener('touchmove', function(e) {
      e.stopPropagation();
    }, { passive: true });
  }
  
  // Envio do formulário com feedback visual
  const contactForm = modal.querySelector('form');
  if (contactForm) {
    // Permitir scroll dentro do formulário em dispositivos móveis
    contactForm.addEventListener('touchmove', function(e) {
      e.stopPropagation();
    }, { passive: true });
    
    contactForm.addEventListener('submit', function(e) {
      const submitButton = contactForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // O Formspree já faz o envio, isso é só para feedback visual
        // e para que o modal feche após alguns segundos
        setTimeout(function() {
          submitButton.textContent = 'Mensagem Enviada!';
          submitButton.style.backgroundColor = '#28a745';
          
          setTimeout(function() {
            closeModal();
            submitButton.textContent = 'Enviar Mensagem';
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '';
          }, 2000);
        }, 1000);
      }
    });
  }
});
