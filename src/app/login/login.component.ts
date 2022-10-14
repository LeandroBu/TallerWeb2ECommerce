import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({
    usuario: new FormControl('prueba', [Validators.required]),
    contrasena: new FormControl('1234', [Validators.required]),
  });
  constructor() { }

  ngOnInit(): void {
  }

}
