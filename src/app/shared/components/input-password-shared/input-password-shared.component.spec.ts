import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPasswordSharedComponent } from './input-password-shared.component';

describe('InputPasswordSharedComponent', () => {
  let component: InputPasswordSharedComponent;
  let fixture: ComponentFixture<InputPasswordSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPasswordSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPasswordSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
