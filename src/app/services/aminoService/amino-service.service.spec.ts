import { TestBed } from '@angular/core/testing';

import { AminoServiceService } from './amino-service.service';

describe('AminoServiceService', () => {
  let service: AminoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AminoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
