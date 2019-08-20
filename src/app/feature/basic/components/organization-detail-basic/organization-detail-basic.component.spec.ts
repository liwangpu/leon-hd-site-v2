import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDetailBasicComponent } from './organization-detail-basic.component';

describe('OrganizationDetailBasicComponent', () => {
  let component: OrganizationDetailBasicComponent;
  let fixture: ComponentFixture<OrganizationDetailBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationDetailBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDetailBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
