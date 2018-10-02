import { TestBed, async, inject } from '@angular/core/testing';

import { MacroprojectExistGuard } from './macroproject-exist.guard';

describe('MacroprojectExistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MacroprojectExistGuard]
    });
  });

  it('should ...', inject([MacroprojectExistGuard], (guard: MacroprojectExistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
