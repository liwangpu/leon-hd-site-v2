import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySingleSelectDialogComponent } from './category-single-select-dialog.component';

describe('CategorySingleSelectDialogComponent', () => {
  let component: CategorySingleSelectDialogComponent;
  let fixture: ComponentFixture<CategorySingleSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySingleSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySingleSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
