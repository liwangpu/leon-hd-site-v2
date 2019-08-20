import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileassetComponent } from './fileasset.component';

describe('FileassetComponent', () => {
  let component: FileassetComponent;
  let fixture: ComponentFixture<FileassetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileassetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileassetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
