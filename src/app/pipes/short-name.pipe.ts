import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {

  transform(fullName: any): any {
    if (!fullName) {
      return;
    }

    const splitedName = fullName.split(' ');
    if (splitedName[1]) {
      splitedName[1] = splitedName[1].charAt(0) + '.';
      return splitedName.join(' ');
    }
    return fullName;
  }

}
