import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageMacroprojectComponent } from './form-page-macroproject.component';

describe('FormPageMacroprojectComponent', () => {
  let component: FormPageMacroprojectComponent;
  let fixture: ComponentFixture<FormPageMacroprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPageMacroprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageMacroprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
