import http from '@/api/http';
import type { Category, Products } from '../types';

export const fetchProducts = async ({
  page = 1,
  per_page = 12
} = {}): Promise<{ data: Products[]; meta: any }> => {
  const response = await http.get('/shop', {
    params: {
      page,
      per_page
    }
  });
  
  return {
    data: response.data.data,
    meta: {
      current_page: response.data.current_page,
      last_page: response.data.last_page,
      per_page: response.data.per_page,
      total: response.data.total
    }
  };

  
};

export const fetchCategories = async (page = 1, per_page = 12): Promise<Category[]> => {
  const response = await http.get('/shop/categories', {
    params: {
      page,
      per_page
    }
  });
  return response.data.data; // Extraemos el array de categorías
};