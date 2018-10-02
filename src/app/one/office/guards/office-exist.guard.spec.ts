import { TestBed, async, inject } from '@angular/core/testing';

import { OfficeExistGuard } from './office-exist.guard';

describe('OfficeExistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfficeExistGuard]
    });
  });

  it('should ...', inject([OfficeExistGuard], (guard: OfficeExistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
