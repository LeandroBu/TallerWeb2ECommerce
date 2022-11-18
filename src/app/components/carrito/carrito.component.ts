import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bebida } from 'src/app/models/bebida';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  bebidas: Bebida[] = []
  
  constructor(
    protected router: Router,
    protected http: HttpClient,
    protected route: ActivatedRoute,
    private toastr: ToastrService,
    public carritoService: CarritoService
  ) {}

  ngOnInit(){
    this.bebidas = this.carritoService.getBebidas()
    console.log(this.bebidas)
  }
}
