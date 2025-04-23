import { ref, onMounted, onUnmounted } from "vue";
import { fetchProducts } from "../services/productsApi";
import type { Products, Pagination } from "../types";

export const useInfiniteProducts = () => {
  const products = ref<Products[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref({
    page: 1,
    per_page: 12,
    hasMore: true,
  });

  const loadProducts = async () => {
    if (loading.value || !pagination.value.hasMore) return;

    loading.value = true;
    try {
      const { data, meta } = await fetchProducts({
        page: pagination.value.page,
        per_page: pagination.value.per_page,
      });
      console.log(data);

      products.value = [...products.value, ...data];
      pagination.value.hasMore = meta.current_page < meta.last_page;
      if (pagination.value.hasMore) pagination.value.page++;
    } catch (err: any) {
      error.value = err.message || "Error loading products";
    } finally {
      loading.value = false;
    }
  };

  // Detectar scroll cerca del final
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      loadProducts();
    }
  };

  onMounted(() => {
    loadProducts();
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return { products, loading, error, loadProducts };
};
