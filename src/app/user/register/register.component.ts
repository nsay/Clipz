import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import { AngularFirestore  } from '@angular/fire/compat/firestore';

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

  constructor(private auth: AngularFireAuth, private db: AngularFirestore){}

  async register(): Promise<void> {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your acc ount is being created.';
    this.alertColor = 'blue'
    this.inSubmission = true;

    let { name, email, age, password, phoneNumber } = this.registerForm.value;

    try {
      let userCred = await this.auth.createUserWithEmailAndPassword(email as string, password as string)

      //create users collection so we can store user details (except password) in firestore database
      await this.db.collection('users').add({
        name: name,
        email: email,
        age: age,
        phoneNumber: phoneNumber
      }) 
    } catch (e){  // when email (or invalid email) has already been used
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
