import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    const name = value.trim().toLocaleLowerCase();
    const splitName = name.split(' ');
    let firstChar: string;
    const nameOut: any = [];
    splitName.map(item => {
      firstChar = item.charAt(0).toUpperCase();
      nameOut.push(item.replace(item[0], firstChar))
    });
    return nameOut.join(' ');
  }

}
