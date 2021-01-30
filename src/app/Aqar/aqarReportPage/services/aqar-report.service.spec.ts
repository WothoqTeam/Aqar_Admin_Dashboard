import { TestBed } from '@angular/core/testing';

import { AqarReportService } from './aqar-report.service';

describe('AqarReportService', () => {
  let service: AqarReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AqarReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
