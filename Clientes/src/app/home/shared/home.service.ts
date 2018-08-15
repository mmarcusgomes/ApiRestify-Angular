import { API } from '../../app.api';
import { Http } from '@angular/http';
import { Injectable } from '../../../../node_modules/@angular/core';
import { Cliente } from './cliente.model';

import { map } from 'rxjs/operators';

@Injectable()
export class HomeService {

    clienteSelecionado: Cliente;
    clienteList: Cliente[];

    constructor(private http: Http) { }

    getClientes() {
        return this.http.get(`${API}/cliente`).pipe(map(response => response.json())).subscribe(x => this.clienteList = x)

    }
    postClientes(cli: Cliente) {
        var body = JSON.stringify(cli);
        return this.http.post(`${API}/cliente`, body).pipe(map(x => x.json()));
    }

    putCliente(cli) {
        var body = JSON.stringify(cli);
        return this.http.put(`${API}/cliente`, body).pipe(map(x => x.json()));
    }
    deleteCliente(cpf) {
        return this.http.delete(`${API}/cliente/` + cpf).pipe(map(x => x.json()));
    }
} 