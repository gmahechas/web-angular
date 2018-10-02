import { TestBed, async, inject } from '@angular/core/testing';

import { EstateExistGuard } from './estate-exist.guard';

describe('EstateExistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstateExistGuard]
    });
  });

  it('should ...', inject([EstateExistGuard], (guard: EstateExistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
