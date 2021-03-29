import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Global} from  '../../services/global';
import { UploadService } from '../../services/upload.service';
import {Suggestion} from '../../models/suggestion';
declare let $:any;
@Component({
  selector: 'app-actualizar-informacion',
  templateUrl: './actualizar-informacion.component.html',
  styleUrls: ['./actualizar-informacion.component.css'],
  providers:[UserService,UploadService]
})
export class ActualizarInformacionComponent implements OnInit {
  public user: User;
  public id:any;
  public title:string;
  public filesToUpload: Array<File>
  public validar:boolean;
  public status:string;
  public url:string;
  public save_Project;
  public suggestion:Suggestion;
  public suggestionState:boolean;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    private _uploadService:UploadService
  ) {
    this.title = 'Actualizar información'
    this.url =Global.url;
    this.validar=false;
    this.suggestion = new Suggestion(null,null,null,null);
    this.suggestionState = false;
   }

  ngOnInit() {
    this._route.params.subscribe(params=>{
      this.id=params.id;
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
  saveUser(){
    this._userService.editUser(this.user).subscribe(
      res =>{
        if(res.user){ 
          //Subir la imagen
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+'upload-image/'+res.user._id,[],this.filesToUpload,'image')
            .then((result:any)=>{
              //Cuando subo el proyecto, me lo devuelve en result, entonces yo lo puedoutilizo para acceder al link 
              // y aqu es unico<a></a>
              this.save_Project=result.project;
              setTimeout(() => {
                location.reload();
              }, 100);
              this.validar = true;
            });
          }else{
            this.save_Project=res.project;
            this.validar =  true;
          }
          
      
       }else{
        this.validar=false;
       }
      },
      error=>{
        console.log(<any>error);
      });
    
  }
  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
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
