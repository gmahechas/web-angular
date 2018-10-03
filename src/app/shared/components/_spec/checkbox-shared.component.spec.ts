import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';
import { CheckboxSharedComponent } from '../checkbox-shared/checkbox-shared.component';

describe('CheckboxSharedComponent', () => {
  let component: CheckboxSharedComponent;
  let fixture: ComponentFixture<CheckboxSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CheckboxModule],
      declarations: [ CheckboxSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
