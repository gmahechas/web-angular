import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-mask-shared',
  templateUrl: './input-mask-shared.component.html',
  styleUrls: ['./input-mask-shared.component.scss']
})
export class InputMaskSharedComponent implements OnInit {

  @Input() mask: string;

  constructor() { }

  ngOnInit() {
  }

}
