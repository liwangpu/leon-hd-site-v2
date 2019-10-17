import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MessageCenterService {

  constructor(private snackBar: MatSnackBar, private translate: TranslateService) {

  }//constructor

  message(msg: string) {
    this.snackBar.open(msg)
  }//message

  saveSuccessfully() {
    this.translate.get('message.saveSuccessfully').subscribe(msg => this.message(msg));
  }//保存成功

}
