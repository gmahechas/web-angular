import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-calendar-shared',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input-calendar-shared.component.html',
  styles: []
})
export class InputCalendarSharedComponent implements OnInit {

  locale: any;
  @Input() group: FormGroup;
  @Input() groupName: string;
  @Input() controlName: string;
  @Input() dataType: string;
  @Input() dateFormat: string;
  @Input() timeOnly: boolean;
  @Input() showSeconds: boolean;
  @Input() hourFormat = '24';

  constructor() { }

  ngOnInit() {
    this.locale = {
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
  }

}
