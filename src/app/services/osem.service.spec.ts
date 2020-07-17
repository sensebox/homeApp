import { TestBed } from '@angular/core/testing';

import { OsemService } from './osem.service';

describe('OsemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OsemService = TestBed.get(OsemService);
    expect(service).toBeTruthy();
  });
});
