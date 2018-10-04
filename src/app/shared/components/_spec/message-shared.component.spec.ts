import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSharedComponent } from '../message-shared/message-shared.component';

describe('MessageSharedComponent', () => {
  let component: MessageSharedComponent;
  let fixture: ComponentFixture<MessageSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageSharedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
