import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-listbox-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './listbox-shared.component.html',
  styles: []
})
export class ListboxSharedComponent implements OnInit {

  @Input() options: any;
  @Input() optionLabel: string;
  @Input() titleCaseLabel: string;
  @Input() upperCaseLabel: string;
  @Input() style: string;
  @Output() handleChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    this.handleChange.emit(event.value);
  }
}
