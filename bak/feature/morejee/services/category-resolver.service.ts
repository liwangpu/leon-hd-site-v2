import { Injectable } from '@angular/core';
import { Category, CategoryService } from '@app/feature/morejee-ms';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryResolverService implements Resolve<Category>{


  constructor(protected catSrv: CategoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Category | Observable<Category> | Promise<Category> {
    let id = route.paramMap.get('id');
    return this.catSrv.getTreeById(id);
  }//resolve
}
