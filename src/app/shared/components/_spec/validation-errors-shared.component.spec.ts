import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageModule } from 'primeng/message';

import { ValidationErrorsSharedComponent } from '../validation-errors-shared/validation-errors-shared.component';

fdescribe('ValidationErrorsSharedComponent', () => {
  let component: ValidationErrorsSharedComponent;
  let fixture: ComponentFixture<ValidationErrorsSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MessageModule],
      declarations: [ValidationErrorsSharedComponent]
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
