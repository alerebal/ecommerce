import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  logInForm: FormGroup;
  @ViewChild('focus') focus: ElementRef;
  errorMsg: string = "";

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formBuilder();
  }

  ngAfterViewInit() {
    this.focus.nativeElement.focus();
  }

  formBuilder() {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  logIn() {
    this.usersService.logIn(this.logInForm.value).subscribe(res => {
      localStorage.setItem('token', res['token']);
      localStorage.setItem('userId', res['userId'])
      this.router.navigate(['/shop']);
    },
    err => {
      this.errorMsg = err.error.message;
      setTimeout(() => {
        this.errorMsg = ''
      }, 3000)
    });
  }

  get email() {
    return this.logInForm.get('email');
  }

  get password() {
    return this.logInForm.get('password');
  }

}
