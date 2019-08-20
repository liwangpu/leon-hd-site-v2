import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewerPaginatorComponent } from './list-viewer-paginator.component';

describe('ListViewerPaginatorComponent', () => {
  let component: ListViewerPaginatorComponent;
  let fixture: ComponentFixture<ListViewerPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListViewerPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewerPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
