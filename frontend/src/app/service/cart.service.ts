import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getCart() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  addToCart(product) {
    let products: Product[] = [];
    if (localStorage.getItem('cart')) {
      products = JSON.parse(localStorage.getItem('cart'));
      products.push(product);
      localStorage.setItem('cart', JSON.stringify(products));
    }
    else {
      products.push(product);
      localStorage.setItem('cart', JSON.stringify(products));
    }
  }
}
