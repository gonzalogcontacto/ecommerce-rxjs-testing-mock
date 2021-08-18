import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: Object[];

  constructor(private productService : ProductsService) { }

  ngOnInit(): void {
    this.productService.getCart$().subscribe((productsArr) => {
      console.log('PRODUCT ADDEDD TO CART', productsArr)
      this.cart = productsArr
    })
  }

}
