import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, share } from 'rxjs';
import { Bebida } from 'src/app/models/bebida';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  buscador: boolean = false;
  formBusqueda: FormGroup;
  peliculaBuscada: string = '';
  tipoDeUsuario: any; //va a guardar el UserId y va a evaluar si es admin o no, y si no esta logueado
  bebidas: Bebida[] = [];
  Bebidas: any;

  //CONSTRUCTOR
  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    protected httpClient: HttpClient,
    private toastr: ToastrService
  ) {
    this.formBusqueda = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
    });
  }

  //METODOS
  ngOnInit(): void {
    //CARGO LAS BEBIDAS PARA HACER LA BUSQUEDA CON EL BUSCAR.
    let res: Observable<Bebida[]> = this.httpClient
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

    //VALIDACION DE USUARIO LOGUEADO O DESLOGUEADO PARA RENDERIZAR EL NAV
    if (localStorage.getItem('IdUser') != null) {
      this.tipoDeUsuario = 'Comun';
      console.log(this.tipoDeUsuario);
    }
    if (
      localStorage.getItem('IdUser') === '9b2e856e-7478-40ac-b9dc-99d0facd92ee'
    ) {
      this.tipoDeUsuario = 'Admin';
      console.log(this.tipoDeUsuario);
    }
    if (localStorage.getItem('IdUser') == null) {
      this.tipoDeUsuario = null;
      console.log(this.tipoDeUsuario);
    }
  }

  //EL METODO BUSCAR ME TRAE LA BEBIDA QUE LE INDICO SI EXISTE.
  mostrarBusqueda() {
    this.bebidas.forEach((bebidas) => {
      if (
        bebidas.nombre
          .toLowerCase()
          .includes(this.formBusqueda.controls['nombre'].value.toLowerCase())
      ) {
        this.router.navigate(['/info/' + bebidas.id]);
      }
    });
  }

  //CIERRA SESION, LIMPIA EL LOCALSTORAGE.
  logout() {
    localStorage.clear();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

}
