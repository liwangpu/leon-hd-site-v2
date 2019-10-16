import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomroleDetailAccesspointComponent } from './customrole-detail-accesspoint.component';

describe('CustomroleDetailAccesspointComponent', () => {
  let component: CustomroleDetailAccesspointComponent;
  let fixture: ComponentFixture<CustomroleDetailAccesspointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomroleDetailAccesspointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomroleDetailAccesspointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
