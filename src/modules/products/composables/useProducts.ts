import { ref, onMounted } from "vue";
import { fetchProducts } from "../services/productsApi";
import type { Products } from "../types";

export const useInfiniteProducts = () => {
  const products = ref<Products[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref({
    page: 1,
    per_page: 10,
    last_page: 1, // Nuevo: almacenamos la última página
  });

  const loadProducts = async (initialLoad = false) => {
    if (loading.value || pagination.value.page > pagination.value.last_page) return;

    loading.value = true;
    try {
      const { data, meta } = await fetchProducts({
        page: pagination.value.page,
        per_page: pagination.value.per_page,
      });

      if (initialLoad) {
        products.value = data;
      } else {
        products.value = [...products.value, ...data];
      }

      // Actualizamos la paginación con la respuesta de la API
      pagination.value.last_page = meta.last_page;
      
      // Solo incrementamos la página si no hemos llegado al final
      if (pagination.value.page < pagination.value.last_page) {
        pagination.value.page++;
      }
    } catch (err: any) {
      error.value = err.message || "Error loading products";
    } finally {
      loading.value = false;
    }
  };

  // Carga inicial
  onMounted(() => {
    loadProducts(true);
  });

  return {
    products,
    loading,
    error,
    pagination,
    loadProducts,
  };
};