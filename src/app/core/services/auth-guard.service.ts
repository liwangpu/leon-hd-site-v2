import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(protected router: Router, protected authSrv: AuthService) {

  }//constructor

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {

    if (this.authSrv.tokenValid) return true;

    let params = {
      queryParams: {
        return: state.url
      }
    };
    this.router.navigate(["/public/login"], params);
    return false;
  }//canActivate
}
