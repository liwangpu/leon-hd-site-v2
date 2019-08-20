import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountProfile, AccountService } from '@app/feature/basic-ms';
import { Observable } from 'rxjs';

@Injectable()
export class AccountProfileResolverService implements Resolve<AccountProfile> {

  constructor(protected accountSrv: AccountService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AccountProfile | Observable<AccountProfile> | Promise<AccountProfile> {
    return this.accountSrv.getProfile();
  }//resolve


}