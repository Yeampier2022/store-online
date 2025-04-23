import { ref, onMounted, onUnmounted } from 'vue';
import { fetchCategories } from '../services/productsApi';
import type { Category } from '../types';
import http from '@/api/http';

export const useInfiniteCategories = () => {
  const categories = ref<Category[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const nextPageUrl = ref<string | null>(null);

  const loadCategories = async () => {
    if (loading.value || !nextPageUrl.value) return;

    try {
      loading.value = true;
      const url = nextPageUrl.value || '/shop/categories';
      const response = await http.get(url);
      
      categories.value = [...categories.value, ...response.data.data];
      nextPageUrl.value = response.data.links.next;
      
    } catch (err: any) {
      error.value = err.message || 'Error loading categories';
    } finally {
      loading.value = false;
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      loadCategories();
    }
  };

  onMounted(() => {
    loadCategories();
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return { categories, loading, error };
};