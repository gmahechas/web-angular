import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormSharedComponent } from './dynamic-form-shared.component';

describe('DynamicFormSharedComponent', () => {
  let component: DynamicFormSharedComponent;
  let fixture: ComponentFixture<DynamicFormSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
