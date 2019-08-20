import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailBasicComponent } from './account-detail-basic.component';

describe('AccountDetailBasicComponent', () => {
  let component: AccountDetailBasicComponent;
  let fixture: ComponentFixture<AccountDetailBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
