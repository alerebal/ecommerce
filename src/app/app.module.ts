import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CartComponent } from './components/shopping-cart/cart/cart.component';
import { FiltersComponent } from './components/shopping-cart/filters/filters.component';
import { ProductListComponent } from './components/shopping-cart/product-list/product-list.component';
import { ProductItemComponent } from './components/shopping-cart/product-list/product-item/product-item.component';
import { CartItemComponent } from './components/shopping-cart/cart/cart-item/cart-item.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './auth.guard';
import { TokenInterceptorService} from 'src/app/services/token-interceptor.service';
import { CapitalizePipe } from './capitalize.pipe';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { PaymentComponent } from './component/payment/payment.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    ShoppingCartComponent,
    CartComponent,
    FiltersComponent,
    ProductListComponent,
    ProductItemComponent,
    CartItemComponent,
    RegisterComponent,
    LoginComponent,
    CapitalizePipe,
    ProductViewComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
