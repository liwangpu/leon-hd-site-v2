import { Injectable } from '@angular/core';
import { Account, AccountService } from '@app/feature/basic-ms';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AccountResolverService implements Resolve<Account> {

  constructor(protected accountSrv: AccountService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Account | Observable<Account> | Promise<Account> {
    let id = route.paramMap.get('id');
    return this.accountSrv.getById(id);
  }//resolve
}
