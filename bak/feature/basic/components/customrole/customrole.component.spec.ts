import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomroleComponent } from './customrole.component';

describe('CustomroleComponent', () => {
  let component: CustomroleComponent;
  let fixture: ComponentFixture<CustomroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
