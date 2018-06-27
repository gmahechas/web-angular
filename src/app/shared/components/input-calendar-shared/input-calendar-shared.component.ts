import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-calendar-shared',
  templateUrl: './input-calendar-shared.component.html',
  styleUrls: ['./input-calendar-shared.component.scss']
})
export class InputCalendarSharedComponent implements OnInit {

  es: any;
  @Input() dateFormat: string;
  @Input() showButtonBar: boolean;
  @Input() inline: boolean;

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
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Borrar'
    };
  }

}
