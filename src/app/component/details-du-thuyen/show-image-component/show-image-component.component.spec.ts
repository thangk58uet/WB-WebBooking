import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowImageComponentComponent } from './show-image-component.component';

describe('ShowImageComponentComponent', () => {
  let component: ShowImageComponentComponent;
  let fixture: ComponentFixture<ShowImageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowImageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowImageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
