import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundCoreComponent } from './not-found-core.component';

describe('NotFoundCoreComponent', () => {
  let component: NotFoundCoreComponent;
  let fixture: ComponentFixture<NotFoundCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
