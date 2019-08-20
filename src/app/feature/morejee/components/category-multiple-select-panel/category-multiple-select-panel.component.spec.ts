import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMultipleSelectPanelComponent } from './category-multiple-select-panel.component';

describe('CategoryMultipleSelectPanelComponent', () => {
  let component: CategoryMultipleSelectPanelComponent;
  let fixture: ComponentFixture<CategoryMultipleSelectPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryMultipleSelectPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryMultipleSelectPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
