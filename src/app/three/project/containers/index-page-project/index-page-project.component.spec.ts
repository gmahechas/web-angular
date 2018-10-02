import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageProjectComponent } from './index-page-project.component';

describe('IndexPageProjectComponent', () => {
  let component: IndexPageProjectComponent;
  let fixture: ComponentFixture<IndexPageProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
