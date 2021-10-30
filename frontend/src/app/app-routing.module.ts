import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./shop/home/home.component";
import {ShopLayoutComponent} from "./shop/shop-layout/shop-layout.component";
import {AboutComponent} from "./shop/about/about.component";
import {ContactComponent} from "./shop/contact/contact.component";
import {ProductsComponent} from "./shop/products/products.component";
import {ProductDetailsComponent} from "./shop/product-details/product-details.component";
import {AuthLayoutComponent} from "./auth/auth-layout/auth-layout.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {CartComponent} from "./shop/cart/cart.component";
import {AuthGuard} from "./service/auth.guard";

const routes: Routes = [
  {  path: '',
    component: ShopLayoutComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: '', // child route path
        component: HomeComponent, // child route component that the router renders
      },
      {
        path: 'about', // child route path
        component: AboutComponent, // child route component that the router renders
      },
      {
        path: 'contact', // child route path
        component: ContactComponent, // child route component that the router renders
      },
      {
        path: 'shop', // child route path
        component: ProductsComponent, canActivate: [AuthGuard] // child route component that the router renders
      },
      {
        path: 'shop/:id', // child route path
        component: ProductDetailsComponent, canActivate: [AuthGuard] // child route component that the router renders
      },
      {
        path: 'cart', // child route path
        component: CartComponent, canActivate: [AuthGuard] // child route component that the router renders
      },
      ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'login', // child route path
        component: LoginComponent, // child route component that the router renders
      },
      {
        path: 'register', // child route path
        component: RegisterComponent, // child route component that the router renders
      }
      ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
