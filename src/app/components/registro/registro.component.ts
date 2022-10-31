import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  mensajeCrearCuenta: string;
  formRegistro!: FormGroup;
  nombre!: String;
  apellido!: String;
  direccion!: String;
  email!: String;
  password!: String;
  constructor(private builder: FormBuilder, private router:Router, private servicioCognito: CognitoService){
    this.mensajeCrearCuenta = '';
  }  

  ngOnInit(): void {
    this.formRegistro = this.builder.group({
      nombre: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
      apellido: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]),
      direccion: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z0-9\s]+$/g)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).*$/)]),
    });
  }

    crearcuenta(Nombre: string, Apellido:string, Email:string, Password: string, Direccion: string){
      this.servicioCognito.registrar(Nombre, Apellido, Email, Password, Direccion).subscribe(data=> {

        console.log(data);

      }, error => { 
        console.log(error);
        this.formRegistro.reset(); //resetea el formulario
      
      })
    }
     
     onSubmit() {
       var Nombre =(this.formRegistro.get('nombre')?.value);
       var Apellido=(this.formRegistro.get('apellido')?.value);
       var Email=(this.formRegistro.get('email')?.value);
       var Direccion=(this.formRegistro.get('direccion')?.value);      
       var Password=(this.formRegistro.get('password')?.value);

        if (Nombre != '' && Apellido != '' && Email != '' && Direccion != '' && Password != '' ){
          this.crearcuenta(Nombre, Apellido, Email, Password, Direccion); 
        
          window.alert(Nombre + " " + "Se ha creado su cuenta, verifiquela");
          this.router.navigate(['/verificar'])    
        }else{
          window.alert("Verifique los campos");
        }
      }

  }

