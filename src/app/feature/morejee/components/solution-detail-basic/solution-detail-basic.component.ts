import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Solution, SolutionService } from '@app/feature/morejee-ms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageCenterService } from '@app/core';

@Component({
  selector: 'morejee-solution-detail-basic',
  templateUrl: './solution-detail-basic.component.html',
  styleUrls: ['./solution-detail-basic.component.scss']
})
export class SolutionDetailBasicComponent implements OnInit {

  private _solution: Solution;
  get f() { return this.detailForm.controls; }
  @Input() set solution(val: Solution) {
    if (!val) return;
    if (this._solution) return;
    this._solution = val;
    this.detailForm.patchValue(val);
  }
  @Output() solutionChange = new EventEmitter();
  detailForm: FormGroup;
  constructor(protected formBuilder: FormBuilder, protected solutionSrv: SolutionService, protected msgSrv: MessageCenterService) {
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
    if (data.id) {
      this.solutionSrv.patch(data.id,Solution.GenPatchDoc(data)).subscribe(() => {
        this.msgSrv.saveSuccessfully();
        this._solution = { ...this._solution, ...data };
        this.solutionChange.next(this._solution);
        this.detailForm.reset(data);
      });
    }
  }//onSave

}
