import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarModule } from 'primeng/calendar';
import { InputCalendarSharedComponent } from '../input-calendar-shared/input-calendar-shared.component';

describe('InputCalendarSharedComponent', () => {
  let component: InputCalendarSharedComponent;
  let fixture: ComponentFixture<InputCalendarSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CalendarModule],
      declarations: [ InputCalendarSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCalendarSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
