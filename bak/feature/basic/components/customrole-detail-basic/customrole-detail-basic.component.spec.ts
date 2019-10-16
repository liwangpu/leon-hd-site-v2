import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomroleDetailBasicComponent } from './customrole-detail-basic.component';

describe('CustomroleDetailBasicComponent', () => {
  let component: CustomroleDetailBasicComponent;
  let fixture: ComponentFixture<CustomroleDetailBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomroleDetailBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomroleDetailBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
