import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewerToolbarComponent } from './list-viewer-toolbar.component';

describe('ListViewerToolbarComponent', () => {
  let component: ListViewerToolbarComponent;
  let fixture: ComponentFixture<ListViewerToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListViewerToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewerToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
