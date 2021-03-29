import { Component, OnInit } from '@angular/core';
import {Worker} from '../../models/worker';
import {WorkerService} from '../../services/worker.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-worker-started-session',
  templateUrl: './worker-started-session.component.html',
  styleUrls: ['./worker-started-session.component.css'],
  providers:[WorkerService]
})
export class WorkerStartedSessionComponent implements OnInit {
  public worker:Worker
  constructor(
    private _workerService:WorkerService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params=>{
      let id = params.id;
      this.getWorker(id);
    })
  }
 getWorker(id){
   this._workerService.findWorkerById(id).subscribe(
     result =>{
      if(result){
        this.worker = result.worker;
      }
     },
     error =>{
       this._router.navigate(['/**']);
       console.log(<any>error)
     }
   );
 }
}
