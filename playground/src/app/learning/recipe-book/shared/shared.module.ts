import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '@/app/app-common.module';

// Not useful if exporting 1 module (ie making it available for modules that import it)
@NgModule({
  exports: [
    CommonModule,
    AppCommonModule
  ]
})
export class SharedModule { }
