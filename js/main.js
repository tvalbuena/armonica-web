// Formulario WhatsApp
document.getElementById('btnWhatsapp').addEventListener('click', function() {
  const nombre = document.querySelector('input[placeholder="Tu nombre"]').value;
  const apellido = document.querySelector('input[placeholder="Tu apellido"]').value;
  const correo = document.querySelector('input[placeholder="tucorreo@email.com"]').value;
  const telefono = document.querySelector('input[placeholder="+57 300 000 0000"]').value;
  const procedimiento = document.querySelector('.form-select').value;

  if (!nombre || !apellido || !correo || !telefono || !procedimiento) {
    alert('Por favor completa todos los campos antes de enviar.');
    return;
  }

  const mensaje = `Hola ARMÓNICA! Me gustaría agendar una cita 😊%0A%0A` +
    `*Nombre:* ${nombre} ${apellido}%0A` +
    `*Correo:* ${correo}%0A` +
    `*Teléfono:* ${telefono}%0A` +
    `*Procedimiento de interés:* ${procedimiento}`;

  window.open(`https://wa.me/573227132918?text=${mensaje}`, '_blank');
});
