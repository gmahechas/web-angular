import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSwitchSharedComponent } from './input-switch-shared.component';

describe('InputSwitchSharedComponent', () => {
  let component: InputSwitchSharedComponent;
  let fixture: ComponentFixture<InputSwitchSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputSwitchSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSwitchSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
