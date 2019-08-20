import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'morejee-category-select-dialog',
  templateUrl: './category-select-dialog.component.html',
  styleUrls: ['./category-select-dialog.component.sass']
})
export class CategorySelectDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CategorySelectDialogComponent>, protected formBuilder: FormBuilder) {

  }//constructor

  ngOnInit() {
    
  }//ngOnInit

}
