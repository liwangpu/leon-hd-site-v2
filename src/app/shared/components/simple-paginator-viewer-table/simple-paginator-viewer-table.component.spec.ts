import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePaginatorViewerTableComponent } from './simple-paginator-viewer-table.component';

describe('SimplePaginatorViewerTableComponent', () => {
  let component: SimplePaginatorViewerTableComponent;
  let fixture: ComponentFixture<SimplePaginatorViewerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplePaginatorViewerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePaginatorViewerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
