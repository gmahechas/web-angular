import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEstateComponent } from './form-estate.component';

describe('FormEstateComponent', () => {
  let component: FormEstateComponent;
  let fixture: ComponentFixture<FormEstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
