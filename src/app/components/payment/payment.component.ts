import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  isUser: boolean;

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(){
    this.isUserGet()
  }

  isUserGet() {
    this.isUser = this.usersService.loggedIn()
  }
}
