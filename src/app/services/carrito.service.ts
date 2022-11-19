import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bebida } from '../models/bebida';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  bebidas: Bebida[] = [];

  cantidad: number = 0;

  constructor(private http: HttpClient) {
    this.cantidad = 1;
   }

   addToCart(item: Bebida){
    let bebidas = [];

    if(localStorage.getItem('bebidas')){
      bebidas = JSON.parse(localStorage.getItem('bebidas') || '');
    }
    let index = bebidas.findIndex((b: any) => b.id === item.id);
    if(index === -1){
      bebidas.push(item);
      localStorage.setItem('bebidas',JSON.stringify(bebidas));
    } else{
      bebidas.splice(index,1);
      bebidas.push(item);
      localStorage.setItem('bebidas', JSON.stringify(bebidas))
    }
    if(item.cantidad === 0){
      bebidas.splice(index,1);
      localStorage.setItem('bebidas',JSON.stringify(bebidas))
    }

    // window.location.href = '/carrito';
   }

   getBebidas(){
    if (localStorage.getItem('bebidas') === null) {
      this.bebidas = [];
      this.cantidad = this.bebidas.length;
    } else {
      this.bebidas = JSON.parse(localStorage.getItem('bebidas') || '');
      this.cantidad = this.bebidas.length;
    }
    return this.bebidas;
   }

   deleteBebidas(bebida:Bebida){
    for (let i = 0; i < this.bebidas.length; i++) {
      if (bebida.id == this.bebidas[i].id) {
        this.bebidas.splice(i, 1);
        localStorage.setItem('bebidas', JSON.stringify(this.bebidas));
        window.location.href = '/carrito';
      }
    }
   }
}
