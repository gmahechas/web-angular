import { TestBed, async, inject } from '@angular/core/testing';

import { UserExistGuard } from './user-exist.guard';

describe('UserExistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserExistGuard]
    });
  });

  it('should ...', inject([UserExistGuard], (guard: UserExistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
