import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDetailBasicComponent } from './material-detail-basic.component';

describe('MaterialDetailBasicComponent', () => {
  let component: MaterialDetailBasicComponent;
  let fixture: ComponentFixture<MaterialDetailBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialDetailBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDetailBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
