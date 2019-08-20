import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderResolverService } from './services/order-resolver.service';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomerResolverService } from './services/customer-resolver.service';

const routes: Routes = [
  {
    path: 'order',
    component: OrderComponent
  }
  , {
    path: 'order/detail/:id'
    , component: OrderDetailComponent
    , resolve: {
      entity: OrderResolverService
    }
  }
  , {
    path: 'customer',
    component: CustomerComponent
  }
  , {
    path: 'customer/detail'
    , component: CustomerDetailComponent
  }
  , {
    path: 'customer/detail/:id'
    , component: CustomerDetailComponent
    , resolve: {
      entity: CustomerResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OmsRoutingModule { }
