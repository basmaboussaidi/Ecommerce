import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-shop-layout',
  templateUrl: './shop-layout.component.html',
  styleUrls: ['./shop-layout.component.css']
})
export class ShopLayoutComponent implements OnInit {
   loggedIn = false;
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private cartService: CartService
  ) { }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue) {
      this.loggedIn = true;
    }
  }

  logout() {
  this.authenticationService.logout();
  this.router.navigate(['/auth/login']);

  }
}
