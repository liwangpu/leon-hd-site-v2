import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'basic-account-filter',
  templateUrl: './account-filter.component.html',
  styleUrls: ['./account-filter.component.scss']
})
export class AccountFilterComponent implements OnInit {

  searchForm: FormGroup;
  search = new Subject<any>();
  clearSearch = new Subject<any>();
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AccountFilterComponent>, protected formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      mail: ['']
      , phone: ['']
    });
    // console.log();
  }//constructor

  ngOnInit() {
    if (this.data)
      this.searchForm.patchValue(this.data);
  }//ngOnInit

  ngOnDestroy(): void {
    this.search.complete();
    this.search.unsubscribe();
    this.clearSearch.complete();
    this.clearSearch.unsubscribe();
  }//ngOnDestroy

  onSearch() {
    if (this.searchForm.dirty) {
      let query = this.searchForm.value;
      this.search.next(query);
    }
    this.dialogRef.close();
  }//onSearch

  onClearSearch() {
    this.clearSearch.next();
    this.dialogRef.close();
  }//onClearSearch

}
