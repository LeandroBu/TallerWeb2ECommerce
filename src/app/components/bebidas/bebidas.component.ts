import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, share } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Bebida } from '../../models/bebida';

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.css']
})
export class BebidasComponent implements OnInit {
  bebidas: Bebida[] = [];
  Bebida: any;

  constructor(protected router: Router, 
    protected httpClient: HttpClient,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    let res: Observable<Bebida[]> = this.httpClient
      .get<Bebida[]>('http://localhost:3000/bebidas')
      .pipe(share());

    res.subscribe(
      (value) => {
        this.Bebida = value;
        this.bebidas = this.Bebida.bebidas;
      },
      (error) => {
        this.toastr.error('Ocurrió un error');
      }
    );
  }

  // bebidas  = [{
  //   nombre: 'Jack Daniels',
  //   precio: 8500,
  //   tipo: 'Whisky',
  //   src: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/001/211/660/products/jack-daniels-old-071-1e1cb312375b325f5716063985425824-640-0.jpg'
  // },
  // {
  //   nombre: 'Bombay',
  //   precio: 5000,
  //   tipo: 'Gin',
  //   src: 'https://images.shopdutyfree.com/image/upload/v1531471894/020/003/001/5010296113310/5010296113310_1_default_default.jpg'
  // },
  // {
  //   nombre: 'Chandon Extra Brut',
  //   precio: 2000,
  //   tipo: 'Champagne',
  //   src: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/001/211/660/products/botellon-chandon1-57b75d0e70b35fd6c316421838767245-640-0.png'
  // }];
  // constructor() { }

  // ngOnInit(): void {
  // }

}
