import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailChangepwdComponent } from './account-detail-changepwd.component';

describe('AccountDetailChangepwdComponent', () => {
  let component: AccountDetailChangepwdComponent;
  let fixture: ComponentFixture<AccountDetailChangepwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailChangepwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailChangepwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
