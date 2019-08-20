import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileassetDetailComponent } from './fileasset-detail.component';

describe('FileassetDetailComponent', () => {
  let component: FileassetDetailComponent;
  let fixture: ComponentFixture<FileassetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileassetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileassetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
