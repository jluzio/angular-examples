import { Directive, ElementRef, Renderer, HostListener, HostBinding, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[dirHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input('dirHighlight') highlightColor = "green";
  @Input('defaultColor') defaultColor = "white";
  private bgColor: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    //this.applyStyle();
  }

  @HostListener('mouseenter', ['$event']) onMouseEnter(event: any) {
    this.bgColor = this.highlightColor;
    console.log("Event[mouseenter]: " + event);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.bgColor = this.defaultColor;
  }

  @HostBinding('style.backgroundColor') get getBgColor() {
    return this.bgColor;
  }

  ngOnInit() {
    this.bgColor = this.defaultColor;
    console.log("highlightColor: " + this.highlightColor);
    console.log("defaultColor: " + this.defaultColor);
  }

  applyStyle() {
    this.renderer.setElementStyle(this.elementRef.nativeElement, "backgroundColor", "red");    
  }
  
}
