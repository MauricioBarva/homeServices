import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Service } from '../../models/service';
import {Suggestion} from '../../models/suggestion';
import {Global} from  '../../services/global';
declare let $:any;

@Component({
  selector: 'app-historial-servicios',
  templateUrl: './historial-servicios.component.html',
  styleUrls: ['./historial-servicios.component.css'],
  providers:[UserService]
})
export class HistorialServiciosComponent implements OnInit {
  public users:[User];
  public user: User;
  public id:any;
  public idService:any;
  public idServiceToDelete:any;
  public service:Service;
  
  public suggestion:Suggestion;
  public suggestionState:boolean;
  public url:string;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService
    
  ) {
    this.service = new Service(null,null,null,null);
    this.url =Global.url;
    this.suggestion = new Suggestion(null,null,null,null);
    this.suggestionState = false;
    }

  ngOnInit() {
    this._route.params.subscribe(params=>{
      this.id = params.id;
      this.getServices(this.id);
      this.getUser(this.id);
    });

    
  }

  getServices(id:any){
    this._userService.getServices(id).subscribe(
      res =>{
        this.users = res;
      },
      error =>{
        console.log(<any>error);
      }
    );
  }
  getUser(id){
    this._userService.getUser(id).subscribe(
      res=>{
       if(res.user){
        this.user=res.user;
       }
        
      },
      error =>{
        this._router.navigate(['/**']);
        console.log(<any>error);
      }
    );
  }
 
  cambio(){
    var select = $('#habilidades option:selected').text();
    if(select == 'Carpinteria'){
      this.service.amount_money=50000;
    }else if (select == 'Pasear perro'){
      this.service.amount_money=30000;
    }else if (select == 'Aseo hogar'){
      this.service.amount_money=60000;
    }else if( select == 'Electricista'){
      this.service.amount_money = 90000;
    }else if(select == 'Plomero'){
      this.service.amount_money = 70000;
    }else if(select == 'Tecnico de televisores'){
      this.service.amount_money = 120000;
    }else if( select == 'Fumigador de animales'){
      this.service.amount_money = 100000;
    }
    
  }
  editarServicio(id){
    this._userService.getService(id).subscribe(
      res=>{
        this.idService = res.service._id;
        this.service.user_address = res.service.user_address;
        this.service.description_service = res.service.description_service;
        this.service.skill_type = res.service.skill_type;
        this.service.amount_money = res.service.amount_money;
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
  saveService(){
    this._userService.editService(this.id,this.service.user_address,this.service.description_service,this.service.skill_type,this.service.amount_money,this.idService).subscribe(
      result =>{
        setTimeout(() => {  
        location.reload();
        }, 100);
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  borrarServicio(idServicio){
    this.idServiceToDelete=idServicio;
  }
  confirmacion(){
    this._userService.deleteService(this.id,this.idServiceToDelete).subscribe(
      res=>{
        setTimeout(() => {  
          location.reload();
          }, 100);
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
  sendSuggestion(formulario){
    this.suggestion.name = this.user.name;
    this.suggestion.surname =this.user.surname;
    this._userService.saveSuggestion(this.suggestion).subscribe(
      res=>{
       if(res.suggestion){
         formulario.reset();
         this.suggestionState=true;
         setTimeout(() => {
           this.suggestionState=false;
         }, 5000);
       }
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
  
  signOff(){
    this._userService.statusOff(this.id).subscribe(
      res=>{
        localStorage.removeItem('user');
       this._router.navigate(['/']);
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
}