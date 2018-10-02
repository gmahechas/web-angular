import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormQuestionSharedComponent } from './dynamic-form-question-shared.component';

describe('DynamicFormQuestionSharedComponent', () => {
  let component: DynamicFormQuestionSharedComponent;
  let fixture: ComponentFixture<DynamicFormQuestionSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormQuestionSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormQuestionSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
