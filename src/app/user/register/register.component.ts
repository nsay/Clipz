import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(100)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
    ]),
    confirm_password: new FormControl('', [
      Validators.required,
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13)
    ]),
  });

  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AuthService){}

  async register(): Promise<void> {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your acc ount is being created.';
    this.alertColor = 'blue'
    this.inSubmission = true;

    try {
      //pass user data to auth service to create user
      this.auth.createUser(this.registerForm.value);
    } catch (e){ 
      this.showAlert = true;
      this.alertMsg = 'An unexpected error occurred. Please try again later.';
      this.alertColor = 'red';
      return
    }

    //success prompts 
    this.alertMsg = 'Success! Your account has been created.';
    this.alertColor = 'green';
    this.inSubmission = false;
  }
}
