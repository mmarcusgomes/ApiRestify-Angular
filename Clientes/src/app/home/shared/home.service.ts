import { ErrorHandler } from '../../app.error-handler';
import { API } from '../../app.api';
import { Http, RequestMethod, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';
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
        return this.http.get(`${API}/cliente`).pipe(map(response => response.json())).subscribe(x => this.clienteList = x)
    }


    postClientes(cli: Cliente) {
        var body = JSON.stringify(cli);
         /*let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });*/
        console.log(body)
        console.log('chegou ao POST')
        return this.http.post(`${API}/cliente`, body).pipe(map(x => x.json()));
    }

    putCliente(cli) {
        var body = JSON.stringify(cli);       
        /*let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });*/ 
        console.log(body)  
        console.log('chegou ao PUT')
        return this.http.put(`${API}/cliente` , body).pipe(map(x => x.json()));
    }
    deleteCliente(id) {
        console.log(id)
        return this.http.delete(`${API}/cliente/` + id).pipe(map(x => x.json()));
    }


} 