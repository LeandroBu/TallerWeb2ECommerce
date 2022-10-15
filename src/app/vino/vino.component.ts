import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vino',
  templateUrl: './vino.component.html',
  styleUrls: ['./vino.component.css']
})
export class VinoComponent implements OnInit {

  vinos  = [{
    nombre: 'Rutini',
    precio: 8500,
    tipo: 'Malber',
    src: 'https://http2.mlstatic.com/D_NQ_NP_808289-MLA50019891358_052022-W.webp'
  },
  {
    nombre: 'Luigi Bosca',
    precio: 5000,
    tipo: 'Malbec',
    src: 'https://http2.mlstatic.com/D_NQ_NP_923118-MLA43950731882_102020-W.webp'
  },
  {
    nombre: 'La Linda',
    precio: 2000,
    tipo: 'Malbec',
    src: 'https://http2.mlstatic.com/D_NQ_NP_616582-MLA49421585610_032022-W.webp'
  }];
  constructor() { }

  ngOnInit(): void {
  }

}
