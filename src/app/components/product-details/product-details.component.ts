import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Product } from '../../../models/product.model';
import { ProductState } from '../../store/reducers/product.reducer';
import * as ProductActions from '../../store/actions/product.actions';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<Product | undefined>;
  selectedQuantity = 1;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ productState: ProductState }>
  ) {
    // const id = + this.route.snapshot.paramMap.get('id');
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
    this.product$ = this.store.pipe(
      select('productState', 'products'),
      map(products => products.find(product => product.id === id))
    );
  }

  ngOnInit(): void {}

  addToCart(product: Product) {
    this.store.dispatch(ProductActions.addToCart({ product, quantity: this.selectedQuantity}));
  }

  getQuantityArray(stock: number): number[] {
    return Array.from({ length: stock }, (_, i) => i + 1);
  }
}
