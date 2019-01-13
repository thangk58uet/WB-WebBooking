import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTourInfoComponent } from './popup-tour-info.component';

describe('PopupTourInfoComponent', () => {
  let component: PopupTourInfoComponent;
  let fixture: ComponentFixture<PopupTourInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupTourInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupTourInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
