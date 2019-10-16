import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationTypeSelectboxComponent } from './organization-type-selectbox.component';

describe('OrganizationTypeSelectboxComponent', () => {
  let component: OrganizationTypeSelectboxComponent;
  let fixture: ComponentFixture<OrganizationTypeSelectboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationTypeSelectboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationTypeSelectboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
