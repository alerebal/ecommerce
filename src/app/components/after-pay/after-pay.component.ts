import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-after-pay',
  templateUrl: './after-pay.component.html',
  styleUrls: ['./after-pay.component.css']
})
export class AfterPayComponent implements OnInit {

  @Input() successPay: boolean;
  @Input() errorPay: boolean;
  @Input() receiptUrl: string;

  constructor() { }

  ngOnInit(): void {
  }

}
