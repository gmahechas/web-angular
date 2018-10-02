import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCoreComponent } from './confirm-core.component';

describe('ConfirmCoreComponent', () => {
  let component: ConfirmCoreComponent;
  let fixture: ComponentFixture<ConfirmCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
