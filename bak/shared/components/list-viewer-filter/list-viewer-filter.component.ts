import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-list-viewer-filter',
  templateUrl: './list-viewer-filter.component.html',
  styleUrls: ['./list-viewer-filter.component.scss']
})
export class ListViewerFilterComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Output() undo = new EventEmitter();
  @Output() search = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
