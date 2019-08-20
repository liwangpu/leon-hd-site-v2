import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailNewComponent } from './category-detail-new.component';

describe('CategoryDetailNewComponent', () => {
  let component: CategoryDetailNewComponent;
  let fixture: ComponentFixture<CategoryDetailNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDetailNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
