import { ErrorHandler } from '../../app.error-handler';
import { API } from '../../app.api';
import { Http, RequestOptions,RequestMethod } from '@angular/http';
import { Injectable } from '../../../../node_modules/@angular/core';
import { Observable, pipe } from '../../../../node_modules/rxjs';
import { Cliente } from './cliente.model';

import { map, filter, mergeMap } from 'rxjs/operators';
@Injectable()
export class HomeService {

    clienteSelecionado: Cliente;
    clienteList: Cliente[];

    constructor(private http: Http) { }

    getClientes() {
        /* return this.http.get(`${API}/clientes`).pipe(map(response => response.json())).toPromise().then(x => {
             this.clienteList = x;
             console.log(this.clienteList)
            /*retorna o array certinho */
        /* });*/
        return this.http.get(`${API}/cliente`).pipe(map(response => response.json())).subscribe(x => this.clienteList = x)
        //console.log(this.clienteList)
    }


    /* Padrao funcionando*/
    /*getClientes(): Observable<Cliente[]> {
        return this.http.get(`${API}/clientes`).pipe(map(response => response.json()));
        console.log(Response)
    }*/

    postClientes(cli: Cliente) { // Salvar user

        var body = JSON.stringify(cli);
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
        //var requestOptions = new RequestOptions( {method: RequestMethod.Post, headers: headerOptions });
        console.log(body)
        return this.http.post(`${API}/cliente`, body).pipe(map(x => x.json()));
    }

    putCliente(id, cli) {
        var body = JSON.stringify(cli);
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });        
        //var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
console.log(cli)
        return this.http.put(`${API}/cliente/` + id, body).pipe(map(x => x.json()));
    }
    deleteCliente(id) {
        return this.http.delete(`${API}/cliente`+ id).pipe(map(x => x.json()));
    }


} 