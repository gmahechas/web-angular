import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMacroprojectComponent } from './form-macroproject.component';

describe('FormMacroprojectComponent', () => {
  let component: FormMacroprojectComponent;
  let fixture: ComponentFixture<FormMacroprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMacroprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMacroprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
