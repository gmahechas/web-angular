import { TestBed, async, inject } from '@angular/core/testing';

import { ProfileExistGuard } from './profile-exist.guard';

describe('ProfileExistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileExistGuard]
    });
  });

  it('should ...', inject([ProfileExistGuard], (guard: ProfileExistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
