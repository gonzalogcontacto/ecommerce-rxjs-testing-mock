import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  products: Object[];

  constructor(private productsService : ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts().then((arrProducts: Object[]) => {
      console.log(arrProducts)
      this.products = arrProducts
    })
  }

  addProductToCart(product: any) {
    // TODO: llamaremos al servicio para guardar en la base de datos el producto en el carrito
    this.productsService.addProductToCart(product)

  }

}
