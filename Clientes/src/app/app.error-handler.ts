import {Response} from '@angular/http'
import { Observable } from 'rxjs';




export class ErrorHandler{
	static handleError(error: Response | any){
		let errorMessage:string
		//se o erro for de response
		if(error instanceof Response){
			errorMessage=`Erro ${error.status} ao acessar  URL ${error.url}- ${error.statusText}`
		}else{
			errorMessage=error.toString()
		}
		console.log(errorMessage)
		//throw quem tenta ler o observable vai receber essa mensagem
		return Observable.throw(errorMessage)
	}
}