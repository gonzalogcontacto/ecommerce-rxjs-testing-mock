import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  cart$: Subject<Object[]> = new Subject()

  constructor() {
    this.getCart()
  }

  getCart$() : Observable<Object[]> {
     return this.cart$.asObservable() 
  } 

  async getCart() {
    let result = await fetch("http://localhost:3000/cart")

    // Detonar la nueva información al los suscritos del observable
    this.cart$.next(await result.json())
  }

  async getProducts() {
    let result = await fetch("http://localhost:3000/products");
    return await result.json()
  }

  async addProductToCart(product){ 
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
