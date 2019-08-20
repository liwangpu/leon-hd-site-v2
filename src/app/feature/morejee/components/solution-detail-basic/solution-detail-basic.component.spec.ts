import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionDetailBasicComponent } from './solution-detail-basic.component';

describe('SolutionDetailBasicComponent', () => {
  let component: SolutionDetailBasicComponent;
  let fixture: ComponentFixture<SolutionDetailBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionDetailBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionDetailBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
