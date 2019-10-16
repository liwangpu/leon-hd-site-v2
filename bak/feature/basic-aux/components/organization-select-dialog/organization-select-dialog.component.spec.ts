import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSelectDialogComponent } from './organization-select-dialog.component';

describe('OrganizationSelectDialogComponent', () => {
  let component: OrganizationSelectDialogComponent;
  let fixture: ComponentFixture<OrganizationSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
