import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './components/page/page.component';
import { AccountProfileResolverService } from './services/account-profile-resolver.service';

const routes: Routes = [
  {
    path: ''
    , component: PageComponent
    , children: [
      {
        path: 'basic'
        , loadChildren: '../basic/basic.module#BasicModule'
      }
      , {
        path: 'morejee'
        , loadChildren: '../morejee/morejee.module#MorejeeModule'
      }
      , {
        path: 'oss'
        , loadChildren: '../oss/oss.module#OssModule'
      }
      , {
        path: 'oms'
        , loadChildren: '../oms/oms.module#OmsModule'
      }
    ],
    resolve: {
      profile: AccountProfileResolverService
    }
  }
  , { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
