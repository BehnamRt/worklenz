import { Pipe, PipeTransform } from "@angular/core";
import * as jalaliMoment from "jalali-moment";

@Pipe({
  name: 'dateFormatter',
  standalone: true
})
export class DateFormatterPipe implements PipeTransform {

  currentDate = jalaliMoment.default();
  currentYear = this.currentDate.jYear();

  transform(value: any) {
    if (value) {
      const date = this.currentDate;
      const isSame = (input: jalaliMoment.Moment, duration: any) =>
        jalaliMoment.default(value).isSame(input, duration);

      const valueDate = jalaliMoment.default(value);
      if (valueDate.jYear() == this.currentYear) {
        if (valueDate.isSame(date.clone(), 'day')) {
          return "امروز";
        } else if (isSame(date.clone().subtract(1, 'day'), 'day')) {
          return "دیروز";
        } else if (isSame(date.clone().add(1, 'day'), 'day')) {
          return "فردا";
        }
        return valueDate.format('jDD jMMMM').toString();
      }
      return valueDate.format('jYYYY/jMM/jDD').toString();
    }
    return null;
  }
}
