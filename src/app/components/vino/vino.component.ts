import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, share } from 'rxjs';
import { Bebida } from 'src/app/models/bebida';

@Component({
  selector: 'app-vino',
  templateUrl: './vino.component.html',
  styleUrls: ['./vino.component.css']
})
export class VinoComponent implements OnInit {
  bebidas: Bebida[] = [];
  Bebida: any;

  constructor(protected router: Router, 
    protected http: HttpClient,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    let res: Observable<Bebida[]> = this.http
      .get<Bebida[]>('http://localhost:3000/bebidas')
      .pipe(share());

    res.subscribe(
      (value) => {
        this.Bebida = value;
        this.bebidas = this.Bebida.bebidas;
      },
      (error) => {
        this.toastr.error('Ocurrió un error');
      }
    );
  }

}
