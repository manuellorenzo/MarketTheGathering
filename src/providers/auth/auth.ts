import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {GoogleAuthProvider } from '@firebase/auth-types';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

	private user: firebase.User;
	private isAnonymous: boolean;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			credentials.password);
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

	getAuthenticated(): boolean {
		return this.user !== null;
	}

	getEmail() {
		return this.user && this.user.email;
	}

	getAnonymous(){
		return this.isAnonymous;
	}

	setAnonymous(isAnonymous:boolean){
		this.isAnonymous = isAnonymous;
	}
	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

	signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
	}

	signAnonymous() {
		return this.afAuth.auth.signInAnonymously();
	}

	resetPassword(email: string): any {
		return this.afAuth.auth.sendPasswordResetEmail(email);
	}

	private oauthSignIn(provider: GoogleAuthProvider) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider);
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
				.then(() => {
					return this.afAuth.auth.getRedirectResult().then(result => {
						// This gives you a Google Access Token.
						// You can use it to access the Google API.
						let token = result.credential.accessToken;
						// The signed-in user info.
						this.isAnonymous = result.user.isAnonymous;
						console.log(JSON.stringify(result.user));
						let user = result.user;
						console.log(token, user);
					}).catch(function (error) {
						// Handle Errors here.
						alert(error.message);
					});
				});
		}
	}

}
