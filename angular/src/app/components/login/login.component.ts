import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {Router, ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  public title:string;
  public error:string;
  constructor(
    private _userService:UserService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { 
    this.title='Bienvenido Cliente'
  }
  ngOnInit() {
  
  }
  comprobar(user,password){
    this._userService.findUser(user,password).subscribe(
      res=>{
        if(res.user){
          this._userService.statusActive(res.user._id).subscribe(
            result =>{
              this._router.navigate(['session-started/'+result.user._id])
              localStorage.setItem('user',JSON.stringify(result.user));
            },
            error =>{
              console.log(<any>error);
            }
          );
        }
       
       
      },
      error =>{
        console.log(<any>error);
        this.error='true';
      }
    );

  }
  
}
