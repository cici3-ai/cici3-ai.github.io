document.addEventListener('DOMContentLoaded', function() {
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
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Impedir rolagem da página
  }
  
  // Função para fechar o modal
  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restaurar rolagem da página
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
    closeButton.addEventListener('click', closeModal);
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
  
  // Envio do formulário com feedback visual
  const contactForm = modal.querySelector('form');
  if (contactForm) {
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
    }, 1000);
  });
});
