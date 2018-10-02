import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageUserOfficeProjectComponent } from './index-page-user-office-project.component';

describe('IndexPageUserOfficeProjectComponent', () => {
  let component: IndexPageUserOfficeProjectComponent;
  let fixture: ComponentFixture<IndexPageUserOfficeProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageUserOfficeProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageUserOfficeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
