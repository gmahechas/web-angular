import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageCompanyComponent } from './index-page-company.component';

describe('IndexPageCompanyComponent', () => {
  let component: IndexPageCompanyComponent;
  let fixture: ComponentFixture<IndexPageCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
