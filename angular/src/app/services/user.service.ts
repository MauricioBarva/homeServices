import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { User } from '../models/user';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {Service} from '../models/service';
import {Suggestion} from '../models/suggestion';

@Injectable()
export class UserService {
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url = Global.url;
    }

    saveUser(user: User): Observable<any>{
        var usuario = JSON.stringify(user);
        var headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'create-user',usuario,{headers:headers});
    }
    findUser(user,password): Observable<any>{
        var datos = {user:user,password:password}
        var params = JSON.stringify(datos);
        var headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'find-user',params,{headers:headers});
    }
    statusActive(id): Observable<any>{
        var headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'status-user-on/'+id,{headers:headers});
    }
    statusOff(id): Observable<any>{
        var headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'status-user-off/'+id,{headers:headers});
    }
    getUser(id): Observable<any>{
        var headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'find-user/'+id,{headers:headers});
    }
    createService(id:any, service:Service):Observable<any>{
        var params = JSON.stringify(service);
        var headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'create-service/'+id,params,{headers:headers});
    }
    getServices(id:any):Observable<any>{
        var headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'session-started/services/'+id,{headers:headers});
    }
    editService(id:any, address:any, description:any, skill:any, money:any, idService:any):Observable<any> {
        var datos = {
            id:idService,
            user_address: address,
            description_service: description,
            skill_type: skill,
            amount_money:money
        }
        var params = JSON.stringify(datos);
        var headers = new HttpHeaders().set('Content-Type', 'application/json');
    //Si lo de params no funciona lo que debo hacer es  {id:idService} o quitarle el stringify y pasarle datos directamente (PROBAR)
        return this._http.put(this.url + 'edit-service/' + id, params, { headers: headers });
    }

    getService(id:any):Observable<any>{
        var params = JSON.stringify(id);
        var headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'get-one-service',{id:id},{headers:headers});
    }
    deleteService(idUser, idService):Observable<any>{
        var headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'delete-service/'+idUser,{id:idService},{headers:headers});
    }

    editUser(user):Observable<any>{
        var params = JSON.stringify(user)
        var headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'update-user/'+user._id,params,{headers:headers});
       
    }

    saveSuggestion(suggestion:Suggestion):Observable<any>{
        var params = JSON.stringify(suggestion);
        var headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'send-suggestion',params,{headers:headers});
    }

    getSuggestions():Observable<any>{
        var headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url+'get-suggestions',{headers:headers});
    }
}