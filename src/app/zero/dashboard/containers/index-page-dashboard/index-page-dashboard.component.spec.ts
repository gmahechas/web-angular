import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageDashboardComponent } from './index-page-dashboard.component';

describe('IndexPageDashboardComponent', () => {
  let component: IndexPageDashboardComponent;
  let fixture: ComponentFixture<IndexPageDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
