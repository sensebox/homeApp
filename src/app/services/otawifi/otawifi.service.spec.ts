import { TestBed } from '@angular/core/testing';

import { OtawifiService } from './otawifi.service';

describe('OtawifiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtawifiService = TestBed.get(OtawifiService);
    expect(service).toBeTruthy();
  });
});
