import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[phoneMask]'
})
export class PhoneMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target.value.replace(/\D/g, '').substring(0, 11);
    event.target.value = this.mask(input);
  }

  format(value) {
    return this.mask(value);
  }

  mask(input: any) {
    const areaCode = input.substring(0, 2);
    const firstPart = input.substring(2, 7);
    const secondPart = input.substring(7, 11);

    let value = '';

    if (input.length > 1) {
      value = `(${areaCode}) `;
    }
    if (input.length >= 7) {
      value = `${value}${firstPart}-${secondPart}`;
    } else if (input.length >= 2) {
      value = `${value}${firstPart}`;
    } else if (input.length >= 1) {
      value = `${value}${areaCode}`;
    }

    return value;
  }
}