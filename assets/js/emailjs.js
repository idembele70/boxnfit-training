(function(){
      emailjs.init({
        publicKey: "dGYM6f2YaGVHYc-P1",
      });
   })();

const contactForm = document.getElementById('contact');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    await emailjs.sendForm('service_8u03lth', 'template_rjmtmyx', contactForm)
    contactForm.reset();
  } catch (error) {
    console.error("Échec de l'envoi", error)
  }
})