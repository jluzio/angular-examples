import { 
  Component,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  group
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divTrigger', [
      state('normal', style({ 
        backgroundColor: 'blue',
        //opacity: 1,
        //transform: 'translateX(0px)'
      })),
      state('highlighted', style({ 
        backgroundColor: 'yellow',
        opacity: 0.5,
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate('100ms ease-in'))
    ]),
    trigger('wildTrigger', [
      state('normal', style({ 
        backgroundColor: 'blue',
        //transform: 'translateX(0px)'
      })),
      state('highlighted', style({ 
        backgroundColor: 'yellow',
        transform: 'translateX(100px)'
      })),
      state('shrunken', style({ 
        backgroundColor: 'green',
        transform: 'scale(0.5)'
      })),
      transition('normal <=> highlighted', animate('100ms ease-in')),
      transition('shrunken <=> *', [
        animate(1000, style({borderRadius: '50px'})),
        animate(1000)
      ]),
    ]),
    trigger('listTrigger', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [        
        animate(300, style({
          opacity: 0,
          transform: 'translateX(100px)'
        }))
      ])        
    ]),
    trigger('list2Trigger', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({offset: 0.0, opacity: 0.0, transform: 'translateX(-100px)'}),
          style({offset: 0.5, opacity: 0.5, transform: 'translateX(-050px)'}),
          style({offset: 0.8, opacity: 1.0, transform: 'translateX(-020px)'}),
          style({offset: 1.0, opacity: 1.0, transform: 'translateX(-000px)'})
        ]))
      ]),
      transition('* => void', [        
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)'
          })),
        ])
      ])        
    ]),
  ]
})
export class AppComponent {
  list = ["one", "two", "three"];
  state = "normal";
  wildState = "normal";

  onAnimate() {
    this.state = (this.state == "normal" ? "highlighted" : "normal");
    this.wildState = (this.wildState == "normal" ? "highlighted" : "normal");
  }

  onShrink() {
    this.wildState = "shrunken";
  }

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  onAnimationStart(event: any) {
    console.log("onAnimationStart: " + event);
  }

  onAnimationDone(event: any) {
    console.log("onAnimationDone: " + event);
  }

}
