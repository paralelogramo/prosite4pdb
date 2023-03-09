import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

    transform(value: Date, ...args: unknown[]): string {
        let dateValue = value.toString().split('T')[0];
        let dateInfo = dateValue.split('-');
        var date = new Date(dateValue);
        return date.toLocaleDateString('en-EN', { month: 'long' }) + ' ' + dateInfo[2] + ', ' + dateInfo[0];
    }
}
