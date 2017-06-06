import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'impureFilter',
  pure: false
})
export class ImpureFilterPipe implements PipeTransform {

  transform(values: string[], regexp: string): any {
    let filteredItems = values.filter( v => v.match(regexp) );
    console.log(`filter('${values}', '${regexp}')='${filteredItems}'`)
    return filteredItems;
  }

}
