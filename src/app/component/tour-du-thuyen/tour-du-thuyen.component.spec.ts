import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourDuThuyenComponent } from './tour-du-thuyen.component';

describe('TourDuThuyenComponent', () => {
  let component: TourDuThuyenComponent;
  let fixture: ComponentFixture<TourDuThuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourDuThuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourDuThuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
