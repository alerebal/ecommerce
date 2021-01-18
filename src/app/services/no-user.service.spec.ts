import { TestBed } from '@angular/core/testing';

import { NoUserService } from './no-user.service';

describe('NoUserService', () => {
  let service: NoUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
