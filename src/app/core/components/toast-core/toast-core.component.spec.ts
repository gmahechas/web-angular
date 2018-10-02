import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastCoreComponent } from './toast-core.component';

describe('ToastCoreComponent', () => {
  let component: ToastCoreComponent;
  let fixture: ComponentFixture<ToastCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
