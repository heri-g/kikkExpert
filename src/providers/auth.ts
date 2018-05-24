import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs';
// import { FirestoreProvider } from '../../providers';
import firebase from 'firebase';
// import { User } from '../../models';

@Injectable()

export class AuthProvider {

    private user: firebase.User;

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
    
    signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

}