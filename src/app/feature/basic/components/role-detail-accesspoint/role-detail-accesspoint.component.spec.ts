import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDetailAccesspointComponent } from './role-detail-accesspoint.component';

describe('RoleDetailAccesspointComponent', () => {
  let component: RoleDetailAccesspointComponent;
  let fixture: ComponentFixture<RoleDetailAccesspointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleDetailAccesspointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleDetailAccesspointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
