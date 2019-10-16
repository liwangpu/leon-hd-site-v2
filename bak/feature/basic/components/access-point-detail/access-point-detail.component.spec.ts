import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessPointDetailComponent } from './access-point-detail.component';

describe('AccessPointDetailComponent', () => {
  let component: AccessPointDetailComponent;
  let fixture: ComponentFixture<AccessPointDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessPointDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessPointDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
