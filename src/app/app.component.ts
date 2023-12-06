import { Component } from '@angular/core';
import { ClimaService } from './services/clima.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
// import { pipe } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
  }

  getClima(nombre_de_la_ciudad: string) {
    this.climaService.getClima(nombre_de_la_ciudad).pipe(
      catchError((error) => {
        console.error('Error en la solicitud de clima:', error);

        return of(null);
      })
    ).subscribe(
      (resp) => {
        this.clima = resp;
        console.log(resp);
      }
    )
  }

  enviarUbicacion(nombre_de_la_ciudad: HTMLInputElement) {
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

  enVozAlta() {

    let vocesDisponibles = [];

    // Si hay evento, entonces lo esperamos
    if ('onvoiceschanged' in speechSynthesis) {
       const $mensaje = document.querySelector('#mensaje')?.innerHTML;
      speechSynthesis.onvoiceschanged = function () {
        vocesDisponibles = speechSynthesis.getVoices();
        console.log(vocesDisponibles);
        let textoAEscuchar = $mensaje!;
        let mensaje = new SpeechSynthesisUtterance();
        mensaje.voice = vocesDisponibles[1];
        mensaje.volume = 1;
        mensaje.text = textoAEscuchar;
        mensaje.pitch = 1;
        speechSynthesis.speak(mensaje);
      };
    }
  }
}
