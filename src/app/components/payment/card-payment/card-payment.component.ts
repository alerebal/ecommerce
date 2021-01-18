import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { StripeService } from 'src/app/services/stripe.service';
import { ChangeUserStateService } from 'src/app/services/change-user-state.service';
import { User } from 'src/app/interfaces/User';
import { NoUser } from 'src/app/interfaces/NoUser';


@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.css']
})
export class CardPaymentComponent implements OnInit, AfterViewInit {

  user: User;
  userId: string;
  noUser: NoUser;
  @Input() isUser: boolean;
  amount: number;
  cartItems: string[] = [];
  products: string[] = [];
  @ViewChild('cardInfo') cardInfo: ElementRef;
  cardError: string;
  isCard: any;
  card: any;
  afterPay = false;
  successPay = false;
  errorPay = false;
  receiptUrl: string;
  noUserEmailChecked = false;

  constructor(
    private usersService: UsersService,
    private cartService: CartService,
    private msg: MessengerService,
    private ngZone: NgZone,
    private stripeService: StripeService,
    private changeState: ChangeUserStateService
  ) {
    this.userId = localStorage.getItem('userId')
   }

  ngOnInit(): void {
    this.getUser()
    this.getMsg();
    this.onChangeState()
  }

  ngAfterViewInit() {
    this.createPayCard()
  }


  onChangeState() {
    this.changeState.getState().subscribe((res: any) => {
      this.noUserEmailChecked = res.emailChecked;
      this.noUser = res.noUser;
    })
  }

  createPayCard() {
    this.isCard = elements.getElement('card');
    if(this.isCard === null) {
      this.card = elements.create('card');
      this.card.mount(this.cardInfo.nativeElement);
      this.card.addEventListener('change', this.onChange.bind(this))
    } else {
      this.isCard.mount(this.cardInfo.nativeElement);
      this.isCard.addEventListener('change', this.onChange.bind(this))
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
        this.errorPay = false;
        this.msg.sendMsg(null, 'erase');
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

  async onClickNoUser() {
    const { token, error } = await stripe.createToken(this.card)
    this.cartItems = JSON.parse(localStorage.getItem('localListProducts'));

    if (token) {
      this.stripeService.sendTokenNoUser({noUser: this.noUser, token, products: this.cartItems}).subscribe((res: any) => {
        this.receiptUrl = res.receipt_url;
        this.afterPay = true;
        this.successPay = true;
        this.errorPay = false;
        localStorage.removeItem('localListProducts')
        this.msg.sendMsg(null, 'erased');
        this.noUserEmailChecked = false;
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
    if(this.isUser) {
      this.usersService.getUser(this.userId).subscribe((user: User) => {
        this.user = user;
        this.getCart()
      })
    }

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
