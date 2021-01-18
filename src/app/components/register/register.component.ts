import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { passwordsMatchValidator } from 'src/app/directives/passwordValidator';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  registerForm: FormGroup;
  @ViewChild('focus') focus: ElementRef;
  errorMsg: string = "";

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit() {
    this.focus.nativeElement.focus();
  }

  buildForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ''
    },
    {
      validators: passwordsMatchValidator
    })
  }

  register() {
    this.userService.newUser(this.registerForm.value).subscribe(res => {
      localStorage.setItem('token', res['token']);
      localStorage.setItem('userId', res['newUserId'])
      this.router.navigate(['/shop']);
    },
    err => {
      this.errorMsg = err.error.message;
      setTimeout(() => {
        this.errorMsg = ""
      }, 3000)
    });
  }


  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }
}
