<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useInfiniteProducts } from '../composables/useProducts';
import ProductCard from './ProductCard.vue';
import ProductSkeleton from './ProductSkeleton.vue';

const {
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
} = useInfiniteProducts();

const localSearchTerm = ref(filters.value.search_key || '');
const localCategoryUuid = ref(filters.value.category_uuid || '');
const localBrandUuid = ref(filters.value.brand_uuid || '');
const localColorUuid = ref(filters.value.color_uuid || '');


watch(localSearchTerm, (newValue) => { updateSearchTerm(newValue); });
watch([localCategoryUuid, localBrandUuid, localColorUuid], ([newCategory, newBrand, newColor]) => {
    filters.value.category_uuid = newCategory;
    filters.value.brand_uuid = newBrand;
    filters.value.color_uuid = newColor;
    applyCurrentFilters();
});


const handleScroll = () => {
  if (!initialLoadComplete.value) return;
  const nearEndOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500; // Ajusta buffer
  if (nearEndOfPage && !loading.value) {
     console.log("Near end of page, attempting to load next page...");
     loadNextPage();
  }
};
onMounted(() => { window.addEventListener('scroll', handleScroll); });
onUnmounted(() => { window.removeEventListener('scroll', handleScroll); });


</script>

<template>
  <div class="pa-4"> <v-alert v-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-row class="mb-6">
      <v-col cols="12" md="3">
        <v-text-field
          label="Buscar por nombre"
          v-model="localSearchTerm"
          density="compact"
          hide-details
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          label="Categoría"
          v-model="localCategoryUuid"
          :items="availableCategories"
          item-title="name"
          item-value="uuid"
          density="compact"
          hide-details
          clearable
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          label="Marca"
          v-model="localBrandUuid"
          :items="availableBrands"
          item-title="name"
          item-value="uuid"
          density="compact"
          hide-details
          clearable
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          label="Color"
          v-model="localColorUuid"
          :items="availableColors"
          item-title="name"
          item-value="uuid"
          density="compact"
          hide-details
          clearable
        ></v-select>
      </v-col>
    </v-row>


    <v-row>
      <template v-if="loading && !products.length">
         <ProductSkeleton v-for="n in pagination.per_page" :key="`skeleton-${n}`" />
      </template>

       <template v-else-if="initialLoadComplete || products.length > 0">
          <v-col v-if="products.length === 0" cols="12" class="text-center text-grey">
             No se encontraron productos con los filtros aplicados.
          </v-col>
          <v-col
            v-for="product in products"
            :key="product?.uuid"
            cols="12" sm="6" md="4" lg="3" >
            <ProductCard :product="product" />
          </v-col>
       </template>
    </v-row>

    <div v-if="loading && products.length > 0" class="text-center py-4">
       <v-progress-circular indeterminate color="primary"></v-progress-circular>
       <p class="text-grey mt-2">Cargando más productos...</p>
    </div>

    <div v-else-if="!loading && initialLoadComplete && products.length > 0 && pagination.page > pagination.last_page" class="text-center py-4">
       <p class="text-grey">Has llegado al final de los productos.</p>
    </div>

  </div>
</template>

<style scoped>

</style>