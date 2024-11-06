import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ValidateCustomNumbersOnlyPattern } from './validators/custom-numbersOnly.validator';
import { ValidateCustomMaxLength } from './validators/custom-maxLengthAndValue.validator';
import Inputmask from 'inputmask';
import { ISeparator } from './validators/separator.model';
import { DirectivesModule } from './directives.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, DirectivesModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'inputMask';

  private fb = new FormBuilder();
  form: FormGroup;

  separators = [
    {decimal: '.', thousand: ''},
    {decimal: '.', thousand: ','},
    {decimal: ',', thousand: ''},
    {decimal: ',', thousand: '.'}
  ]

  constructor(){
    this.form = this.fb.group({
      'input1': [
        '', 
        [
          //ValidateCustomMaxLength(5),
          //ValidateCustomNumbersOnlyPattern(true, this.separators[0]),
        ]
      ],
      'input2': [
        '', 
        [
          // ValidateCustomMaxLength(5),
          // ValidateCustomNumbersOnlyPattern(true, this.separators[1])
        ]
      ],
      'input3': [
        '',
        [
          // ValidateCustomMaxLength(5),
          // ValidateCustomNumbersOnlyPattern(true, this.separators[2])
        ] 
      ],
      'input4': [
        '', 
        [
          // ValidateCustomMaxLength(5),
          // ValidateCustomNumbersOnlyPattern(true, this.separators[3])
        ]
      ],
    })
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(value => {
      console.log('rmc form', value);
      // value.forEach((element: string) => {
        // console.log('rmc value', element, typeof element, Number.parseFloat(element));        
      // });
    })

    this.getInputMask(1, this.separators[0]);
    this.getInputMask(2, this.separators[1]);
    this.getInputMask(3, this.separators[2]);
    this.getInputMask(4, this.separators[3]);
  }

  getInputMask(index: number, separators: ISeparator): void {
    let inputHTMLElement = document.getElementById(`input${index}`);

    if (inputHTMLElement) {
      Inputmask(``,
        {
          // alias: 'numeric',
          groupSeparator: separators.thousand,
          radixPoint: separators.decimal, 
          regex: '[0-9]{2,4}\\' + separators.decimal + '[0-9]{2,4}',
          digits: '2',
          max: 100,   
          rightAlign: true,
          insertMode: true,
          allowMinus: true,
          negationSymbol: {
            front: "-", // "("
            back: "" // ")"
          },
          prefix: "",
          suffix: "",
          // digitsOptional: false,  
          // placeholder: `0${separators.decimal}00`,
          // showMaskOnFocus: true,
          // unmaskAsNumber: true,
          positionCaretOnClick: 'radixFocus',
          inputType: "text",
          inputmode: 'decimal',
          onKeyDown: () => {

          }        
        }
      ).mask(inputHTMLElement);
    }
  }  
}


// TODO apply regex

// TODO return always number type
