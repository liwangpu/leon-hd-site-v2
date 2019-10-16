import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { StaticmeshService } from './services/staticmesh.service';
import { MaterialService } from './services/material.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ProductSpecService } from './services/product-spec.service';
import { MapService } from './services/map.service';
import { TextureService } from './services/texture.service';
import { ProductPermissionGroupService } from './services/product-permission-group.service';
import { SolutionService } from './services/solution.service';

@NgModule({

})
export class MorejeeMsModule {
  constructor(@Optional() @SkipSelf() parentModule: MorejeeMsModule) {
    if (parentModule) {
      throw new Error('根模块使用forRoot引用,其他模块不需要再引用了!');
    }
  }//constructor

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MorejeeMsModule,
      providers: [
        StaticmeshService,
        MaterialService,
        CategoryService,
        ProductService,
        ProductSpecService,
        MapService,
        TextureService,
        SolutionService,
        ProductPermissionGroupService
      ]
    };
  }//forRoot
 }
