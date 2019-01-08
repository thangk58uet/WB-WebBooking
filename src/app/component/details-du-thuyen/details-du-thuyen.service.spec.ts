import { TestBed, inject } from '@angular/core/testing';

import { DetailsDuThuyenService } from './details-du-thuyen.service';

describe('DetailsDuThuyenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailsDuThuyenService]
    });
  });

  it('should be created', inject([DetailsDuThuyenService], (service: DetailsDuThuyenService) => {
    expect(service).toBeTruthy();
  }));
});
