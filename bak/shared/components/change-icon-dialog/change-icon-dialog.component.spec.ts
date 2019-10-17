import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeIconDialogComponent } from './change-icon-dialog.component';

describe('ChangeIconDialogComponent', () => {
  let component: ChangeIconDialogComponent;
  let fixture: ComponentFixture<ChangeIconDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeIconDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeIconDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
