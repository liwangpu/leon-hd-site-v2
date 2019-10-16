import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileassetService } from '@app/feature/oss-ms';
import { MessageCenterService } from '@app/core';

@Component({
  selector: 'oss-fileasset-detail-basic',
  templateUrl: './fileasset-detail-basic.component.html',
  styleUrls: ['./fileasset-detail-basic.component.scss']
})
export class FileassetDetailBasicComponent implements OnInit {

  get f() { return this.detailForm.controls; }
  @Input() set fileAsset(val: Account) {
    this.detailForm.patchValue(val);
  }
  @Output() fileAssetChange = new EventEmitter();
  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected fileSrv: FileassetService, protected msgSrv: MessageCenterService) {
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
      this.fileSrv.post(data).subscribe(res => {
        this.detailForm.patchValue(res);
        this.fileAssetChange.next(res);
        this.msgSrv.saveSuccessfully();
        this.detailForm.reset(data);
      });
    }
    else {
      this.fileSrv.patch(data).subscribe(() => {
        this.fileAssetChange.next(data);
        this.msgSrv.saveSuccessfully();
        this.detailForm.reset(data);
      });
    }
  }//onSave

}
