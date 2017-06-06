import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { DataService } from './../shared/data.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [UserService, DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('async test', async(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    spyOn(dataService, 'getDetails')
      .and
      .returnValue( Promise.resolve("data") );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe("data")
    });
  }));

  it('async test via fakeAsync', fakeAsync(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    spyOn(dataService, 'getDetails')
      .and
      .returnValue( Promise.resolve("data") );
    fixture.detectChanges();
    tick();
    expect(component.data).toBe("data");
  }));

  describe('this test', () => {
    it('looks async but is synchronous', <any>fakeAsync((): void => {
        let flag = false;
        setTimeout(() => { flag = true; }, 100);
        expect(flag).toBe(false);
        tick(50);
        expect(flag).toBe(false);
        tick(50);
        expect(flag).toBe(true);
      }));
  });
  
});
