import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailBasicComponent } from './customer-detail-basic.component';

describe('CustomerDetailBasicComponent', () => {
  let component: CustomerDetailBasicComponent;
  let fixture: ComponentFixture<CustomerDetailBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDetailBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
