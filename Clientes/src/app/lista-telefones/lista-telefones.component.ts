import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lista-telefones',
  templateUrl: './lista-telefones.component.html',
  styleUrls: ['./lista-telefones.component.css']
})
export class ListaTelefonesComponent implements OnInit {

  constructor() { }

  @Input()  telefones: number[] = []
  ngOnInit() {
    console.log(this.telefones)
  }

}
