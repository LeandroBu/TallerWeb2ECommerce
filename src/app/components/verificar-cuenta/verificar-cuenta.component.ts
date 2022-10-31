import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, share } from 'rxjs';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-verificar-cuenta',
  templateUrl: './verificar-cuenta.component.html',
  styleUrls: ['./verificar-cuenta.component.css']
})
export class VerificarCuentaComponent implements OnInit {

  formVerificacion!: FormGroup;
  email!: any;
  codigo!: any;

  constructor(private http: HttpClient, private builder: FormBuilder, private servicioCognito: CognitoService, private router: Router) { }

  ngOnInit(): void {
    this.formVerificacion = this.builder.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      codigo: new FormControl('', Validators.required)
    });
  }

  verificar(codigo: string, email: string){
    this.servicioCognito.verificar(codigo, email).subscribe( data => {
      console.log(data);
      this.router.navigate(['/login']);
    },
    error => { 
      console.log(error);
      this.formVerificacion.reset(); //resetea el formulario
    
    })
  }
    // const body = { codigo: this.codigo, email: this.email };

    // let res: Observable<Response[]> = this.http
    //   .post<Response[]>(`http://localhost:3000/api/verificar`, body)
    //   .pipe(share());

    // res.subscribe(
    //   (value) => {
    //     alert('Usuario confirmado');
        
    //   },
    //   (error) => {
    //     alert('Código incorrecto');
    //   }
    // );
  
    onSubmit() {
      var email =(this.formVerificacion.get('email')?.value);
      var codigo=(this.formVerificacion.get('codigo')?.value);

       if (email != '' && codigo != '' ){
         this.verificar(codigo, email); 
       
         window.alert(email + " " + "Se ha confirmado su cuenta");
         this.router.navigate(['/login'])    
       }else{
         window.alert("Verifique los campos");
       }
     }
}
