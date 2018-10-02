import { TestBed, async, inject } from '@angular/core/testing';

import { PersonExistGuard } from './person-exist.guard';

describe('PersonExistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonExistGuard]
    });
  });

  it('should ...', inject([PersonExistGuard], (guard: PersonExistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
