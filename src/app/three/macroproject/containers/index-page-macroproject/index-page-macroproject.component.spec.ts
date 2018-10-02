import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageMacroprojectComponent } from './index-page-macroproject.component';

describe('IndexPageMacroprojectComponent', () => {
  let component: IndexPageMacroprojectComponent;
  let fixture: ComponentFixture<IndexPageMacroprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageMacroprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageMacroprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
