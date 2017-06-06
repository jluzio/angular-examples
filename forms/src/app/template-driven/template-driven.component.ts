import { Component, AfterViewChecked, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { NgForm, ValidatorFn, Validators, FormControl, FormGroup } from '@angular/forms';

import { ObjectRefs } from '../shared';

export class Hobby {
  constructor(public name?: string, public description?: string) { }
}
export class User {
  constructor(public username: string, public email: string, public password: string, public hobbies: Hobby[]) {}
}

@Component({
  moduleId: module.id,
  selector: 'template-driven',
  templateUrl: 'template-driven.component.html'
})
export class TemplateDrivenComponent implements AfterViewChecked, OnInit {
  @ViewChild('templateForm') currentForm: NgForm;
  @ViewChild('username') usernameField: FormControl;
  
  templateForm: NgForm;
  validatorsUpdated = false;

  user = new User("user", "email", "password", [
    new Hobby("Cooking"),
    new Hobby("Dancing")
  ]);
  hobbyRefs = new ObjectRefs();

  ngOnInit() {
    this.user.hobbies.forEach(h => this.addHobbyRef(h));
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.templateForm && this.validatorsUpdated) {
      return;
    }

    this.validatorsUpdated = false;
    this.templateForm = this.currentForm;

    if (this.templateForm && this.templateForm.control.get("username")) {
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

  addHobby() {
    let newHobby = new Hobby();
    this.user.hobbies.push(newHobby);
    this.addHobbyRef(newHobby)
  }

  removeHobby(index: number) {
    this.user.hobbies.splice(index, 1).forEach(
      h => this.hobbyRefs.removeRef(h)
    );
  }

  submit() {
    console.log("submit");
    console.log(this.templateForm);
    console.log(this.user);
    this.debugHobbies();

    // console.log(this.templateForm.control.get("hobbies.hobby_0.name"));
    // console.log(this.templateForm.control.get(["hobbies","hobby_0","name"]));

    //let emailControl = this.templateForm.control.get("email");
    //emailControl.setErrors({ "pattern": true });
    //let passwordControl = this.templateForm.control.get("password");
    //passwordControl.setErrors({ "test": true });   
  }

  addHobbyRef(hobby: Hobby) {
    this.hobbyRefs.addRef(hobby);
  }

  getHobbyId(index: number) {
    let hobby = this.user.hobbies[index];
    return this.hobbyRefs.getRefId(hobby);
  }

  debugHobbies() {
    let hobbyNames = this.user.hobbies.map(((h: Hobby) => h.name)).join();
    console.log(`Hobbies(${this.user.hobbies.length}): [${hobbyNames}]`);
  }

}
