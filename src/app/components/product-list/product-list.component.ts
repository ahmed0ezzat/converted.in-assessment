import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadProducts } from '../../store/product.actions';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product.model';
import { ProductState } from '../../store/product.reducer';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import * as ProductActions from '../../store/product.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // products$: Observable<Product[]>;
  allProducts: Product[] = [];
  displayedProducts$: Observable<Product[]>;
  currentPage: number = 1;
  productsPerPage: number = 10;
  isLoading: boolean = false;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<{ productState: ProductState }>, private scrollDispatcher: ScrollDispatcher, private router: Router) {
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
    this.router.navigate(['/product/' + id]); // Navigate to the specified route
  }

  numRound(value: any){
    return Math.round(value).toFixed(1)
  }
}
