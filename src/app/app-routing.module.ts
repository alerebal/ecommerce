import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';



const routes: Routes = [
  {path: '',redirectTo: '/shop', pathMatch: 'full' },
  {path: 'shop', component: ShoppingCartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'productView/:id', component: ProductViewComponent},
  {path: 'payment', component: PaymentComponent},
  // {path: '**', redirectTo: '/login', pathMatch: 'full' }
  // , canActivate: [AuthGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
