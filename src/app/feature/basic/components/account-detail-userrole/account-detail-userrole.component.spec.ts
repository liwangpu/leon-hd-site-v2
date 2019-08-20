import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailUserroleComponent } from './account-detail-userrole.component';

describe('AccountDetailUserroleComponent', () => {
  let component: AccountDetailUserroleComponent;
  let fixture: ComponentFixture<AccountDetailUserroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailUserroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailUserroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
