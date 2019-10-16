import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Material, MaterialService } from '@app/feature/morejee-ms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageCenterService } from '@app/core';
import { CategoryChangeSelectBoxComponent } from '../category-change-select-box/category-change-select-box.component';

@Component({
  selector: 'morejee-material-detail-basic',
  templateUrl: './material-detail-basic.component.html',
  styleUrls: ['./material-detail-basic.component.scss']
})
export class MaterialDetailBasicComponent implements OnInit {

  private _material: Material;
  get f() { return this.detailForm.controls; }
  @Input() set material(val: Material) {
    if (!val) return;
    if (this._material) return;
    this._material = val;
    this.detailForm.patchValue(val);
    this.selectBoxCt.initCategoryName(val.categoryName);
  }
  @Output() materialChange = new EventEmitter();
  @ViewChild('selectBoxCt',{static:true}) selectBoxCt: CategoryChangeSelectBoxComponent;
  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected materialSrv: MaterialService, protected msgSrv: MessageCenterService) {
    this.detailForm = this.formBuilder.group({
      id: ['', []]
      , categoryId: ['', []]
      , name: ['', [Validators.required]]
      , description: ['', []]
    });
  }//constructor

  ngOnInit() {

  }//ngOnInit

  onCategoryChange(categoryId: string) {
    this.detailForm.patchValue({ categoryId: categoryId });
    this.detailForm.controls["categoryId"].markAsDirty();
  }//onCategoryChange

  onSave() {
    let data = this.detailForm.value;
    if (!data.id) {
      this.materialSrv.post(data).subscribe(res => {
        this.msgSrv.saveSuccessfully();
        this.detailForm.patchValue(res);
        this._material = { ...this._material, ...data };
        this.materialChange.next(this._material);
        this.detailForm.reset(data);
      });
    }
    else {
      this.materialSrv.patch(data.id, Material.GenPatchDoc(data)).subscribe(() => {
        this.msgSrv.saveSuccessfully();
        this._material = { ...this._material, ...data };
        this.materialChange.next(this._material);
        this.detailForm.reset(data);
      });
    }
  }//onSave

}
