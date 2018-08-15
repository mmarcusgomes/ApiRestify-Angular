
import { HomeService } from './../shared/home.service';
import { Cliente } from './../shared/cliente.model';

import { Component, OnInit } from '@angular/core';





@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getClientes();
  }

  editarCliente(cli: Cliente) {
    this.homeService.clienteSelecionado = Object.assign({}, cli);    
    
  }
  deleteCliente(cli) {
    if (confirm('Deseja realmente apagar este cliente ?') == true) {

      this.homeService.deleteCliente(cli.cpf)
        .subscribe(x => {
          this.homeService.getClientes();
        })
    }
  }
}
