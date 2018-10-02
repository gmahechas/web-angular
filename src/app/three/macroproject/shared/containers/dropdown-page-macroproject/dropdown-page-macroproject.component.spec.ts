import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPageMacroprojectComponent } from './dropdown-page-macroproject.component';

describe('DropdownPageMacroprojectComponent', () => {
  let component: DropdownPageMacroprojectComponent;
  let fixture: ComponentFixture<DropdownPageMacroprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownPageMacroprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPageMacroprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
