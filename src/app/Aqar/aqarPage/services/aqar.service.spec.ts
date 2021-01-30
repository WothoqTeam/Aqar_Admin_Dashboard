import { TestBed } from '@angular/core/testing';

import { AqarService } from './aqar.service';

describe('AqarService', () => {
  let service: AqarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AqarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
