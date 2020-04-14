import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material.module'
import { CommonModule } from '@angular/common';

@NgModule({
  exports: [
    CommonModule,
    AppMaterialModule
  ]
})
export class AppCommonModule { }
