import { Injectable } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { }

  async createUser(userData: IUser) {
    let userCred = await this.auth.createUserWithEmailAndPassword(userData.email as string, userData.password as string)

      //create users collection so we can store user details (except password) in firestore database
      await this.db.collection('users').add({
        name: userData.name,
        email: userData.email,
        age: userData.age,
        phoneNumber: userData.phoneNumber
      }) 
  }
}
