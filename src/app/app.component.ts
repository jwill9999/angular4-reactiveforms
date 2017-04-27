import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //variables
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUserNames = ['john', 'mary'];

 // form initialised
  ngOnInit() {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })
  }

  // dummy submit only for example
  onSubmit() {
    console.log(this.signUpForm.value);
    alert('Form submitted');
    this.signUpForm.reset();
  }

  // add new hobbies FormControl
  addHobbies() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control)
  }

   // prevents forbidden data beining entered as set above
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (control.value !== null) {
      console.log(this.signUpForm)
      const Control = control.value.toLowerCase()
      if (this.forbiddenUserNames.indexOf(Control) != -1) {
        return { 'invalidName': true }
      } else {
        return null;
      }
    }
    return null;
  }

}
