import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewerTableComponent } from './list-viewer-table.component';

describe('ListViewerTableComponent', () => {
  let component: ListViewerTableComponent;
  let fixture: ComponentFixture<ListViewerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListViewerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
