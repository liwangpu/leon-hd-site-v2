import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Customer, CustomerService } from '@app/feature/oms-ms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageCenterService } from '@app/core';

@Component({
  selector: 'oms-customer-detail-basic',
  templateUrl: './customer-detail-basic.component.html',
  styleUrls: ['./customer-detail-basic.component.scss']
})
export class CustomerDetailBasicComponent implements OnInit {

  private _customer: Customer;
  get f() { return this.detailForm.controls; }
  @Input() set customer(val: Customer) {
    if (!val) return;
    if (this._customer) return;
    this._customer = val;
    this.detailForm.patchValue(val);
  }
  @Output() customerChange = new EventEmitter();
  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected customerSrv: CustomerService, protected msgSrv: MessageCenterService) {
    this.detailForm = this.formBuilder.group({
      id: ['', []]
      , name: ['', [Validators.required]]
      , phone: ['', [Validators.required]]
      , address: ['', [Validators.required]]
      , mail: ['']
      , description: ['', []]
    });
  }//constructor

  ngOnInit() {

  }//ngOnInit

  onSave() {

  }//onSave

}
