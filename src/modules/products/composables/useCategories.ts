import { ref, onMounted } from 'vue';
import { fetchCategories } from '../services/productsApi';
import type { Category } from '../types';

export const useCategories = () => {
  const categories = ref<Category[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadCategories = async () => {
    try {
      loading.value = true;
      categories.value = await fetchCategories();
    } catch (err: any) {
      error.value = err.message || 'Error loading categories';
    } finally {
      loading.value = false;
    }
  };

  // Carga inicial
  onMounted(loadCategories);

  return { categories, loading, error, loadCategories };
};