import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageOfficeComponent } from './index-page-office.component';

describe('IndexPageOfficeComponent', () => {
  let component: IndexPageOfficeComponent;
  let fixture: ComponentFixture<IndexPageOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
