import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Order, OrderService } from '@app/feature/oms-ms';
import { Observable } from 'rxjs';

@Injectable()
export class OrderResolverService implements Resolve<Order> {

  constructor(protected apiSrv: OrderService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Order | Observable<Order> | Promise<Order> {
    let id = route.paramMap.get('id');
    return this.apiSrv.getById(id);
  }//resolve
}
