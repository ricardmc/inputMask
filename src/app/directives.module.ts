import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ThousandSeparatorDirective } from './thousand.directive';

@NgModule({
  declarations: [ThousandSeparatorDirective],
  imports: [CommonModule],
  exports: [ThousandSeparatorDirective]
})
export class DirectivesModule {}