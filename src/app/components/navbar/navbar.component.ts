import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProductState } from 'src/app/store/reducers/product.reducer';
import { loadProducts } from '../../store/actions/product.actions';
import { Observable } from 'rxjs';
import { Product } from 'src/models/product.model';
import * as ProductActions from '../../store/actions/product.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentPage: number = 1;
  products$: Observable<Product[]>;
  cartItems$: Observable<any>;
  allProducts: Product[] = [];
  displayedProducts: Product[] = [];
  productsPerPage: number = 10;
  constructor(private store: Store<{ productState: ProductState }>) {
    this.products$ = store.pipe(select('productState', 'products'));
    this.cartItems$ = this.store.pipe(select('productState', 'cart'));

  }
  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    this.products$.subscribe(products => {
      this.allProducts = products;
      this.updateDisplayedProducts();
    });

  }

  onSearch(event: any): void {
    let keyword = event.target.value;
    if (keyword && keyword !== "" ) {
      this.store.dispatch(ProductActions.searchProducts({ keyword }));
    } else {
      this.store.dispatch(ProductActions.clearSearch());
    }
  }

  updateDisplayedProducts(): void {
    this.displayedProducts = this.allProducts.slice(0, this.currentPage * this.productsPerPage);
  }

  countTotal(items: any[]) {
    let total = 0;
    items.forEach(item => {
      total += (item.quantity * item.product.price )
    })

    return total
  }
}
