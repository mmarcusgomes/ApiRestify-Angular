import { HomeService } from './../shared/home.service';
import { Cliente } from './../shared/cliente.model';

import { Component, OnInit, Input } from '@angular/core';





@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  


  constructor(private homeService: HomeService) { }

  ngOnInit() {
    // this.homeService.getClientes().subscribe(cli => this.clientes = cli) // Funcionando com o service padrao
    this.homeService.getClientes();
   
    

  }
  editarCliente(cli:Cliente) {

    this.homeService.clienteSelecionado = Object.assign({}, cli);
   
  }
  deleteCliente(cli) {
    if (confirm('Deseja realmente apagar este cliente ?') == true) {
     // console.log(cli)
      
      this.homeService.deleteCliente(cli.cpf)
      .subscribe(x => {
        this.homeService.getClientes();        
      })
    }
  }
}
