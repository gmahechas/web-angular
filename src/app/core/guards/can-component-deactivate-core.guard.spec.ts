import { TestBed, async, inject } from '@angular/core/testing';

import { CanComponentDeactivateCoreGuard } from './can-component-deactivate-core.guard';

describe('CanComponentDeactivateCoreGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanComponentDeactivateCoreGuard]
    });
  });

  it('should ...', inject([CanComponentDeactivateCoreGuard], (guard: CanComponentDeactivateCoreGuard) => {
    expect(guard).toBeTruthy();
  }));
});
