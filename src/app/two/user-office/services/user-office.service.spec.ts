import { TestBed } from '@angular/core/testing';

import { UserOfficeService } from './user-office.service';

describe('UserOfficeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserOfficeService = TestBed.get(UserOfficeService);
    expect(service).toBeTruthy();
  });
});
