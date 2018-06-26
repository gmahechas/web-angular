import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-text-shared',
  templateUrl: './input-text-shared.component.html',
  styleUrls: ['./input-text-shared.component.scss']
})
export class InputTextSharedComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() placeholder: string;
  @Input() keyFilter: string;

  constructor() { }

  ngOnInit() {
  }

}
