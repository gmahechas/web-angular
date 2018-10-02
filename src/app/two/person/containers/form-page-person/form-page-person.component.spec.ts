import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPagePersonComponent } from './form-page-person.component';

describe('FormPagePersonComponent', () => {
  let component: FormPagePersonComponent;
  let fixture: ComponentFixture<FormPagePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPagePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPagePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
