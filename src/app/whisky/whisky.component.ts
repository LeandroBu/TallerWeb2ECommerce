import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whisky',
  templateUrl: './whisky.component.html',
  styleUrls: ['./whisky.component.css']
})
export class WhiskyComponent implements OnInit {

  whiskys  = [{
    nombre: 'Johnny Walker',
    precio: 54000,
    tipo: 'Blue Label',
    src: 'https://http2.mlstatic.com/D_NQ_NP_954217-MLA50596692485_072022-W.webp'
  },
  {
    nombre: 'Johnny Walker',
    precio: 17000,
    tipo: 'Black Label',
    src: 'https://http2.mlstatic.com/D_NQ_NP_802663-MLA47007060028_082021-W.webp'
  },
  {
    nombre: 'Johnny Walker',
    precio: 12000,
    tipo: 'Gold Label',
    src: 'https://http2.mlstatic.com/D_NQ_NP_704747-MLA44699198388_012021-W.webp'
  }];
  constructor() { }

  ngOnInit(): void {
  }

}
