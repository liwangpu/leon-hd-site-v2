import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaticmeshService } from '@app/feature/morejee-ms';
import { MessageCenterService } from '@app/core';

@Component({
  selector: 'morejee-staticmesh-detail-basic',
  templateUrl: './staticmesh-detail-basic.component.html',
  styleUrls: ['./staticmesh-detail-basic.component.scss']
})
export class StaticmeshDetailBasicComponent implements OnInit {

  get f() { return this.detailForm.controls; }
  @Input() set staticMesh(val: Account) {
    if (!val) return;
    this.detailForm.patchValue(val);
  }
  @Output() staticMeshChange = new EventEmitter();
  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected meshSrv: StaticmeshService, protected msgSrv: MessageCenterService) {
    this.detailForm = this.formBuilder.group({
      id: ['', []]
      , name: ['', [Validators.required]]
      , description: ['', []]
    });
  }//constructor

  ngOnInit() {
  }//ngOnInit

  onSave() {
    let data = this.detailForm.value;
    if (data.id == "") {
      this.meshSrv.post(data).subscribe(res => {
        this.detailForm.patchValue(res);
        this.staticMeshChange.next(res);
        this.msgSrv.saveSuccessfully();
        this.detailForm.reset(data);
      });
    }
    else {
      this.meshSrv.patch(data).subscribe(() => {
        this.staticMeshChange.next(data);
        this.msgSrv.saveSuccessfully();
        this.detailForm.reset(data);
      });
    }
  }//onSave

}
