import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Customer, CustomerService, OrderService } from '@app/feature/oms-ms';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MessageCenterService } from '@app/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerSelectDialogComponent } from '@app/feature/oms-aux';
import { map, switchMap } from 'rxjs/operators';
import { iif, of } from 'rxjs';

@Component({
  selector: 'oms-order-detail-customer',
  templateUrl: './order-detail-customer.component.html',
  styleUrls: ['./order-detail-customer.component.scss']
})
export class OrderDetailCustomerComponent implements OnInit {

  private _customer: Customer;
  get f() { return this.detailForm.controls; }
  @Input() orderId: string;
  @Input() set customer(val: Customer) {
    if (!val) return;
    if (this._customer) return;
    this._customer = val;
    this.detailForm.patchValue(val);
  }
  @Output() customerChange = new EventEmitter();
  detailForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private customerSrv: CustomerService, private msgSrv: MessageCenterService, private orderSrv: OrderService, private dialogSrv: MatDialog) {
    this.detailForm = this.formBuilder.group({
      id: ['', []]
      , name: ['', [Validators.required]]
      , phone: ['', [Validators.required]]
      , address: ['', [Validators.required]]
      , mail: ['']
    });
  }//constructor

  ngOnInit() {

  }//ngOnInit

  openCustomerBook() {
    let ins = this.dialogSrv.open(CustomerSelectDialogComponent, { width: '750px', height: '600px' });
    ins.componentInstance.afterSelect.pipe(map(ids => {
      let idArr = ids.split(',');
      return idArr[0];
    })).pipe(switchMap(id => this.customerSrv.getById(id))).subscribe(cus => {
      this.detailForm.patchValue(cus);
      this.detailForm.markAsDirty();
    });
  }//openCustomerBook

  onSave() {
    let data = this.detailForm.value;
    iif(() => !data.id, this.customerSrv.post(data), of(data)).pipe(map(cus => {
      cus["customerId"] = cus.id;
      return cus;
    })).pipe(switchMap(cus => this.orderSrv.updateCustomer(this.orderId, cus).pipe(map(() => cus)))).subscribe(cus => {
      this.msgSrv.saveSuccessfully();
      this.detailForm.reset(cus);
    });
  }//onSave

}
