import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductState } from 'src/app/store/product.reducer';
import * as ProductActions from '../../../store/product.actions';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  categories: String[] | any = [];
  activeCategory: string | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  constructor(private store: Store<{ productState: ProductState }>, private productService: ProductService){
  }
  
  ngOnInit(): void {
    this.productService.getCategories().pipe(
      ).subscribe((categories) => { 
        this.categories = categories;
      })
  }

  onFilterChange(filters: { category?: any; minPrice?: any; maxPrice?: any }): void {
    this.activeCategory = filters.category;
    this.store.dispatch(ProductActions.filterProducts({ filters }));
  }

}
