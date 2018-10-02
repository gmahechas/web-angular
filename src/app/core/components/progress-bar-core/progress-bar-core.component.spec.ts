import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarCoreComponent } from './progress-bar-core.component';

describe('ProgressBarCoreComponent', () => {
  let component: ProgressBarCoreComponent;
  let fixture: ComponentFixture<ProgressBarCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressBarCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
