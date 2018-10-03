import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { InputMaskModule } from 'primeng/inputmask';

import { InputMaskSharedComponent } from '../input-mask-shared/input-mask-shared.component';

describe('InputMaskSharedComponent', () => {
  let component: InputMaskSharedComponent;
  let fixture: ComponentFixture<InputMaskSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputMaskModule],
      declarations: [InputMaskSharedComponent]
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
