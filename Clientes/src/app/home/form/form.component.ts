import { HomeService } from './../shared/home.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Cliente } from '../shared/cliente.model';
import { EventEmitter } from '../../../../node_modules/protractor';




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
 


  constructor(private homeService: HomeService) {

  }


  ngOnInit() {
    this.resetForm();


  }
 

  telefonesArray(tel) {
    this.telefones.push(tel)
    console.log(this.telefones)
    console.log('array tel')

  }

  

  /*onSubmit(form) {
    this.homeService.clienteSelecionado.telefone = this.telefones
    console.log(this.homeService.clienteSelecionado)
    
  }*/

  onSubmit(form: NgForm) {
    this.homeService.clienteSelecionado.telefone = this.telefones

    console.log(this.homeService.clienteSelecionado)
    if (this.homeService.clienteSelecionado.telefone != null) {


      if (form.value.id == null) {
  
        this.homeService.postClientes(this.homeService.clienteSelecionado)
          .subscribe(dados => {
            this.resetForm(form);
          })
      } else {
  
        this.homeService.putCliente(this.homeService.clienteSelecionado)
          .subscribe(dados => {
            this.resetForm(form);
          })
  
  
      }
      this.homeService.getClientes();
    } else {
      alert("Vincule um numero de telefone ao cliente")
    }
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.homeService.clienteSelecionado = {
      nome: '',
      cpf: null,
      telefone: null,
      email: '',
      situacao: null

    }
  }


}
