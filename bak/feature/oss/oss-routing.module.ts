import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileassetComponent } from './components/fileasset/fileasset.component';
import { FileassetDetailComponent } from './components/fileasset-detail/fileasset-detail.component';
import { FileassetResolverService } from './services/fileasset-resolver.service';

const routes: Routes = [
  {
    path: 'file',
    component: FileassetComponent
  }
  , {
    path: 'file/detail'
    , component: FileassetDetailComponent
  }
  , {
    path: 'file/detail/:id'
    , component: FileassetDetailComponent
    , resolve: {
      entity: FileassetResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OssRoutingModule { }
