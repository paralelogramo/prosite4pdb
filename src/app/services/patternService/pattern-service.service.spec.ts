import { TestBed } from '@angular/core/testing';

import { PatternServiceService } from './pattern-service.service';

describe('PatternServiceService', () => {
  let service: PatternServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatternServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
