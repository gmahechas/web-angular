import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageModule } from 'primeng/message';

import { MessageSharedComponent } from '../message-shared/message-shared.component';

describe('MessageSharedComponent', () => {
  let component: MessageSharedComponent;
  let fixture: ComponentFixture<MessageSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MessageModule],
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
