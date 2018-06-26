import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nav-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav-core.component.html',
  styleUrls: ['./nav-core.component.scss']
})
export class NavCoreComponent implements OnInit {

  @Input() menuItems: any[];

  ngOnInit() { }
}
