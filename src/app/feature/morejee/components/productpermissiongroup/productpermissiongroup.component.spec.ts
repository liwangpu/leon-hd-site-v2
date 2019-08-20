import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductpermissiongroupComponent } from './productpermissiongroup.component';

describe('ProductpermissiongroupComponent', () => {
  let component: ProductpermissiongroupComponent;
  let fixture: ComponentFixture<ProductpermissiongroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductpermissiongroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductpermissiongroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
