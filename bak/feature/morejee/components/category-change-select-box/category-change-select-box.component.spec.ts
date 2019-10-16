import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryChangeSelectBoxComponent } from './category-change-select-box.component';

describe('CategoryChangeSelectBoxComponent', () => {
  let component: CategoryChangeSelectBoxComponent;
  let fixture: ComponentFixture<CategoryChangeSelectBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryChangeSelectBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryChangeSelectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
