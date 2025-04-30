export interface Products {
  name: string;
  description?: string;
  sku?: string;
  width?: string;
  image?: string;
  uuid?:string;
  height?: string;
  weight?: string;
  lenght?: string;
  depth?: string;
  price: string;
  make_offer: number;
}
export interface Brand {
  uuid: string;
  name: string;
}

export interface Color {
  uuid: string;
  name: string;
}
export interface ProductFiltersData {
  categories: Category[];
  brands: Brand[];
  colors: Color[];
}
export interface Category {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  description: string;
  status: number;
  image: string;
  created_at: string | null;
  updated_at: string | null;
}
export interface ProductFilters {
  search_key?: string;
  category_uuid?: string;
  brand_uuid?: string;
  color_uuid?: string;
  per_page?: number;
  page?: number;
}
export interface FetchProductsApiResponse extends ApiResponseMeta {
  data: Products[];
}

export interface FetchCategoriesApiResponse extends ApiResponseMeta {
  data: Category[];
}

export interface Pagination {
  total_pages: number;
  per_page: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface ApiResponseMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
