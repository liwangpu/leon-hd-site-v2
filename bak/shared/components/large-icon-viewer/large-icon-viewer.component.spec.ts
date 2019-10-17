import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeIconViewerComponent } from './large-icon-viewer.component';

describe('LargeIconViewerComponent', () => {
  let component: LargeIconViewerComponent;
  let fixture: ComponentFixture<LargeIconViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargeIconViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeIconViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
