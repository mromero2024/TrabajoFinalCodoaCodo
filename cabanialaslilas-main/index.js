const form = document.querySelector('#contact-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const subject = document.querySelector('#subject');
  const message = document.querySelector('#message');
  
  if (!name.value) {
    alert('Por favor ingrese su nombre');
    name.focus();
    return false;
  }
  
  if (!email.value) {
    alert('Por favor ingrese su correo electrónico');
    email.focus();
    return false;
  }
  
  // Validar el correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    alert('Por favor ingrese un correo electrónico válido');
    email.focus();
    return false;
  }
  
  if (!subject.value) {
    alert('Por favor ingrese el asunto');
    subject.focus();
    return false;
  }
  
  if (!message.value) {
    alert('Por favor ingrese un mensaje');
    message.focus();
    return false;
  }
  
  // falta función para enviar el correo electrónico
 
