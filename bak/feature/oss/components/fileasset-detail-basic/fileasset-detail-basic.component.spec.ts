import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileassetDetailBasicComponent } from './fileasset-detail-basic.component';

describe('FileassetDetailBasicComponent', () => {
  let component: FileassetDetailBasicComponent;
  let fixture: ComponentFixture<FileassetDetailBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileassetDetailBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileassetDetailBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
