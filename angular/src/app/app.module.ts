import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { appRoutingProviders, routing} from './app.routing';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { SessionstartedComponent } from './components/sessionstarted/sessionstarted.component';
import { ErrorComponent } from './components/error/error.component';
import { SignInWorkerComponent } from './components/sign-in-worker/sign-in-worker.component';
import { WorkerLoginComponent } from './components/worker-login/worker-login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { WorkerStartedSessionComponent } from './components/worker-started-session/worker-started-session.component';
import { HistorialServiciosComponent } from './components/historial-servicios/historial-servicios.component';
import { ActualizarInformacionComponent } from './components/actualizar-informacion/actualizar-informacion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    SessionstartedComponent,
    ErrorComponent,
    SignInWorkerComponent,
    WorkerLoginComponent,
    InicioComponent,
    WorkerStartedSessionComponent,
    HistorialServiciosComponent,
    ActualizarInformacionComponent
  ],
  imports: [
    BrowserModule,
    appRoutingProviders,
    routing,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
