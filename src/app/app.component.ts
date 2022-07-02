import { Component } from '@angular/core';
import { ClimaService } from './services/clima.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cyberclima_version_1.6.0';

  clima: any;
  mi_ubicacion = localStorage.getItem('miUbicacion');
  nombre_de_la_ciudad: any = this.mi_ubicacion;
  hora: number = 12;
  

  constructor(private climaService: ClimaService) {}

  ngOnInit(): void {
    if (this.mi_ubicacion) {
      this.getClima(this.mi_ubicacion);
    }
    this.hora = new Date().getHours();
    console.log(this.hora)
  }

  getClima(nombre_de_la_ciudad: string) {
    this.climaService.getClima(nombre_de_la_ciudad).subscribe(
      (resp) => {
        this.clima = resp;
      },
      (err) => { console.log(err) }
    );
  }

  enviarUbicaion(nombre_de_la_ciudad: HTMLInputElement) {
    if (nombre_de_la_ciudad.value) {
      this.getClima(nombre_de_la_ciudad.value);
      localStorage.setItem('miUbicacion', nombre_de_la_ciudad.value);
      nombre_de_la_ciudad.value = '';
      
    } else {
      alert('por favor ingrese nombre de ciudad');
    }

    nombre_de_la_ciudad.focus();

    return false;
  }


// inicio enVozAlta() //
  enVozAlta() {
    console.log('hablando........');

    const boton = document.querySelector('#btnEscuchar');
    const $mensaje = document.querySelector('#mensaje')?.innerHTML;
    let vocesDisponibles = [];

    // Si hay evento, entonces lo esperamos
    if ('onvoiceschanged' in speechSynthesis) {
      speechSynthesis.onvoiceschanged = function () {
        vocesDisponibles = speechSynthesis.getVoices();
        let textoAEscuchar = $mensaje!;
        let mensaje = new SpeechSynthesisUtterance();
        mensaje.voice = vocesDisponibles[13];
        mensaje.volume = 1;
        mensaje.text = textoAEscuchar;
        mensaje.pitch = 1;
        speechSynthesis.speak(mensaje);
      };
    }
  }
  // fin //


  
}
