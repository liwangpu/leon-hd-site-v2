import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSelectDialogComponent } from './customer-select-dialog.component';

describe('CustomerSelectDialogComponent', () => {
  let component: CustomerSelectDialogComponent;
  let fixture: ComponentFixture<CustomerSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
