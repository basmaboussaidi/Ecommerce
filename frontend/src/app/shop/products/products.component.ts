import {Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from "../../service/products.service";
import {Product} from "../../model/product.model";
import {Category} from "../../model/category.model";
import {CategoryService} from "../../service/category.service";
import {CartService} from "../../service/cart.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  productsCopy: Product[];
  categories: Category[];

  constructor(private productsService: ProductsService, private categoriesService: CategoryService,
              private router: Router,
              private cartService: CartService,
              private authenticationService: AuthenticationService

  ) { }


  ngOnInit(): void {
    this.productsService.getAll().subscribe(res => {
      this.products = res
      this.productsCopy = res;
    });
    this.categoriesService.getAll().subscribe(res => this.categories = res);
  }

  filterByPrice() {
    const amountFrom: number = +(<HTMLInputElement>document.getElementById("amount1")).value;
    const amountTo: number = +(<HTMLInputElement>document.getElementById("amount2")).value;
    this.products = this.productsCopy.filter(p => p.price >= amountFrom && p.price <= amountTo);
  }

  filterByCategory(name: string) {
    this.products = this.categories.find(c => c.name === name).products;

  }

  filterByName() {
    const name =(<HTMLInputElement>document.getElementById("search-value")).value.toLowerCase();
    this.products = this.productsCopy.filter(p => p.name.toLowerCase().startsWith(name));

  }

  getAllProducts() {
    this.products = this.productsCopy;
  }


  addToCart(product: Product) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    } else {
      this.cartService.addToCart(product);
    }
  }
}
