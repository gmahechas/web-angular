import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-input-calendar-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input-calendar-shared.component.html',
  styles: []
})
export class InputCalendarSharedComponent implements OnInit {

  es: any;
  @Input() dateFormat: string;
  @Input() showButtonBar: boolean;
  @Input() inline: boolean;
  @Input() hourFormat: number;
  @Input() showIcon: boolean;
  @Input() inputMinDate: string;
  @Input() inputMaxDate: string;
  minDate: Date;
  maxDate: Date;
  @Input() inputInvalidDates: string[];
  invalidDates: Date[] = [];
  @Input() monthNavigator: boolean;
  @Input() yearNavigator: boolean;
  @Input() yearRange: string;
  @Input() showTime: boolean;

  constructor() { }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      monthNames: [
        'Enero', 'Febrero', 'Marzo', 'Abril',
        'Mayo', 'Junio', 'Julio', 'Agosto',
        'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ],
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      today: 'Hoy',
      clear: 'Borrar'
    };

    this.minDate = new Date(this.inputMinDate);
    this.maxDate = new Date(this.inputMaxDate);

    this.inputInvalidDates.map(date => this.invalidDates.push(new Date(date)));
  }

}
