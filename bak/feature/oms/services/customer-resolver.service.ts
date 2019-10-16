import { Injectable } from '@angular/core';
import { CustomerService, Customer } from '@app/feature/oms-ms';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerResolverService implements Resolve<Customer> {

  constructor(protected apiSrv: CustomerService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Customer | Observable<Customer> | Promise<Customer> {
    let id = route.paramMap.get('id');
    return this.apiSrv.getById(id);
  }//resolve
}
