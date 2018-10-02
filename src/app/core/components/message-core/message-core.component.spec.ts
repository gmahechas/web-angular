import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCoreComponent } from './message-core.component';

describe('MessageCoreComponent', () => {
  let component: MessageCoreComponent;
  let fixture: ComponentFixture<MessageCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
