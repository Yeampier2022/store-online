import { ref, onMounted } from "vue";
import { fetchProducts } from "../services/productsApi";
import type {
  Products,
  Category,
  Brand,
  Color,
  FetchProductsApiResponse,
} from "../types";

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}

interface ProductHookFilters {
  search_key?: string;
  category_uuid?: string;
  brand_uuid?: string;
  color_uuid?: string;
}

export const useInfiniteProducts = () => {
  const products = ref<Products[]>([]);
  const availableCategories = ref<Category[]>([]);
  const availableBrands = ref<Brand[]>([]);
  const availableColors = ref<Color[]>([]);

  const loading = ref(false);
  const error = ref<string | null>(null);
  const initialLoadComplete = ref(false);

  const pagination = ref({
    page: 1,
    per_page: 12,
    last_page: 1,
  });

  const filters = ref<ProductHookFilters>({});

  /**
   * @param reset
   */
  const loadProducts = async (reset: boolean = false) => {
    if (loading.value && !reset) {
      console.log("Load in progress, skipping.");
      return;
    }

    if (
      !reset &&
      initialLoadComplete.value &&
      pagination.value.page > pagination.value.last_page
    ) {
      console.log("No more pages to load.");
      return;
    }

    loading.value = true;
    error.value = null;

    if (reset) {
      products.value = [];
      pagination.value.page = 1;
      pagination.value.last_page = 1;
    
    } else {
      console.log(
        "Fetching next page:",
        pagination.value.page,
        "with filters:",
        filters.value
      );
    }

    try {
      const params = {
        page: pagination.value.page,
        per_page: pagination.value.per_page,
        ...filters.value,
      };

      const response = await fetchProducts(params);
      const data = response.data;
      const meta = {
        current_page: response.current_page,
        last_page: response.last_page,
        per_page: response.per_page,
        total: response.total,
      };

      if (reset && response?.filters) {
        availableCategories.value = response?.filters.categories;
        availableBrands.value = response?.filters.brands;
        availableColors.value = response?.filters.colors;
      }

      if (reset) {
        products.value = data;
      } else {
        products.value = [...products.value, ...data];
      }

      pagination.value.last_page = meta.last_page;

      if (!reset && pagination.value.page < pagination.value.last_page) {
        pagination.value.page++;
        console.log("Next page set to:", pagination.value.page);
      } else if (pagination.value.page >= pagination.value.last_page) {
        console.log("Reached last page.");
      }

      initialLoadComplete.value = true;
    } catch (err: any) {
      error.value = err.message || "Error loading products";
      console.error("Error during loadProducts:", err);
      initialLoadComplete.value = true;
    } finally {
      loading.value = false;
    }
  };

  const applyCurrentFilters = () => {
    loadProducts(true);
  };

  const updateSearchTerm = (searchTerm: string) => {
    filters.value.search_key = searchTerm;
    debouncedApplySearch();
  };

  const debouncedApplySearch = debounce(() => {
    applyCurrentFilters();
  }, 500);

  const loadNextPage = () => {
    if (!loading.value) {
      console.log("Attempting to load next page...");
      loadProducts(false);
    }
  };

  onMounted(() => {
    loadProducts(true);
  });

  return {
    products,
    availableCategories,
    availableBrands,
    availableColors,
    loading,
    error,
    pagination,
    filters,
    applyCurrentFilters,
    updateSearchTerm,
    loadNextPage,
    initialLoadComplete,
  };
};
