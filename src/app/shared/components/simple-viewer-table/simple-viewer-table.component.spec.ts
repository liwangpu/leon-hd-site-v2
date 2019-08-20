import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleViewerTableComponent } from './simple-viewer-table.component';

describe('SimpleViewerTableComponent', () => {
  let component: SimpleViewerTableComponent;
  let fixture: ComponentFixture<SimpleViewerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleViewerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleViewerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
