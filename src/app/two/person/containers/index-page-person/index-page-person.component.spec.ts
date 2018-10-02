import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPagePersonComponent } from './index-page-person.component';

describe('IndexPagePersonComponent', () => {
  let component: IndexPagePersonComponent;
  let fixture: ComponentFixture<IndexPagePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPagePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPagePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
