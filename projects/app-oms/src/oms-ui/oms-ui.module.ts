import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OmsUiRoutingModule } from './oms-ui-routing.module';



@NgModule({
    declarations: [OrderListComponent],
    imports: [
        CommonModule,
        OmsUiRoutingModule
    ],
    exports: [OrderListComponent]
})
export class OmsUiModule { }
