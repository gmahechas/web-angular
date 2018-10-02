import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMaskSharedComponent } from './input-mask-shared.component';

describe('InputMaskSharedComponent', () => {
  let component: InputMaskSharedComponent;
  let fixture: ComponentFixture<InputMaskSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputMaskSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMaskSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
