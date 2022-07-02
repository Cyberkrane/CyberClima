// Esperar a que el que DOM cargue
document.addEventListener("click", () => {
  const $voces = document.querySelector("#voces"),
    $boton = document.querySelector("#btnEscuchar"),
    $mensaje = document.querySelector("#mensaje");
   vocesDisponibles = [];

  // Función que pone las voces dentro del select
  const cargarVoces = () => {
    vocesDisponibles = speechSynthesis.getVoices();
  };

  // Si no existe la API, lo indicamos
  if (!'speechSynthesis' in window) return alert("Lo siento, tu navegador no soporta esta tecnología");

  // Si hay evento, entonces lo esperamos
  // if ('onvoiceschanged' in speechSynthesis) {
    // speechSynthesis.onvoiceschanged = function () {
    //   cargarVoces();
    // };
  // }

  // El click del botón. Aquí sucede la magia
  $boton.addEventListener("click", () => {
    let textoAEscuchar = $mensaje.value;
    let mensaje = new SpeechSynthesisUtterance();
    mensaje.voice = vocesDisponibles[13];
    mensaje.volume = 1;
    mensaje.text = textoAEscuchar;
    mensaje.pitch = 0.8;
    speechSynthesis.speak(mensaje);
  });
});