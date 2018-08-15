import { HomeService } from './../shared/home.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  telefones: number[] = []

  options = [
    { name: "Ativo", value: 1 },
    { name: "Inativo", value: 0 }
  ]
  constructor(private homeService: HomeService) { }
  ngOnInit() {
    this.resetForm();
  }

  telefonesArray(tel) {
    this.telefones.push(tel)/*cria array de telefones para que depois possam ser adicionados o cliente e ao banco */
    this.homeService.clienteSelecionado.numtelefone =null
  }

  onSubmit(form: NgForm) {
    this.homeService.clienteSelecionado.numtelefone = this.telefones
    if (this.homeService.clienteSelecionado.numtelefone != null) {
      if (form.value.id == null) {
        this.homeService.postClientes(this.homeService.clienteSelecionado)
          .subscribe(() => {
            this.resetForm(form);             //reseta formulario                   
            this.homeService.getClientes();   //atualiza a lista de clientes
          })
      } else {
        this.homeService.putCliente(this.homeService.clienteSelecionado)
          .subscribe(() => {
            this.resetForm(form);             //reseta formulario                        
            this.homeService.getClientes();   //atualiza a lista de clientes
          })
      }
      this.homeService.getClientes();
    } else {
      alert("Vincule um numero de telefone ao cliente")
    }
    
    this.telefones=[]  //reseta o array
  }
  

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.homeService.clienteSelecionado = {
      nome: '',
      cpf: null,
      numtelefone: null,
      email: '',
      situacao: null
    }
  }
}
