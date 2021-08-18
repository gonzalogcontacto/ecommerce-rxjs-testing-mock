import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  cart$: Subject<Product[]> = new Subject()

  constructor() {
    this.getCart()
  }

  getCart$() : Observable<Product[]> {
     return this.cart$.asObservable() 
  } 

  async getCart() {
    let result = await fetch("http://localhost:3000/cart")

    // Detonar la nueva información al los suscritos del observable
    this.cart$.next(await result.json())
  }

  async getProducts() : Promise<Product[]> {
    let result = await fetch("http://localhost:3000/products");
    return await result.json()
  }

  async addProductToCart(product: Product){ 
    await fetch('http://localhost:3000/cart', {
		          method: 'POST', // or 'PUT'
		          body: JSON.stringify(product), // data can be `string` or {object}!
		          headers:{
			            'Content-Type': 'application/json'
		          }}
            )

    this.getCart()
  }

}
