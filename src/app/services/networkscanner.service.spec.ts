import { TestBed } from '@angular/core/testing';

import { NetworkscannerService } from './networkscanner.service';

describe('NetworkscannerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkscannerService = TestBed.get(NetworkscannerService);
    expect(service).toBeTruthy();
  });
});
