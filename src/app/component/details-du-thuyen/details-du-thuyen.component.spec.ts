import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDuThuyenComponent } from './details-du-thuyen.component';

describe('DetailsDuThuyenComponent', () => {
  let component: DetailsDuThuyenComponent;
  let fixture: ComponentFixture<DetailsDuThuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDuThuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDuThuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
