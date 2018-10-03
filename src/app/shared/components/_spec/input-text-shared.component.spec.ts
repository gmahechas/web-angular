import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TooltipModule } from 'primeng/tooltip';

import { InputTextSharedComponent } from '../input-text-shared/input-text-shared.component';

describe('InputTextSharedComponent', () => {
  let component: InputTextSharedComponent;
  let fixture: ComponentFixture<InputTextSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputTextModule, KeyFilterModule, TooltipModule],
      declarations: [InputTextSharedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
