export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    thumbnail: string;
    rating: { rate: number, count: number };
    reviews? : any[]
    stock? : number
    
  }
