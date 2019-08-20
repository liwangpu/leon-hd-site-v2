import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticmeshDetailBasicComponent } from './staticmesh-detail-basic.component';

describe('StaticmeshDetailBasicComponent', () => {
  let component: StaticmeshDetailBasicComponent;
  let fixture: ComponentFixture<StaticmeshDetailBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticmeshDetailBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticmeshDetailBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
