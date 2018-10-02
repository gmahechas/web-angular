import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageUserOfficeComponent } from './index-page-user-office.component';

describe('IndexPageUserOfficeComponent', () => {
  let component: IndexPageUserOfficeComponent;
  let fixture: ComponentFixture<IndexPageUserOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageUserOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageUserOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
