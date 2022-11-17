import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, share } from 'rxjs';
import { Bebida } from 'src/app/models/bebida';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  buscador: boolean = false;
  formBusqueda: FormGroup;
  peliculaBuscada: string = '';
  bebidas: Bebida[] = [];
  Bebidas: any;
  isLogged!: Boolean;

  //CONSTRUCTOR
  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    protected http: HttpClient,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {
    this.formBusqueda = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
    });
  }

  //METODOS
  ngOnInit(): void {
    //CARGO LAS BEBIDAS PARA HACER LA BUSQUEDA CON EL BUSCAR.
    let res: Observable<Bebida[]> = this.http
      .get<Bebida[]>(`http://localhost:3000/bebidas`)
      .pipe(share());

    res.subscribe(
      (value) => {
        this.Bebidas = value;
        this.bebidas = this.Bebidas.bebidas;
      },
      (error) => {
        this.toastr.error('Ocurrió un error');
      }
    );
  }

  ngDoCheck(): void {
    this.isLogged = this.cookieService.check("token")
  }

  cerrarSesion(){
    this.cookieService.delete("token");
    this.toastr.success("Ha cerrado sesión");
    this.router.navigate(["/"])
    
  }

}
