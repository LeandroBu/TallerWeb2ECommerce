import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, share } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
 //ATRIBUTOS
 public screen: string;
 public formRegistro: any;
 public formLogin: any;
 public formConfirmacion: any;
 public errors: any;
 public errorsLogin: any;
 public email: string;
 UserId: any;

 //CONSTRUCTOR
 constructor(
   protected router: Router,
   private formBuilder: FormBuilder,
   protected httpClient: HttpClient,
   private toastr: ToastrService
 ) {
   this.screen = 'login';
   this.formLogin = FormGroup;
   this.formRegistro = FormGroup;
   this.formConfirmacion = FormGroup;
   this.errors = {
     nombre: '',
     apellido: '',
     direccion: '',
     email: '',
     password: '',
     registro: '',
   };
   this.errorsLogin = {
     usuarioIncorrecto: '',
     usuarioNoConfirmado: '',
   };
   this.email = '';
 }

 //METODOS

 ngOnInit(): void {
   //CREACION DE FORMULARIO LOGIN
   this.formLogin = this.formBuilder.group({
     email: new FormControl('', [Validators.required, Validators.email]),
     password: new FormControl('', [
       Validators.required,
       Validators.minLength(6),
     ]),
   });

   //CREACION DE FORMULARIO REGISTRO
   this.formRegistro = this.formBuilder.group({
     nombre: new FormControl('', Validators.required),
     apellido: new FormControl('', Validators.required),
     direccion: new FormControl('', Validators.required),
     email: new FormControl('', [Validators.required, Validators.email]),
     password: new FormControl('', [
       Validators.minLength(8),
       Validators.required,
       Validators.pattern(
         '(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$ñ<>!%*?&]).{8,}'
       ),
     ]),
   });

   //CREACION DE FORMULARIO DE CONFIRMACION
   this.formConfirmacion = this.formBuilder.group({
     codigo: new FormControl('', [Validators.required]),
   });
 }

 changeScreen(screen: string, email?: string) {
   this.screen = screen;

   if (!!email) {
     this.email = email;
   } else {
     this.email = '';
   }
 }

 login(): any {
   const body = this.formLogin.value;

   let res: Observable<Response[]> = this.httpClient
     .post<Response[]>(`http://localhost:3000/api/login`, body)
     .pipe(share());

   res.subscribe(
     (value) => {
       localStorage.setItem('token', JSON.stringify(value)); //Resultado del login me da un token
       this.SetearUserId(); //Decodifico el token y obtengo el ID del usuario
       this.errorsLogin.usuarioIncorrecto = '';
       this.router.navigate(['/']).then(() => {
        
        //  window.location.reload(); 
         this.toastr.success('Se ha logueado exitosamente');
       }); //Se dirige al home y refresca
     },
     (error) => {
       //Si no devuelve el token, es que o el pass o user son incorrectos
       if (error.ok === false) {
         if (error.error.err.name === 'UserNotConfirmedException') {
           this.changeScreen('validar', this.formLogin.value.email);
           this.errorsLogin.usuarioIncorrecto = '';
         } else {
           this.errorsLogin.usuarioIncorrecto =
             'Usuario / Password incorrecto';
         }
       }
     }
   );
 }

 //IMPLEMENTA EL METODO DECODE EL CUAL ME CONVIERTE EL TOKEN AL ID DEL USUARIO
 SetearUserId() {
   let body = { token: localStorage.getItem('token') };

   let resp: Observable<Response[]> = this.httpClient
     .post<Response[]>(`http://localhost:3000/api/decode`, body)
     .pipe(share());

   resp.subscribe(
     (value) => {
       this.UserId = value;
       localStorage.setItem('IdUser', this.UserId); //seteo el id encodeado en LS
     },
     (error) => {
      //  alert('Ocurrió un error');
     }
   );
 }

 //VERIFICA EL CODIGO QUE LLEGA A EMAIL Y ACTIVA EL USUARIO PARA EL USO.
 verificar(): any {
   const codigo = this.formConfirmacion.value.codigo;
   const body = { codigo, email: this.email };

   let res: Observable<Response[]> = this.httpClient
     .post<Response[]>(`http://localhost:3000/api/verificar`, body)
     .pipe(share());

   res.subscribe(
     (value) => {
       this.errorsLogin.usuarioNoConfirmado = '';
      //  alert('Usuario confirmado');
      this.toastr.success('Usuario confirmado con éxito');
       this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
     },
     (error) => {
       this.errorsLogin.usuarioNoConfirmado = 'Código incorrecto';
     }
   );
 }

 //METODO REGISTRAR NUEVO USUARIO
 registrar(): any {
   if (
     this.formRegistro.controls.nombre.invalid === true ||
     this.formRegistro.controls.apellido.invalid === true ||
     this.formRegistro.controls.direccion.invalid === true ||
     this.formRegistro.controls.email.invalid === true ||
     this.formRegistro.controls.password.invalid === true
   ) {
     //Los campos son obligatorios y validados.
     this.formRegistro.controls.nombre.invalid === true
       ? (this.errors.nombre = 'El nombre es obligatorio')
       : (this.errors.nombre = '');

     this.formRegistro.controls.apellido.invalid === true
       ? (this.errors.apellido = 'El apellido es obligatorio')
       : (this.errors.apellido = '');

     this.formRegistro.controls.direccion.invalid === true
       ? (this.errors.direccion = 'La direccion es obligatoria')
       : (this.errors.direccion = '');

     this.formRegistro.controls.email.invalid === true
       ? (this.errors.email = 'Ingrese un email valido')
       : (this.errors.email = '');

     this.formRegistro.controls.password.invalid === true
       ? (this.errors.password =
           'La contraseña debe tener mínimo 8, caracteres una letra mayúscula, una minúscula, un número y un carácter especial')
       : (this.errors.password = '');
   } else {
     const body = this.formRegistro.value; //LUEGO DE VALIDAR ENVIA LOS DATOS AL BACK

     let res: Observable<Response[]> = this.httpClient
       .post<Response[]>(`http://localhost:3000/api/registrar`, body)
       .pipe(share());

     res.subscribe(
       //QUE FUNCION REALIZA?
       () => {
         alert('Registro exitoso');
         this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
       },
       () => {
        this.toastr.error('Error al registrar el usuario');
        //  alert('Error al registrar el usuario');
       }
     );

     this.errors.nombre = '';
     this.errors.apellido = '';
     this.errors.direccion = '';
     this.errors.email = '';
     this.errors.password = '';
   }
 }
}
