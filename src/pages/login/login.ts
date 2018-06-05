import { Component, ViewChild } from "@angular/core";
import { ViewController, Platform, Nav, NavParams, Keyboard } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthProvider } from "../../providers/auth";

import { HomePage } from '../home/home';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {

    @ViewChild(Nav) nav: Nav;

    public loginForm: FormGroup;
    public loginError: string;

    constructor(public viewCtrl: ViewController, public platform: Platform, public params: NavParams, public formBuilder: FormBuilder, private auth: AuthProvider, public keyboard: Keyboard) {
        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        })
    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    login() {
        let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signInWithEmail(credentials)
        .then( () => {
                this.viewCtrl.dismiss().catch(() => {});
            },
            error => this.loginError = error.message
        );
    }

    closeKeyboard() {
        this.keyboard.close();
    }

}