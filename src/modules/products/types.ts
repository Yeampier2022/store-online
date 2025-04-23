export interface Products {
  name: string;
  description?: string;
  sku?: string;
  width?: string;
  height?: string;
  weight?: string;
  lenght?: string;
  depth?: string;
  price: string;
  make_offer: number;
}
export interface Categories {
  name: string;
  description?: string;
  status?: string;
  image?: string;
}

export interface ProductFilters {
  search_key?: string;
  category_uuid?: string;
  brand_uuid?: string;
  color_uuid?: string;
  per_page?: number;
  page?: number;
}

export interface Pagination {
  total_pages: number;
  per_page: number;
}