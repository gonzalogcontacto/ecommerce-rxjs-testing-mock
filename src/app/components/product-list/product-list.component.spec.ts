
import { ProductListComponent } from './product-list.component';
import { ProductsService } from '../../services/products.service';
import { render, screen } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';

import { of } from 'rxjs';
import { Product } from 'src/app/models/product.model';

describe('ProductListComponent', () => {
  test("could load products from service", async () => {
    const products: Product[] = [
      {
        id: '1',
        name: 'VANS',
        price: '25'
      },
      {
        id: '2',
        name: 'ADIDAS',
        price: '45'
      },
    ];
    
    // Mocking Service
    const productsServiceMock = createMock(ProductsService);
    productsServiceMock.getProducts = jest.fn(() => new Promise(resolve => {products}));

    await render(ProductListComponent, {
      componentProviders: [
        {
          provide: ProductsService,
          useValue: productsServiceMock,
        },  
      ],
    });
    
    setTimeout(() => {
      const listItems = screen.getAllByRole('product');
      expect(listItems).toHaveLength(products.length);
    
      products.forEach((customer) => screen.getByText(new RegExp(customer.name, 'i')));
    }, 0)     
      
  })
});
