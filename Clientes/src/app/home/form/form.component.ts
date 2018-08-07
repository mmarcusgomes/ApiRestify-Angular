import { HomeService } from './../shared/home.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Cliente } from '../shared/cliente.model';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  input: any[] = [];
  constructor(private homeService: HomeService) { }


  ngOnInit() {
    this.resetForm();
  }
  addInput() {
    this.input.push({});
  }

  onSubmit(form: NgForm) {
    if(form.value.id ==null){
      console.log(form.value)
     this.homeService.postClientes(form.value)
     .subscribe(dados=>{
       this.resetForm(form);
     })
    }else{
      
      this.homeService.putCliente(form.value)
     .subscribe(dados=>{
       this.resetForm(form);
     })
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
      situacao: false

    }
  }


}
