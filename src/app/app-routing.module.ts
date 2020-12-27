import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';



const routes: Routes = [
  {path: '',redirectTo: '/shop', pathMatch: 'full' },
  {path: 'shop', component: ShoppingCartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
