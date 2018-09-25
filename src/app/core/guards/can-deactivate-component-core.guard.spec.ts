import { TestBed, async, inject } from '@angular/core/testing';

import { CanDeactivateComponentCoreGuard } from './can-deactivate-component-core.guard';

describe('CanDeactivateComponentCoreGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateComponentCoreGuard]
    });
  });

  it('should ...', inject([CanDeactivateComponentCoreGuard], (guard: CanDeactivateComponentCoreGuard) => {
    expect(guard).toBeTruthy();
  }));
});
