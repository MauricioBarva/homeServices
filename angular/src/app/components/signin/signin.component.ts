import { Component, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
declare let $:any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers:[UserService]
})
export class SigninComponent implements OnInit {
   public user:User;
   public title:string;
   public password2:any;
   public status:string;
   public userCreated:string;
  constructor(
    private _userService:UserService,
  ) { 
    this.user= new User(null,null,null,null,null,null,null,null,null,false);
    this.title = 'Registro de clientes';
    this.password2 ={
      password:String
    }
  
  }

  ngOnInit() {
   
 
  }
 
  //Validación de contraseñas
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
 
  saveUser(form){
    this._userService.saveUser(this.user).subscribe(
      res=>{
        if(res.user){
          console.log(res.user);
          this.userCreated = 'true';
          form.reset();
         
        }
       
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

}
