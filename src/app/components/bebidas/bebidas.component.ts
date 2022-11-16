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
    protected http: HttpClient,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    let res: Observable<Bebida[]> = this.http
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
}
