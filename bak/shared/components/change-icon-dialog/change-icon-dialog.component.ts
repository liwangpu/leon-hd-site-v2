import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';
import { FileHelper } from '@app/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'shared-change-icon-dialog',
  templateUrl: './change-icon-dialog.component.html',
  styleUrls: ['./change-icon-dialog.component.scss']
})
export class ChangeIconDialogComponent implements OnInit, OnDestroy {

  iconUrl: string;
  confirm = new Subject<{ formData: any, header: any }>();
  @ViewChild('fileInputCt',{static:true}) fileInputCt: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ChangeIconDialogComponent>) {

  }//constructor

  ngOnInit() {

  }//ngOnInit

  ngOnDestroy(): void {
    this.confirm.complete();
    this.confirm.unsubscribe();
  }//ngOnDestroy

  _onFileChange(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.iconUrl = e.target.result;
      };
    }
  }//onFileChange

  clearFile() {
    this.fileInputCt.nativeElement.value = '';
  }//clearFile

  onSelect() {
    this.clearFile();
    this.fileInputCt.nativeElement.click();
  }//onSelect

  onConfirm() {
    let fileBrowser = this.fileInputCt.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      let formData = new FormData();
      let file = fileBrowser.files[0];
      let header = new HttpHeaders({
        "fileExt": FileHelper.getFileExt(file.name)
      });
      formData.append("file", file);
      this.confirm.next({ formData: formData, header: header });
      this.dialogRef.close();
    }
  }//onConfirm

}
