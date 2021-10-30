import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/product.model";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productList: Product[];
  subTotal = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.productList = this.cartService.getCart();
    this.productList.forEach(p => this.subTotal = this.subTotal + p.price);
  }

}
