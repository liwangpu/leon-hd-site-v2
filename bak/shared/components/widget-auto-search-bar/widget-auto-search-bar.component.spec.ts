import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetAutoSearchBarComponent } from './widget-auto-search-bar.component';

describe('WidgetAutoSearchBarComponent', () => {
  let component: WidgetAutoSearchBarComponent;
  let fixture: ComponentFixture<WidgetAutoSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetAutoSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetAutoSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
