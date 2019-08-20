import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailSpecificationComponent } from './product-detail-specification.component';

describe('ProductDetailSpecificationComponent', () => {
  let component: ProductDetailSpecificationComponent;
  let fixture: ComponentFixture<ProductDetailSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
