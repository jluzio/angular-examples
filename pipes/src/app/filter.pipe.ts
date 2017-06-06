import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: string[], regexp: string): any {
    let filteredItems = values.filter( v => v.match(regexp) );
    console.log(`filter('${values}', '${regexp}')='${filteredItems}'`)
    return filteredItems;
  }

}
