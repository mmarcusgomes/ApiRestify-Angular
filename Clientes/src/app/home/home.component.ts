import { Component, OnInit } from '@angular/core';

import { Cliente } from './shared/cliente.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  

  constructor() { }

  ngOnInit() {
    //this.appService.cliente().subscribe(cliente =>this.clientes=cliente)
  }
 

}
