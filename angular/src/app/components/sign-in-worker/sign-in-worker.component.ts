import { Component, OnInit } from '@angular/core';
import {WorkerService} from '../../services/worker.service';
import {Worker} from '../../models/worker';

declare let $:any;
@Component({
  selector: 'app-sign-in-worker',
  templateUrl: './sign-in-worker.component.html',
  styleUrls: ['./sign-in-worker.component.css'],
  providers:[WorkerService]
})
export class SignInWorkerComponent implements OnInit {
  public worker:Worker;
  public title:String;
  public password2:any;
  public status:string;
  public workerCreated:string;
  constructor(
    private _workerSevice:WorkerService
  ) {
    this.title='Registro trabajadores'
    this.worker = new Worker(null,null,null,null,null,null,null,false);
    this.password2 ={
      password:String
    }
   }

  ngOnInit() {
  }
  comprobar(pass1,pass2){
    if(pass1 == pass2){
      this.status='true';
      $('input[name="password"').removeClass('requerido');
      $('input[name="password2"').removeClass('requerido');
    }else{
      $('input[name="password"').addClass('requerido');
      $('input[name="password2"').addClass('requerido');
      this.status = 'false';
      return false;
    }
   }

   saveWorker(form){
     this._workerSevice.saveWorker(this.worker).subscribe(
       res =>{
        if(res.worker){

          form.reset();
          this.workerCreated='true';
      
        }
       },
       error =>{
         console.log(<any>error);
       }
     );
   }
}
