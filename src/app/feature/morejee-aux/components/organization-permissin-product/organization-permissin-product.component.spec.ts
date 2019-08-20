import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationPermissinProductComponent } from './organization-permissin-product.component';

describe('OrganizationPermissinProductComponent', () => {
  let component: OrganizationPermissinProductComponent;
  let fixture: ComponentFixture<OrganizationPermissinProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationPermissinProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationPermissinProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
