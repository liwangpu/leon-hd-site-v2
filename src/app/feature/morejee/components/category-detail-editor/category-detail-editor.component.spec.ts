import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailEditorComponent } from './category-detail-editor.component';

describe('CategoryDetailEditorComponent', () => {
  let component: CategoryDetailEditorComponent;
  let fixture: ComponentFixture<CategoryDetailEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDetailEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
