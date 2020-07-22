import { TestBed } from '@angular/core/testing';

import { AksService } from './aks.service';

describe('AksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AksService = TestBed.get(AksService);
    expect(service).toBeTruthy();
  });
});
