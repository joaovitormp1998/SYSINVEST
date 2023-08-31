import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monetaryFormat'
})
export class MonetaryFormatPipe implements PipeTransform {
  transform(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.'));
    }
    
    if (isNaN(value)) {
      return '-';
    }
    
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}
