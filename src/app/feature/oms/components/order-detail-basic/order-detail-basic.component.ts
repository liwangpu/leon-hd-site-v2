import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order, OrderService } from '@app/feature/oms-ms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageCenterService } from '@app/core';

@Component({
  selector: 'oms-order-detail-basic',
  templateUrl: './order-detail-basic.component.html',
  styleUrls: ['./order-detail-basic.component.scss']
})
export class OrderDetailBasicComponent implements OnInit {

  private _order: Order;
  get f() { return this.detailForm.controls; }
  @Input() set order(val: Order) {
    if (!val) return;
    if (this._order) return;
    this._order = val;
    this.detailForm.patchValue(val);
  }
  @Output() orderChange = new EventEmitter();
  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected orderSrv: OrderService, protected msgSrv: MessageCenterService) {
    this.detailForm = this.formBuilder.group({
      id: ['', []]
      , categoryId: ['', []]
      , name: ['', [Validators.required]]
      , description: ['', []]
    });
  }//constructor

  ngOnInit() {

  }//ngOnInit

  onSave() {

  }//onSave

}
