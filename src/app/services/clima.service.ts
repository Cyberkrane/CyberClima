import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClimaService {
  apiKey: string = 'ad4ea803fef9fc30a55a98365239c1f9';
  URI: string = '';
  nombreDeCiudad: string = '';

  constructor(private http: HttpClient) {
    this.URI = `https://api.openweathermap.org/data/2.5/weather?&appid=${this.apiKey}&units=metric&lang=sp&q=`;
  }
/**
 * 
 * @param {String} nombreDeCiudad 
 * @returns ClimaService.http
 */
  getClima(nombreDeCiudad: string) {
    return this.http.get(`${this.URI}${nombreDeCiudad}`);
  }

}
