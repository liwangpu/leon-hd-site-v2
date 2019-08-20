import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailBasicComponent } from './product-detail-basic.component';

describe('ProductDetailBasicComponent', () => {
  let component: ProductDetailBasicComponent;
  let fixture: ComponentFixture<ProductDetailBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
