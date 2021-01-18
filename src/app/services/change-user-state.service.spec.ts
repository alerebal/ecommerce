import { TestBed } from '@angular/core/testing';

import { ChangeUserStateService } from './change-user-state.service';

describe('ChangeUserStateService', () => {
  let service: ChangeUserStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeUserStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
