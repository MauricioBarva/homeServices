import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

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


const appRoutes : Routes=[
{path:'', component:InicioComponent},
{path:'login-worker', component:WorkerLoginComponent},
{path:'login', component:LoginComponent},
{path:'sign-in', component:SigninComponent},
{path:'sign-in-worker',component:SignInWorkerComponent},
{path:'session-started/:id', component:SessionstartedComponent},
{path:'session-started/services/:id',component:HistorialServiciosComponent},
{path:'session-started/update-information/:id',component:ActualizarInformacionComponent},
{path:'worker-started/:id',component:WorkerStartedSessionComponent},
{path:'**', component:ErrorComponent},

]
export const appRoutingProviders: any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);