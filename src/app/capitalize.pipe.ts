import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    const name = value.trim().toLocaleLowerCase();const firstChar = name.charAt(0).toUpperCase();
    const nameOut = name.replace(name.charAt(0), firstChar);
    return nameOut;
  }

}
