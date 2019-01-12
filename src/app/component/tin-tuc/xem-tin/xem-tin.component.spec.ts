import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XemTinComponent } from './xem-tin.component';

describe('XemTinComponent', () => {
  let component: XemTinComponent;
  let fixture: ComponentFixture<XemTinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XemTinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XemTinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
