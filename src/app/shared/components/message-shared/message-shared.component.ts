import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-shared',
  templateUrl: './message-shared.component.html',
  styles: []
})
export class MessageSharedComponent implements OnInit {

  @Input() severity: 'success' | 'info' | 'warn' | 'error';
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
