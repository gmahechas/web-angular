import { TestBed } from '@angular/core/testing';

import { MacroprojectService } from './macroproject.service';

describe('MacroprojectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MacroprojectService = TestBed.get(MacroprojectService);
    expect(service).toBeTruthy();
  });
});
