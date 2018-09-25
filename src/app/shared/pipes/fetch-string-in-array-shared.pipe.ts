import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fetchStringInArrayShared'
})
export class FetchStringInArraySharedPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    const splitField = args.split('.');
    const fieldsLength = splitField.length;

    // FIXME:
    switch (fieldsLength) {
      case 1: return (value[splitField[0]])
        ? value[splitField[0]] : args;
      case 2: return (value[splitField[0]][splitField[1]])
        ? value[splitField[0]][splitField[1]] : args;
      case 3: return (value[splitField[0]][splitField[1]][splitField[2]])
        ? value[splitField[0]][splitField[1]][splitField[2]] : args;
      case 4: return (value[splitField[0]][splitField[1]][splitField[2]][splitField[3]])
        ? value[splitField[0]][splitField[1]][splitField[2]][splitField[3]] : args;
      default: return args;
    }

  }

}
