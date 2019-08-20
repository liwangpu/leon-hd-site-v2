import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailBasicComponent } from './category-detail-basic.component';

describe('CategoryDetailBasicComponent', () => {
  let component: CategoryDetailBasicComponent;
  let fixture: ComponentFixture<CategoryDetailBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDetailBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
