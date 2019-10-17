import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'shared-large-icon-viewer',
  templateUrl: './large-icon-viewer.component.html',
  styleUrls: ['./large-icon-viewer.component.scss']
})
export class LargeIconViewerComponent implements OnInit {

  iconUrl: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<LargeIconViewerComponent>) {
    if (this.data && this.data.url) {
      //移除_128等大小限定设置
      let str: string = this.data.url;
      str = str.replace('_128.', '.');
      str = str.replace('_256.', '.');
      this.iconUrl = str;
    }
  }//constructor

  ngOnInit() {
  }//ngOnInit

}
