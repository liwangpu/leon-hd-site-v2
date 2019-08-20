import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrganizationType, OrganizationTypeService } from '@app/feature/basic-ms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'basic-organization-type-selectbox',
  templateUrl: './organization-type-selectbox.component.html',
  styleUrls: ['./organization-type-selectbox.component.scss']
})
export class OrganizationTypeSelectboxComponent implements OnInit {

  _required = false;
  organTypeControl = new FormControl();
  options: Array<OrganizationType> = [];
  @Input() set required(val: string) {
    this._required = val && val.toString().toLocaleLowerCase() == 'true';
  }
  @Input() set disabled(val: string) {
    if (val && val.toString().toLocaleLowerCase() == 'true'){
      this.organTypeControl.disable();
    }
  }
  @Input() oragnizationTypeId: string;
  @Output() optionSelected = new EventEmitter();
  constructor(protected organTypeSrv: OrganizationTypeService) {

  }//constructor

  ngOnInit() {
    this.organTypeSrv.query({ page: 1, pageSize: 99 }).subscribe(res => {
      this.options = res.data;
      if (this.oragnizationTypeId) {
        let it = this.options.filter(x => x.id.toString() == this.oragnizationTypeId.toString())[0];
        if (it)
          this.organTypeControl.patchValue(it);
      }
    });
  }//ngOnInit

  displayValueFn(item: OrganizationType) {
    return item && item.name ? item.name : "";
  }//displayValueFn

  onItemSelectd(evt: MatAutocompleteSelectedEvent) {
    this.optionSelected.next(evt.option.value.id);
  }//onItemSelectd

}
