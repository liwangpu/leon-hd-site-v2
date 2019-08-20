import { Injectable } from '@angular/core';
import { Account, AccountService } from '@app/feature/basic-ms';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppCacheService } from '@app/core';

@Injectable()
export class CurrentAccountResolverService implements Resolve<Account> {

  constructor(protected accountSrv: AccountService, protected cacheSrv: AppCacheService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Account | Observable<Account> | Promise<Account> {
    let id = this.cacheSrv.accountId;
    return this.accountSrv.getById(id);
  }//resolve
}
