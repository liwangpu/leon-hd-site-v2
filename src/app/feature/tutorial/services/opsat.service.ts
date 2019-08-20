import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class OpsatService implements OnDestroy {

  message = new Subject();
  constructor() {
    console.log('opsat ctr');
  }

  ngOnDestroy(): void {
    console.log('opsat destroy!');
    this.message.complete();
    this.message.unsubscribe();
  }

}
