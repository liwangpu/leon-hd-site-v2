import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaticmeshComponent } from './components/staticmesh/staticmesh.component';
import { MaterialComponent } from './components/material/material.component';
import { StaticmeshDetailComponent } from './components/staticmesh-detail/staticmesh-detail.component';
import { StaticmeshResolverService } from './services/staticmesh-resolver.service';
import { CategoryComponent } from './components/category/category.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoryResolverService } from './services/category-resolver.service';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductResolverService } from './services/product-resolver.service';
import { ProductSpecificationDetailComponent } from './components/product-specification-detail/product-specification-detail.component';
import { ProductSpecResolverService } from './services/product-spec-resolver.service';
import { MapComponent } from './components/map/map.component';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';
import { MaterialResolverService } from './services/material-resolver.service';
import { TextureComponent } from './components/texture/texture.component';
import { PointkeyResolverService } from './services/pointkey-resolver.service';
import { ProductpermissiongroupComponent } from './components/productpermissiongroup/productpermissiongroup.component';
import { SolutionComponent } from './components/solution/solution.component';
import { SolutionDetailComponent } from './components/solution-detail/solution-detail.component';
import { SolutionResolverService } from './services/solution-resolver.service';


const routes: Routes = [
  {
    path: 'staticmesh',
    component: StaticmeshComponent
  }
  , {
    path: 'staticmesh/detail'
    , component: StaticmeshDetailComponent
  }
  , {
    path: 'staticmesh/detail/:id'
    , component: StaticmeshDetailComponent
    , resolve: {
      entity: StaticmeshResolverService
    }
  }
  , {
    path: 'material',
    component: MaterialComponent
  }
  , {
    path: 'material/detail/:id'
    , component: MaterialDetailComponent
    , resolve: {
      entity: MaterialResolverService
    }
  }
  , {
    path: 'category',
    component: CategoryComponent
  }
  , {
    path: 'category/detail'
    , component: CategoryDetailComponent
  }
  , {
    path: 'category/detail/:id'
    , component: CategoryDetailComponent
    , resolve: {
      entity: CategoryResolverService
    }
  }
  , {
    path: 'product',
    component: ProductComponent,
    resolve: {
      pointKeys: PointkeyResolverService
    }
  }
  , {
    path: 'product/detail'
    , component: ProductDetailComponent
    , resolve: {
      pointKeys: PointkeyResolverService
    }
  }
  , {
    path: 'product/detail/:id'
    , component: ProductDetailComponent
    , resolve: {
      entity: ProductResolverService,
      pointKeys: PointkeyResolverService
    }
  }
  , {
    path: 'product/detail/specification'
    , component: ProductSpecificationDetailComponent
    , resolve: {
      pointKeys: PointkeyResolverService
    }
  }
  , {
    path: 'product/detail/specification/:id'
    , component: ProductSpecificationDetailComponent
    , resolve: {
      entity: ProductSpecResolverService,
      pointKeys: PointkeyResolverService
    }
  }
  , {
    path: 'map',
    component: MapComponent
  }
  , {
    path: 'texture',
    component: TextureComponent
  }
  , {
    path: 'product-permission-group',
    component: ProductpermissiongroupComponent
  }
  , {
    path: 'solution',
    component: SolutionComponent
  }
  , {
    path: 'solution/detail/:id'
    , component: SolutionDetailComponent
    , resolve: {
      entity: SolutionResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MorejeeRoutingModule { }
