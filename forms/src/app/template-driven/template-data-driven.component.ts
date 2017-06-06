import { Component, AfterViewChecked, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm, ValidatorFn, Validators, FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';

export class Hobby {
  constructor(public name?: string, public description?: string) { }
}

export class User {
  constructor(public username: string, public email: string, public password: string, public hobbies: Hobby[]) {}
}

@Component({
  moduleId: module.id,
  selector: 'template-data-driven',
  templateUrl: 'template-driven.component.html'
})
export class TemplateDataDrivenComponent implements AfterViewChecked {
  @ViewChild('templateForm') currentForm: NgForm;
  @ViewChild('username') usernameField: FormControl;
    
  templateForm: NgForm;
  hobbiesGroup: FormGroup;
  hobbiesArray: FormArray;
  validatorsUpdated = false;
  user = new User("user", "email", "password", [
    new Hobby("Cooking"),
    new Hobby("Dancing")
  ]);

  constructor(public fb: FormBuilder) {
    this.hobbiesGroup = fb.group(
      {'hobbies': fb.array([])}
    );
  }

  ngAfterViewChecked() {
    //this.formChanged();
  }

  formChanged() {
    //console.log("-- formChanged --");

    //console.log(this.currentForm);
    //console.log(this.templateForm);

    if (this.currentForm === this.templateForm && this.validatorsUpdated) {
      return;
    }
    else if ( !(this.currentForm === this.templateForm) ) {
      this.validatorsUpdated = false;
    }

    this.templateForm = this.currentForm;
    if (this.templateForm && !this.validatorsUpdated) {
      if (this.templateForm.control.get("username")) {        
        console.log("Updating validators");
        this.validatorsUpdated = true;
        
        let usernameControl = this.templateForm.control.get("username");
        let emailControl = this.templateForm.control.get("email");
        let passwordControl = this.templateForm.control.get("password");

        usernameControl.setValidators([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24)
        ]);
      }      
    }

    //console.log("== formChanged ==");
  }

  onAddHobby() {
    console.log("onAddHobby")
    this.debugHobbies();
    this.user.hobbies.push(new Hobby());
    this.debugHobbies();
  }

  onRemoveHobby(index: number) {
    console.log("onRemoveHobby:" + index);
    this.debugHobbies();
    this.user.hobbies.splice(index, 1);
    this.debugHobbies();
  }

  debugHobbies() {
    let hobbyNames = this.user.hobbies.map(((h: Hobby) => h.name)).join();
    console.log(`Hobbies(${this.user.hobbies.length}): [${hobbyNames}]`);
  }

  onSubmit() {
    console.log("onSubmit");
    console.log(this.templateForm);
    console.log(this.user);
    this.debugHobbies();
    let emailControl = this.templateForm.control.get("email");
    //emailControl.setErrors({ "pattern": true });
    let passwordControl = this.templateForm.control.get("password");
    //passwordControl.setErrors({ "test": true });   
  }

}
