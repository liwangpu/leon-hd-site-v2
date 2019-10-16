import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OmsRoutingModule } from './oms-routing.module';
import { OrderComponent } from './components/order/order.component';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderResolverService } from './services/order-resolver.service';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderDetailBasicComponent } from './components/order-detail-basic/order-detail-basic.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OrderDetailCustomerComponent } from './components/order-detail-customer/order-detail-customer.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomerResolverService } from './services/customer-resolver.service';
import { CustomerDetailBasicComponent } from './components/customer-detail-basic/customer-detail-basic.component';
import { OmsAuxModule } from '@app/feature/oms-aux';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderDetailItemsComponent } from './components/order-detail-items/order-detail-items.component';
import {MatTableModule} from '@angular/material/table';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';
@NgModule({
  declarations: [OrderComponent, OrderDetailComponent, OrderDetailBasicComponent, OrderDetailCustomerComponent, CustomerComponent, CustomerDetailComponent, CustomerDetailBasicComponent, OrderDetailItemsComponent],
  imports: [
    CommonModule,
    OmsRoutingModule,
    SharedModule,
    TranslateModule,
    OmsAuxModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } },
    OrderResolverService,
    CustomerResolverService
  ]
})
export class OmsModule { }
