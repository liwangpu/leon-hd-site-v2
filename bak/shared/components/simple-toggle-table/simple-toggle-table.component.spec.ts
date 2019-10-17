import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleToggleTableComponent } from './simple-toggle-table.component';

describe('SimpleToggleTableComponent', () => {
  let component: SimpleToggleTableComponent;
  let fixture: ComponentFixture<SimpleToggleTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleToggleTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleToggleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
