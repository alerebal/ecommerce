import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NoUserService } from 'src/app/services/no-user.service';
import { ChangeUserStateService } from 'src/app/services/change-user-state.service';
import { NoUser } from 'src/app/interfaces/NoUser';

@Component({
  selector: 'app-no-user-form',
  templateUrl: './no-user-form.component.html',
  styleUrls: ['./no-user-form.component.css']
})
export class NoUserFormComponent implements OnInit {

  noUserForm: FormGroup;
  errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private noUserService: NoUserService,
    private changeState: ChangeUserStateService
  ) { }

  ngOnInit(): void {
    this.formBuilder()
  }

  formBuilder() {
    this.noUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit() {
    this.noUserService.sendNoUser(this.noUserForm.value).subscribe((res: NoUser) => {
      this.changeState.sendChangeState(true, res);
      this.errorMsg = null;
    },
    err => {
      this.errorMsg = err.error.message;
    })
  }

  get name() {
    return  this.noUserForm.get('name')
  }

  get email() {
    return this.noUserForm.get('email')
  }

}
