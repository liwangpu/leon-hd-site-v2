import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductpermissiongroupDetailComponent } from './productpermissiongroup-detail.component';

describe('ProductpermissiongroupDetailComponent', () => {
  let component: ProductpermissiongroupDetailComponent;
  let fixture: ComponentFixture<ProductpermissiongroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductpermissiongroupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductpermissiongroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
