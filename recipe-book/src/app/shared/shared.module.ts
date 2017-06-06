import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Not useful if exporting 1 module (ie making it available for modules that import it)
@NgModule({
  exports: [
    CommonModule
  ]
})
export class SharedModule { }
