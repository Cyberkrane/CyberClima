// Esperar a que el que DOM cargue
document.addEventListener("click", () => {
  const $voces = document.querySelector("#voces"),
    $boton = document.querySelector("#btnEscuchar"),
    $mensaje = document.querySelector("#mensaje");
   vocesDisponibles = [];

  // Si no existe la API, lo indicamos
  if (!'speechSynthesis' in window) return alert("Lo siento, tu navegador no soporta esta tecnología");

  // Si hay evento, entonces lo esperamos
 if ('onvoiceschanged' in speechSynthesis) {
    speechSynthesis.onvoiceschanged = function () {
    vocesDisponibles = speechSynthesis.getVoices();
    let textoAEscuchar = $mensaje.value;
    let mensaje = new SpeechSynthesisUtterance();
    mensaje.voice = vocesDisponibles[13];
    mensaje.volume = 1;
    mensaje.text = textoAEscuchar;
    mensaje.pitch = 1;
    speechSynthesis.speak(mensaje);
    };
   }

});
