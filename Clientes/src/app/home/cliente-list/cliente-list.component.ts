import { HomeService } from './../shared/home.service';
import { Cliente } from './../shared/cliente.model';

import { Component, OnInit, Input } from '@angular/core';





@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[];


  constructor(private homeService: HomeService) { }

  ngOnInit() {
    // this.homeService.getClientes().subscribe(cli => this.clientes = cli) // Funcionando com o service padrao
    this.homeService.getClientes();
   // console.log(this.homeService)

  }
  editarCliente(cli:Cliente) {

    this.homeService.clienteSelecionado = Object.assign({}, cli);
   
  }
  deleteCliente(id) {
    if (confirm('Deseja realmente apagar este cliente ?') == true) {
      this.homeService.deleteCliente(id)
      .subscribe(x => {
        this.homeService.getClientes();        
      })
    }
  }
}
