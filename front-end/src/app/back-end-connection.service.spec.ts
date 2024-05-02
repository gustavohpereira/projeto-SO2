import { TestBed } from '@angular/core/testing';

import { BackEndConnectionService } from './back-end-connection.service';

describe('BackEndConnectionService', () => {
  let service: BackEndConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackEndConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
