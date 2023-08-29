import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pkmTypeColor'
})
export class PkmTypeColorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
