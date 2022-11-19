import { HttpClient } from '@angular/common/http';
import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bebida } from 'src/app/models/bebida';
import { CarritoService } from 'src/app/services/carrito.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit, DoCheck{
  bebidas: Bebida[] = []
  isLogged!: Boolean;
  constructor(
    protected router: Router,
    protected http: HttpClient,
    protected route: ActivatedRoute,
    private toastr: ToastrService,
    public carritoService: CarritoService,
    private cookieService: CookieService
  ) {}

  ngOnInit(){
    this.bebidas = this.carritoService.getBebidas()
  }

  ngDoCheck(): void {
    this.isLogged = this.cookieService.check("token")
  }

  comprar(){
    if(this.bebidas.length > 0){
      this.toastr.success("Su compra ha sido éxitosa");   
      this.router.navigate(["/"])
    }
    else{
    this.toastr.error("El carrito está vacío")
    }
  }

  borrarProducto(bebida:Bebida){
    this.carritoService.deleteBebidas(bebida);
  }
}
