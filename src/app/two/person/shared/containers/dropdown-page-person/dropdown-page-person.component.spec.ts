import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPagePersonComponent } from './dropdown-page-person.component';

describe('DropdownPagePersonComponent', () => {
  let component: DropdownPagePersonComponent;
  let fixture: ComponentFixture<DropdownPagePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownPagePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPagePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
