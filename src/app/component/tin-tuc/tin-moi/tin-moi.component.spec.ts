import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinMoiComponent } from './tin-moi.component';

describe('TinMoiComponent', () => {
  let component: TinMoiComponent;
  let fixture: ComponentFixture<TinMoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinMoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinMoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
