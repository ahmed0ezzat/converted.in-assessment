import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product.model';
import { ProductState } from '../../store/reducers/product.reducer';
import * as ProductActions from '../../store/actions/product.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  allProducts: Product[] = [];
  displayedProducts$: Observable<Product[]>;
  currentPage: number = 1;
  productsPerPage: number = 10;
  isLoading: boolean = false;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<{ productState: ProductState }>, private router: Router) {
    this.displayedProducts$ = store.pipe(select(state => state.productState.displayedProducts));
    this.isLoading$ = store.pipe(select('productState', 'isLoading'));

  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  truncateString(input: string): string {
    const maxLength = 40;
    if (input.length <= maxLength) {
      return input;
    } else {
      return input.substring(0, maxLength) + "...";
    }
  }
  loadMoreProducts(): void {
    this.store.dispatch(ProductActions.setLoading({ isLoading: true }));
    this.store.dispatch(ProductActions.loadMoreProducts());
  }

  isElementScrolledToBottom(element: any): boolean {
    return element.scrollHeight - element.scrollTop === element.clientHeight;
  }

  navigateTo(id: number): void {
    this.router.navigate(['/product/' + id]);
  }

  numRound(value: any) {
    return Math.round(value).toFixed(1)
  }
}
