import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDetailOwnerComponent } from './organization-detail-owner.component';

describe('OrganizationDetailOwnerComponent', () => {
  let component: OrganizationDetailOwnerComponent;
  let fixture: ComponentFixture<OrganizationDetailOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationDetailOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDetailOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
