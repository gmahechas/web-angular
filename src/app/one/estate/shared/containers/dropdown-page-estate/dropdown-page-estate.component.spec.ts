import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPageEstateComponent } from './dropdown-page-estate.component';

describe('DropdownPageEstateComponent', () => {
  let component: DropdownPageEstateComponent;
  let fixture: ComponentFixture<DropdownPageEstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownPageEstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPageEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
