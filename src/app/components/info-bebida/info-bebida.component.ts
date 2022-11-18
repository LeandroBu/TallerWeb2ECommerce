import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, share } from 'rxjs';
import { Bebida } from 'src/app/models/bebida';
import { ToastrService } from 'ngx-toastr';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-info-bebida',
  templateUrl: './info-bebida.component.html',
  styleUrls: ['./info-bebida.component.css']
})
export class InfoBebidaComponent implements OnInit {
  bebida: Bebida = {
    id: 0,
    nombre: '',
    img: '',
    descripcion: '',
    precio: '',
    clasificacion: '',
    cantidad: 0
  };

  Bebidas: any;
  id: any;
  constructor(
    protected router: Router,
    protected http: HttpClient,
    protected route: ActivatedRoute,
    private toastr: ToastrService,
    public carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    let res: Observable<Bebida[]> = this.http
      .get<Bebida[]>(`http://localhost:3000/bebidas/${this.id}`)
      .pipe(share());
    res.subscribe(
      (value) => {
        this.Bebidas = value;
        this.bebida = this.Bebidas;
      },
      (error) => {
        this.toastr.error('Ocurrió un error');
      }
    );
  }
  agregarCarrito(item: Bebida){
    this.carritoService.addToCart(item)
  }
}
