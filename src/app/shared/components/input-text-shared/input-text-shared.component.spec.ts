import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextSharedComponent } from './input-text-shared.component';

describe('InputTextSharedComponent', () => {
  let component: InputTextSharedComponent;
  let fixture: ComponentFixture<InputTextSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTextSharedComponent ]
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
