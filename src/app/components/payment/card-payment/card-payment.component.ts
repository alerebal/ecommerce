import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/interfaces/User';
import { MessengerService } from 'src/app/services/messenger.service';
import { StripeService } from 'src/app/services/stripe.service';
import { userId } from 'src/app/config/global';


@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.css']
})
export class CardPaymentComponent implements OnInit, AfterViewInit {

  user: User;
  userId: string;
  amount: number;
  cartItems: string[] = [];
  products: string[] = [];
  @ViewChild('cardInfo') cardInfo: ElementRef;
  cardError: string;
  card: any;
  afterPay = false;
  successPay = false;
  errorPay = false;
  receiptUrl: string;

  cardExists: boolean = false

  constructor(
    private usersService: UsersService,
    private cartService: CartService,
    private msg: MessengerService,
    private ngZone: NgZone,
    private stripeService: StripeService
  ) {
    this.userId = userId
   }

  ngOnInit(): void {
    this.getUser()
    this.getMsg();
  }

  ngAfterViewInit() {
    this.createPayCard()
  }

  createPayCard() {
    const isCard = elements.getElement('card');
    if(isCard === null) {
      this.card = elements.create('card');
      this.card.mount(this.cardInfo.nativeElement);
      this.card.addEventListener('change', this.onChange.bind(this))
    } else {
      isCard.mount(this.cardInfo.nativeElement);
      isCard.addEventListener('change', this.onChange.bind(this))
    }

  }

  onChange({ error }) {
    if (error) {
      this.ngZone.run(() => this.cardError = error.message);
    } else {
      this.ngZone.run(() => this.cardError = null);
    }
  }

  async onClick() {
    const { token, error } = await stripe.createToken(this.card)
    if (token) {
      this.stripeService.sendToken({stripeToken: token.id, amount: this.amount, userId: this.user._id, cartItems: this.cartItems, products: this.products}).subscribe((res: any) => {
        this.receiptUrl = res.receipt_url;
        this.afterPay = true;
        this.successPay = true;
        this.errorPay = false
      }),
      (err: any) => {
        this.afterPay = true;
        this.errorPay = true;
        this.successPay = false;
      }
    } else {
      this.ngZone.run(() => this.cardError = error.message);
    }
  }

  getUser() {
    this.usersService.getUser(this.userId).subscribe((user) => {
      this.user = user;
      this.getCart()
    })
  }

  getCart() {
    this.cartService.getCarItemstoPayment(this.userId).subscribe(res => {
      this.cartItems = res.map(item => item._id);
      this.products = res.map(item => item.productId);
      this.amount = res.reduce((acc, val) => acc + val.price, 0);
    })
  }

  getMsg() {
    this.msg.getMsg().subscribe(() => {
      this.getCart();
    })
  }


}
