import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

function usernameCheck(c: AbstractControl): {[key: string]: Boolean} | null {
  if (c.value === 'karthik') {
    return { 'name' : true };
  }
  return null;
}
function ageCheck(min, max): ValidatorFn {
  return (c: AbstractControl): {[key: string]: Boolean} | null => {
    if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range' : true };
    }
    return null;
  };
}
function passwordCheck(c: AbstractControl): {[key: string]: Boolean} | null {
  let passVal = c.get('password');
  let cPassVal = c.get('cpassword');
  if (passVal.pristine || cPassVal.pristine) {
    return null;
  }
  if (passVal.value !== cPassVal.value) {
    return { 'match' : true };
  }
  return null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: any[] = [];
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), usernameCheck]],
      // tslint:disable-next-line:max-line-length
      email: [{'value' : '', 'disabled': false}, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        cpassword: ['', [Validators.required]]
      }, {validator: passwordCheck}),
      age: [0, [Validators.required, ageCheck(13, 19)]]
    });
    /* this.userForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    }); */

    /* this.userForm.setValue({
      username: 'Karthik',
      email: 'Some',
      password: 'Areyy'
    }); */
  }

  save() {
    console.log(this.userForm.value);
    this.users.push(this.userForm.value);
    console.log('hye', this.users);
    this.userForm.reset();
  }
}
