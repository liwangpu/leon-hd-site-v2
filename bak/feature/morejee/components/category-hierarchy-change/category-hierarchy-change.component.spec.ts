import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryHierarchyChangeComponent } from './category-hierarchy-change.component';

describe('CategoryHierarchyChangeComponent', () => {
  let component: CategoryHierarchyChangeComponent;
  let fixture: ComponentFixture<CategoryHierarchyChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryHierarchyChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryHierarchyChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
