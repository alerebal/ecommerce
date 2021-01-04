import { Component, OnInit } from '@angular/core';

import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  message: string = '';
  classMsg: string;

  constructor(
    private msg: MessengerService
  ) {}

  ngOnInit() {
    this.handleToGetCard()
  }

  handleToGetCard() {
    this.msg.getMsg().subscribe((res: any) => {
      let msgFromMsgServ = res.message;
      let name = res.product.name;
      if(msgFromMsgServ === 'added') {
        this.message = `The product ${name} has been added`;
        this.classMsg = 'alert alert-success mt-3';
      }
      if (msgFromMsgServ === 'deleted') {
        this.message = `The product ${name} has been deleted`;
        this.classMsg = 'alert alert-danger mt-3';
      }
      setTimeout(() => {
        this.message = ''
      }, 3000)
    })
  }
}
