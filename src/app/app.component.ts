import { Component } from '@angular/core';
import { ClimaService } from './services/clima.service';

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
  formulario: any = document.getElementById('form');

  constructor(private climaService: ClimaService) {}

  ngOnInit(): void {

    if (this.mi_ubicacion) {
      this.getClima(this.mi_ubicacion);
      {
        this.climaService.getClima(this.mi_ubicacion).subscribe(
          (resp) => {
            (this.clima = resp), console.log(this.clima);
          },
          (err) => console.log(err)
        );
      }
  
    } 
  }

  getClima(nombre_de_la_ciudad: string) {
    this.climaService.getClima(nombre_de_la_ciudad).subscribe(
      (resp) => {
        (this.clima = resp), console.log(this.clima);
      },
      (err) => console.log(err)
    );
  }

  enviarUbicaion(nombre_de_la_ciudad: HTMLInputElement) {
    if (nombre_de_la_ciudad.value) {
      this.getClima(nombre_de_la_ciudad.value);

      nombre_de_la_ciudad.value = '';
    } else {
      alert('por favor ingrese nombre de ciudad y pais');
    }

    nombre_de_la_ciudad.focus();

    return false;
  }

  miUbicaion(nombre_de_la_ciudad: HTMLInputElement) {
    if (nombre_de_la_ciudad.value) {
      this.getClima(nombre_de_la_ciudad.value);

      localStorage.setItem('miUbicacion', nombre_de_la_ciudad.value);
      nombre_de_la_ciudad.value = '';
    } else {
      alert('por favor ingrese nombre de ciudad y pais');
    }

    nombre_de_la_ciudad.focus();

    return false;
  }
}
