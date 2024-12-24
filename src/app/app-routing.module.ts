import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthenticatedGuard } from './services/guards/authenticated.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WorkingHoursComponent } from './components/working-hours/working-hours.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: '', 
    redirectTo: 'hours', 
    pathMatch: 
    'full' 
  },
  {
    path : '',
    component: LayoutComponent,
    children:[

      { 
        path: 'hours', component: WorkingHoursComponent
      }
    ],
    canActivate: [AuthenticatedGuard]
    ,canActivateChild: [AuthenticatedGuard]
  },
  { 
    path: '**', 
    component: NotFoundComponent 
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
