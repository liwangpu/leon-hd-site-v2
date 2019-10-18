import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorageKeyEnum } from 'app-common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private storageSrv: LocalStorageService
    ) {

    }//constructor

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let token = this.storageSrv.getItem(LocalStorageKeyEnum.token);
        if (token) {
            return true;
        }
        return false;
    }//canActivate
}
