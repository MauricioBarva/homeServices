import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute,Params} from '@angular/router';
import {WorkerService} from '../../services/worker.service';

@Component({
  selector: 'app-worker-login',
  templateUrl: './worker-login.component.html',
  styleUrls: ['./worker-login.component.css'],
  providers:[WorkerService]
})
export class WorkerLoginComponent implements OnInit {
  public title:string;
  public error:string;
  constructor(
    private _workerService:WorkerService,
    private _route:ActivatedRoute,
    private _router:Router
  ) {  
     this.title='Bienvenido Trabajador'
    }

  ngOnInit() {
  }
  comprobar(user,password){
    this._workerService.findWorker(user,password).subscribe(
      res=>{
        if(res.user){
         this._workerService.statusActiveWorker(res.user._id).subscribe(
           result =>{
            this._router.navigate(['worker-started/'+result.worker._id]);
           },
           error =>{
             console.log(<any>error);
           }
         )
           
        }
       
       
      },
      error =>{
        console.log(<any>error);
        this.error='true';
      }
    );



  }
}
