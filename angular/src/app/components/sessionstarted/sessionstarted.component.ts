import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Service } from '../../models/service';
import {Suggestion} from '../../models/suggestion';
import {Global} from  '../../services/global';
declare let $:any;

@Component({
  selector: 'app-sessionstarted',
  templateUrl: './sessionstarted.component.html',
  styleUrls: ['./sessionstarted.component.css'],
  providers:[UserService]
})
export class SessionstartedComponent implements OnInit {
  public user: User;
  public service:Service;
  public id:any;
  public suggestion:Suggestion;
  public suggestionState:boolean;
  public url:string;
  public servicioCreado:boolean;
  constructor(
    public _userService:UserService,
    public _route:ActivatedRoute,
    public _router:Router
  ) { 
    this.service = new Service(null,null,'Carpinteria',50000);
    this.servicioCreado=false;
    this.url =Global.url;
    this.suggestion = new Suggestion(null,null,null,null);
    this.suggestionState = false;
  }

  ngOnInit() {
    this._route.params.subscribe(params =>{
      this.id = params.id;
      this.getUser(this.id);
    });
   
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
  agregarDireccion(direccion){
    this.service.user_address = direccion;

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

  saveService(descripcion){
    this._userService.createService(this.id,this.service).subscribe(
      result =>{
        if(result.user){
          descripcion.reset();
          this.servicioCreado=true;
          setTimeout(()=>{
            this.servicioCreado=false;
          },3000)
        }
      },
      error =>{
        console.log(<any>error)
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
