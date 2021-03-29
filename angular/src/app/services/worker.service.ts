import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Global } from './global';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Worker} from '../models/worker';

@Injectable()
export class WorkerService{

    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url = Global.url;
    }

    saveWorker(worker:Worker):Observable <any>{
        var params = JSON.stringify(worker);    
        var headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'save-worker',params,{headers:headers});
    }
    findWorker(user,password):Observable <any>{
        var headers = new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url+'find-worker',{user:user,password:password},{headers:headers});
    }
    statusActiveWorker(id): Observable<any>{
        var headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'status-worker-on/'+id,{headers:headers});
    }
    findWorkerById(id):Observable<any>{
        var headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'get-worker/'+id,{headers:headers});
    }
}
