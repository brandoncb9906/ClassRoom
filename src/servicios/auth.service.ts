import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { promise } from 'protractor';
import { Router, Route } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public aFauth: AngularFireAuth,
    private router: Router) { }

  login(email:string, password:string){
    return new Promise((resolve, rejected) => {
      this.aFauth.auth.signInWithEmailAndPassword(email,password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    });
  }

  register(email: string, password: string){
    return new Promise ((resolve, reject) =>
    this.aFauth.auth.createUserWithEmailAndPassword(email,password).then(res => {
      resolve(res)
    }).catch(err => reject(err))
    )
  }

  // se realiza un metodo de logueo con firebase para google
  signInWithGoogle() {
    return this.aFauth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
  
  logout(){
    this.aFauth.auth.signOut().then(() => 
      this.router.navigate(['/login'])
      );
  }

}
