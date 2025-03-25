document.addEventListener('DOMContentLoaded', function() {
  // Array de textos e classes para identificar botões CTA
  const ctaIdentifiers = [
    {text: 'Entre em contato', exact: true},
    {text: 'Fale com o time', exact: true},
    {text: 'Falar com Especialista', exact: true},
    {text: 'Saiba mais', exact: false},
    {text: 'Comece agora', exact: false},
    {text: 'Entrar na Lista', exact: true},
    {text: 'Quero a Cici3', exact: false},
    {text: 'Conhecer', exact: false}
  ];
  
  // Função para verificar se um elemento é um botão CTA
  function isCTAButton(element) {
    const buttonText = element.textContent.trim();
    
    // Verifica se o texto do botão corresponde a algum dos identificadores
    for (const id of ctaIdentifiers) {
      if ((id.exact && buttonText === id.text) || 
          (!id.exact && buttonText.includes(id.text))) {
        return true;
      }
    }
    
    // Verifica se um elemento filho (como um span) contém o texto
    const spans = element.querySelectorAll('span');
    for (const span of spans) {
      const spanText = span.textContent.trim();
      for (const id of ctaIdentifiers) {
        if ((id.exact && spanText === id.text) || 
            (!id.exact && spanText.includes(id.text))) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  // Encontra todos os links e botões
  const allButtons = document.querySelectorAll('a.btn, button.btn, a[href="javascript:void(0);"]');
  
  // Adiciona evento de clique a todos os botões CTA
  allButtons.forEach(function(button) {
    if (isCTAButton(button)) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Mostra o modal de contato
        const modal = document.getElementById('contactModal');
        if (modal) {
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden';
          
          // Adiciona um campo oculto para rastrear de qual botão o lead veio
          const sourceField = modal.querySelector('input[name="source"]');
          if (sourceField) {
            sourceField.value = button.textContent.trim();
          } else {
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'source';
            hiddenInput.value = button.textContent.trim();
            modal.querySelector('form').appendChild(hiddenInput);
          }
        }
      });
    }
  });
  
  // Script para o botão original "Entre em contato"
  const contactButtons = document.querySelectorAll('a span');
  contactButtons.forEach(function(span) {
    if (span.textContent.trim() === 'Entre em contato') {
      const button = span.closest('a');
      if (button) {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          const modal = document.getElementById('contactModal');
          if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
          }
        });
      }
    }
  });
  
  // Fechar o modal quando clicar no botão de fechar
  const closeButtons = document.querySelectorAll('.close');
  closeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  });
  
  // Fechar o modal quando clicar fora dele
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  
  // Formulário de newsletter no final da página
  const newsletterSection = document.querySelector('section .tw-flex.tw-h-\\[60px\\]');
  if (newsletterSection) {
    const emailInput = newsletterSection.querySelector('input[type="email"]');
    const submitButton = newsletterSection.querySelector('a.btn');
    
    if (emailInput && submitButton) {
      submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (emailInput.value) {
          // Abre o modal e preenche o email
          const modal = document.getElementById('contactModal');
          if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Preenche o campo de email com o valor do formulário de newsletter
            const emailField = modal.querySelector('input[name="_replyto"]');
            if (emailField) {
              emailField.value = emailInput.value;
            }
            
            // Define a fonte como Newsletter
            const sourceField = modal.querySelector('input[name="source"]');
            if (sourceField) {
              sourceField.value = 'Formulário Newsletter';
            }
          }
        }
      });
    }
  }
});
