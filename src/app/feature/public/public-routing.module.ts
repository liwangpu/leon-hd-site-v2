import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainRedirectGuardService } from './services/main-redirect-guard.service';
import { LoadingComponent } from './components/loading/loading.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [MainRedirectGuardService]
  }
  , {
    path: 'loading',
    component: LoadingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
