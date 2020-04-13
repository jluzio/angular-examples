import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  private opened = false;

  @HostBinding('class.open') get isOpened() {
    return this.opened;
  }

  @HostListener('click') open() {
    this.opened = true;
  }

  @HostListener('mouseleave') close() {
    this.opened = false;
  }

  constructor() { }

}
