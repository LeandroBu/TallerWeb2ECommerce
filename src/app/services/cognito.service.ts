import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor(private http: HttpClient) {
  }

    registrar(nombre: string, apellido: string, email:string, password:string, direccion: string) {
      return this.http.post('http://localhost:3000/api/registrar',{nombre, apellido ,email, password, direccion},{observe:'response'}) ;
    }

    login(email:string, password:string) {
      return this.http.post('http://localhost:3000/api/login',{email, password},{observe:'response'}) ;
    }

    verificar(codigo: string, email: string){
      return this.http.post('http://localhost:3000/api/verificar',{codigo, email}, {observe: 'response'});
    }

}
