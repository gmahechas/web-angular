import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationErrorsSharedComponent } from './validation-errors-shared.component';

describe('ValidationErrorsSharedComponent', () => {
  let component: ValidationErrorsSharedComponent;
  let fixture: ComponentFixture<ValidationErrorsSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationErrorsSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationErrorsSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
