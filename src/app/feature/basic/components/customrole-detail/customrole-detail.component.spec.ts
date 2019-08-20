import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomroleDetailComponent } from './customrole-detail.component';

describe('CustomroleDetailComponent', () => {
  let component: CustomroleDetailComponent;
  let fixture: ComponentFixture<CustomroleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomroleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomroleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
