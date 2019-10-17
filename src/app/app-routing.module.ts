import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuardService } from '@app/core';

// const routes: Routes = [
//   {
//     path: 'app',
//     loadChildren: './feature/main/main.module#MainModule',
//     canActivate: [AuthGuardService]
//   }
//   , {
//     path: 'tutorial',
//     loadChildren: './feature/tutorial/tutorial.module#TutorialModule'
//   }
//   , {
//     path: 'public',
//     loadChildren: './feature/public/public.module#PublicModule'
//   }
//   , { path: '**', redirectTo: 'app' }
// ];

const routes: Routes = [
  {
    path: 'basic',
    loadChildren: () => import("./wrappers/app-basic-wrapper.module").then(m => m.AppBasicWrapperModule)
  }
  , {
    path: 'morejee',
    loadChildren: () => import("./wrappers/app-morejee-wrapper.module").then(m => m.AppMorejeeWrapperModule)
  }
  , {
    path: 'oms',
    loadChildren: () => import("./wrappers/app-oms-wrapper.module").then(m => m.AppOmsWrapperModule)
  }
  , {
    path: 'oss',
    loadChildren: () => import("./wrappers/app-oss-wrapper.module").then(m => m.AppOssWrapperModule)
  }
  , { path: '**', redirectTo: 'app' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
