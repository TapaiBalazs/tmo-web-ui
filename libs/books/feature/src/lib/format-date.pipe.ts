import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(date: string): string {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : null;
  }
}
