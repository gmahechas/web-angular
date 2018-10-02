import { TestBed, async, inject } from '@angular/core/testing';

import { ProjectExistGuard } from './project-exist.guard';

describe('ProjectExistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectExistGuard]
    });
  });

  it('should ...', inject([ProjectExistGuard], (guard: ProjectExistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
