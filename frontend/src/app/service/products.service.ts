import { Injectable } from '@angular/core';
import {Category} from "../model/category.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Product[]>(`${environment.apiUrl}/products/all`);
  }

  getById(id) {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }
}
