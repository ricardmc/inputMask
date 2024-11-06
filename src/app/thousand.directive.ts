import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[thousandSeparator]'
})
export class ThousandSeparatorDirective {

  @Input() mask: string = '';
  @Input() regex: string = '';
  @Input() decimalPlaces: number = 2;
  private oldValue: string = '';

  constructor(private el: ElementRef) {
    console.log('ThousandSeparatorDirective constructor called');
  }

  // @HostListener('keypress', ['$event'])
  // onKeypress(event: KeyboardEvent) {
  //   console.log('rmc directive', this.el.nativeElement.value);
  //   this.applyThousandSeparator();
  // }

  // private applyThousandSeparator() {
  //   const value = this.el.nativeElement.value.replace(',','');


  //   this.el.nativeElement.value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");    
  // }
  

  ngOnInit() {
    this.setupInputMask();
  }

  private setupInputMask() {
    const inputElement = this.el.nativeElement as HTMLInputElement;

    const inputmask = new Inputmask({
      // mask: this.mask || '99999999.99',
      // regex: this.regex || '/\B(?=(\d{3})+(?!\d))/g',
      // numericInput: true,
      rightAlign: false,
      // onBeforeMask: (value, opts) => {
      //   // Formatear el valor con separador de miles
      //   return this.formatWithThousandSeparator(value, this.decimalPlaces);
      // },
      onKeyDown: () => {
        this.el.nativeElement.value = this.formatWithThousandSeparator(this.el.nativeElement.value, this.decimalPlaces);
      },
      onUnMask: (maskedValue, unmaskedValue) => {
        // Eliminar el formato de separador de miles
        return unmaskedValue.replace(/,/g, '');
      }
    });

    inputmask.mask(inputElement);
  }

  private formatWithThousandSeparator(value: string, decimalPlaces: number): string {
    console.log('rmc in')
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    if (isNaN(numericValue)) {
      return '';
    }
    console.log('rmc next', numericValue)
    const formattedNumber = numericValue.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    console.log('rmc next', numericValue, formattedNumber)

    return formattedNumber;
  }
}