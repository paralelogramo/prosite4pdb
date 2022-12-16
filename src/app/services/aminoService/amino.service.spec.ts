import { TestBed } from '@angular/core/testing';

import { AminoService } from './amino.service';

describe('AminoService', () => {
  let service: AminoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AminoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
