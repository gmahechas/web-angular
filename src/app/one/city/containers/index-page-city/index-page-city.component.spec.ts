import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageCityComponent } from './index-page-city.component';

describe('IndexPageCityComponent', () => {
  let component: IndexPageCityComponent;
  let fixture: ComponentFixture<IndexPageCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
