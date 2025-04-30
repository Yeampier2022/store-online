// src/services/productsApi.ts
import http from '@/api/http'; // Tu instancia de http (ej. Axios)
import type { Products, Category, FetchProductsApiResponse, FetchCategoriesApiResponse } from '../types'; // Importa los tipos actualizados

// Interfaz para los parámetros de la API de productos (incluyendo filtros)
interface FetchProductsParams {
  page?: number; // Hacerlos opcionales si tu http.get tiene defaults
  per_page?: number; // Hacerlos opcionales
  search_key?: string;
  category_uuid?: string;
  brand_uuid?: string;
  color_uuid?: string;
  user_uuid?: string; // Si necesitas filtrar por usuario
  // ... otros parámetros que la API acepte
}

// Interfaz para los parámetros de la API de categorías
interface FetchCategoriesParams {
    page?: number;
    per_page?: number; // Usaremos 0 para traer todas
}

/**
 * Llama a la API para obtener la lista de productos con paginación y filtros.
 * @param params - Objeto con parámetros de paginación y filtro.
 * @returns Una Promesa que resuelve con el objeto de respuesta completo de la API (data, paginación, etc.).
 */
export const fetchProducts = async (params: FetchProductsParams = {}): Promise<FetchProductsApiResponse> => {
  // http.get debería manejar la construcción de la query string desde el objeto params
  const response = await http.get('/shop', {
    params: params // Pasa todos los parámetros (paginación + filtros)
  });

   // La respuesta completa de la API está en response.data
   // Ya contiene { data: [...], current_page: ..., last_page: ..., etc. }
   return response.data;
};

/**
 * Llama a la API para obtener la lista de categorías.
 * @param params - Objeto con parámetros de paginación. Usa per_page=0 para todas.
 * @returns Una Promesa que resuelve con el objeto de respuesta completo de la API (data, paginación, etc.).
 */
export const fetchCategories = async (params: FetchCategoriesParams = {}): Promise<FetchCategoriesApiResponse> => {
   // Por defecto, pedimos todas las categorías para el filtro
   const defaultParams = { per_page: 0, page: 1 };
   const mergedParams = { ...defaultParams, ...params }; // Permite sobrescribir si se necesita paginación para categorías

   const response = await http.get('/shop/categories', {
     params: mergedParams // Pasa los parámetros
   });

   // La respuesta completa de la API está en response.data
   // Ya contiene { data: [...], current_page: ..., last_page: ..., etc. }
   return response.data;
};

// Si tuvieras endpoints para marcas y colores, añadirías funciones similares:
// export const fetchBrands = async (params: any = {}): Promise<any> => { ... }
// export const fetchColors = async (params: any = {}): Promise<any> => { ... }