import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../service/products.service";
import {Product} from "../../model/product.model";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  constructor(private productsService: ProductsService,
              private router: Router,
              private cartService: CartService,
              private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.productsService.getAll().subscribe(res => {
      console.log(res)
      if (res.length >= 5) {
        this.products = res.slice(0, 5);
      } else {
        this.products = res;
      }
    })
  }

  addToCart(product: Product) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    } else {
      this.cartService.addToCart(product);
    }
  }

}
