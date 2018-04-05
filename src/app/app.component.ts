import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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
      username: ['Hii', [Validators.required, Validators.minLength(3)]],
      email: [{'value' : 'worst', 'disabled': false}, Validators.required],
      password: ['Password', [Validators.required, Validators.minLength(3)]]
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
