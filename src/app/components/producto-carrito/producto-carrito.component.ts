import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bebida } from 'src/app/models/bebida';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-producto-carrito',
  templateUrl: './producto-carrito.component.html',
  styleUrls: ['./producto-carrito.component.css']
})
export class ProductoCarritoComponent {
  @Input()
  bebida!: Bebida;
  
  constructor(
    protected router: Router,
    protected http: HttpClient,
    protected route: ActivatedRoute,
    private toastr: ToastrService,
    public carritoService: CarritoService
  ) {}

  ngOnInit(){console.log(this.bebida)}

  borrarProducto(bebida:Bebida){
    this.carritoService.deleteBebidas(bebida)
  }
}
