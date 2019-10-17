import { Injectable, OnDestroy, TemplateRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DetailViewerTopicEnum } from '../enums/detail-viewer-topic-enum';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay/index';

@Injectable()
export class DetailViewerOpsatService implements OnDestroy {

  private _message = new ReplaySubject(25);
  message = this._message.asObservable();
  constructor(private dialogSrv: MatDialog) {

  }//constructor

  ngOnDestroy(): void {
    this._message.complete();
    this._message.unsubscribe();
  }//ngOnDestroy

  _openDialog<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R> {
    return this.dialogSrv.open(componentOrTemplateRef, config);
  }//_openDialog

  publish(topic: DetailViewerTopicEnum, data?: any) {
    this._message.next({ topic: topic, data: data });
  }//publish
}
