import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxNotifierService } from 'ngx-notifier';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    loginForm: FormGroup;

    constructor(
        private cookieService: CookieService,
        private authService: AuthService,
        private ngxNotifierService: NgxNotifierService,
        private router: Router
    ) {}
  
    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(''),
            password: new FormControl(''),
        });
    }

    onSubmit() {this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password)
        .then((result) => {
            let now = new Date();
            let time = now.getTime();
            let expired = time + 1000 * 60 * 60 * 8;
            now.setTime(expired);
            this.cookieService.set('accessToken', result.user['auth'].currentUser.accessToken, now);
            this.ngxNotifierService.createToast('You are successfully logged in', 'success', 3000);
            this.router.navigateByUrl('/tool');
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/invalid-email':
                    this.ngxNotifierService.createToast('You have entered an invalid email address', 'danger', 3000);
                    break;
                case 'auth/user-disabled':
                    this.ngxNotifierService.createToast('This user has been disabled', 'danger', 3000);
                    break;
                case 'auth/user-not-found':
                    this.ngxNotifierService.createToast('An user with this email address has not been found', 'danger', 3000);
                    break;
                case 'auth/wrong-password':
                    this.ngxNotifierService.createToast('You have entered the wrong password', 'danger', 3000);
                    break;
                default:
                    this.ngxNotifierService.createToast('Something Went Wrong', 'danger', 3000);
                    break;
            }
        });
    }
}
