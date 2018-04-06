import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

function usernameCheck(c: AbstractControl): {[key: string]: Boolean} | null {
  if (c.value === 'karthik') {
    return { 'name' : true };
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
      password: ['', [Validators.required, Validators.minLength(6)]]
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
