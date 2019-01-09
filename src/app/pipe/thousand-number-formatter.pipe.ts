import {PipeTransform, Pipe} from '@angular/core';
@Pipe({
    name: 'thousandNumberFormatter'
})
export class ThousandNumberFormatter implements PipeTransform {
    transform(value: number, fixedNumber?: number): any {
        if (!value) {
            return 0;
        }
        const x = value.toString();
        if (x.indexOf('.') >= 0) {
            const parts = x.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            // tslint:disable-next-line:triple-equals
            if (fixedNumber == 0) {
                return parts[0];
            }
            if (fixedNumber) {
                parts[1] = Math.round((+parts[1])).toString().slice(0, fixedNumber);
            }
            return parts.join('.');
        } else {
            return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    }
}
