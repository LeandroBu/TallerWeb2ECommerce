import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  
  email!: any;
  password!: any;
  mensajeLogin!: string;
  isLogged!: Boolean;
  authToken!: any;
  error!: Boolean;

  constructor( protected router: Router,private servicioCognito: CognitoService, private builder: FormBuilder) { }

ngOnInit(): void {
  this.formLogin = this.builder.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    //recordardatos: new FormControl(false, Validators.required),
  });
}

onClick() {
  this.email = this.formLogin.get('email')?.value;
  this.password = this.formLogin.get('password')?.value;
 // this.recordardatos = this.iniciarSesionForm.get('recordardatos')?.value;
  if (this.email != '' && this.password != '') {
    const usuarioDto = {
      email: this.email,
      password: this.password,
    };
    this.servicioCognito.login(this.email, this.password).subscribe(
   // this.apiService.post('/login-usuario', usuarioDto).subscribe(
      (respuesta) => {
        if (respuesta !== null && respuesta !== undefined) {
          alert("Ha iniciado sesion correctamente");
          this.error = false;
          this.router.navigate(['/']);
          

          
        }
      },
      (err) => {
        500;
        this.error = true;
        if (err.error.code != 'UserNotConfirmedException') {
          window.alert("Usuario no confirmado");
        }   else {
          window.alert(err.error.message);
        }        
        //this.mensajeLogin = err.error.message;
        //window.alert(err.error.message);
      }
    );
  } else {
    alert('los campos usuario o password no pueden estar vacios');
  }
}

registrar(){
  this.router.navigate(['/registrar'])
}
}
