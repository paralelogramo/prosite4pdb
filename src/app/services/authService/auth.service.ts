import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private afsAuth: AngularFireAuth,
    ) { }

    SignIn(email: string, password: string) {
        return this.afsAuth.signInWithEmailAndPassword(email, password);
    }

    async getCurrentUser() {
        return this.afsAuth.user;
    }
}