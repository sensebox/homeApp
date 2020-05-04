import { TestBed } from '@angular/core/testing';

import { WebcompilerService } from './webcompiler.service';

describe('WebcompilerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebcompilerService = TestBed.get(WebcompilerService);
    expect(service).toBeTruthy();
  });
});
