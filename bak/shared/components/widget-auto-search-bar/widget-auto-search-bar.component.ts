import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'shared-widget-auto-search-bar',
  templateUrl: './widget-auto-search-bar.component.html',
  styleUrls: ['./widget-auto-search-bar.component.scss']
})
export class WidgetAutoSearchBarComponent implements OnInit, OnDestroy {

  _search = '';
  _keyWordUp = new Subject<string>();
  @Input() set search(val: string) {
    this._search = val;
  }
  get search() {
    return this._search;
  }
  @Output() searchChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this._keyWordUp.pipe(debounceTime(500)).subscribe(kw => {
      this._search = kw;
      this.searchChange.next(this.search);
    });
  }//ngOnInit

  ngOnDestroy(): void {
    this._keyWordUp.complete();
    this._keyWordUp.unsubscribe();
  }//ngOnDestroy

  clear() {
    this.search = '';
    this._keyWordUp.next(this.search);
  }//clear

}
