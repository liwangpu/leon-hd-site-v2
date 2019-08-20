import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '@app/feature/basic-ms';
import { Observable } from 'rxjs';

@Injectable()
export class PointkeyResolverService implements Resolve<string[]> {

  constructor(protected accountSrv: AccountService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string[] | Observable<string[]> | Promise<string[]> {
    return this.accountSrv.getAccessPointKey();
  }//resolve
}
