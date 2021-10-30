import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../service/products.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: number;
  product: Product;
  constructor(private productsService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.productsService.getById(this.id).subscribe(res => this.product = res)
  }

}
