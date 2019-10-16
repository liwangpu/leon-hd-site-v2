import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailBasicComponent } from './order-detail-basic.component';

describe('OrderDetailBasicComponent', () => {
  let component: OrderDetailBasicComponent;
  let fixture: ComponentFixture<OrderDetailBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
