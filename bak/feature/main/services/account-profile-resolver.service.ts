import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountProfile, AccountService } from '@app/feature/basic-ms';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AccountProfileResolverService implements Resolve<AccountProfile> {

  constructor(protected accountSrv: AccountService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AccountProfile | Observable<AccountProfile> | Promise<AccountProfile> {
    return this.accountSrv.getProfile().pipe(catchError(err => {
      let data = new AccountProfile();
      data["error"] = true;
      return of(data);
    }));
  }//resolve


}