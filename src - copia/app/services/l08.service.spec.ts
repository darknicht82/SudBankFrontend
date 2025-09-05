import { TestBed } from '@angular/core/testing';

import { L08Service } from './l08.service';

describe('L08Service', () => {
  let service: L08Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(L08Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
