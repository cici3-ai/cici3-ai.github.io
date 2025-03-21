// Adicione este código como um novo arquivo em scripts/modal.js
// Ou adicione ao seu index.js existente

document.addEventListener('DOMContentLoaded', function() {
  // Selecionar elementos
  const modal = document.getElementById('contactModal');
  const contactButtons = document.querySelectorAll('.contact-button, .btn-contact, a[href="#contact"]');
  const closeButton = modal.querySelector('.close');
  
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
    button.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  });
  
  // Fechar o modal quando clicar no botão de fechar
  closeButton.addEventListener('click', closeModal);
  
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
  contactForm.addEventListener('submit', function(e) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
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
  });
});
