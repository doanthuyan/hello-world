import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'customDate'})
export class CustomDate implements PipeTransform {
  transform(value: any): Date | null {
	    if ((typeof value === 'string') && (value.includes('/'))) {
	      const str = value.split('/');
	
	      const year = Number(str[2]);
	      const month = Number(str[1]) - 1;
	      const date = Number(str[0]);
	
	      return new Date(year, month, date);
	    } else if((typeof value === 'string') && value === '') {
	      return new Date();
	    }
	    const timestamp = typeof value === 'number' ? value : Date.parse(value);
	    return isNaN(timestamp) ? null : new Date(timestamp);
  }
}