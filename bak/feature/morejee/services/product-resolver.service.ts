import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product, ProductService } from '@app/feature/morejee-ms';
import { Observable } from 'rxjs';

@Injectable()
export class ProductResolverService implements Resolve<Product> {


  constructor(protected productSrv: ProductService) {

  }//constructor

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product> {
    let id = route.paramMap.get('id');
    return this.productSrv.getById(id);
  }//resolve

}
