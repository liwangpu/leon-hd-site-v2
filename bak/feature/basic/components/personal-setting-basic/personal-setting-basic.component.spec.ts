import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSettingBasicComponent } from './personal-setting-basic.component';

describe('PersonalSettingBasicComponent', () => {
  let component: PersonalSettingBasicComponent;
  let fixture: ComponentFixture<PersonalSettingBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalSettingBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalSettingBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
