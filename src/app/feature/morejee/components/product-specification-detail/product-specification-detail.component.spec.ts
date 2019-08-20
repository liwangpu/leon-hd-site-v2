import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSpecificationDetailComponent } from './product-specification-detail.component';

describe('ProductSpecificationDetailComponent', () => {
  let component: ProductSpecificationDetailComponent;
  let fixture: ComponentFixture<ProductSpecificationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSpecificationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSpecificationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
