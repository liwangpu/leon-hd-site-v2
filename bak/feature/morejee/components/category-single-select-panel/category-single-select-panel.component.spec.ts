import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySingleSelectPanelComponent } from './category-single-select-panel.component';

describe('CategorySingleSelectPanelComponent', () => {
  let component: CategorySingleSelectPanelComponent;
  let fixture: ComponentFixture<CategorySingleSelectPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySingleSelectPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySingleSelectPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
