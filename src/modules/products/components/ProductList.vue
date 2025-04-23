<script setup lang="ts">
import { useInfiniteProducts } from '../composables/useProducts';
import ProductCard from './ProductCard.vue';
import ProductSkeleton from './ProductSkeleton.vue';

const { 
  products, 
  loading, 
  error, 
  pagination,
  loadProducts 
} = useInfiniteProducts();
</script>

<template>
  <div>
    <v-alert v-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-row>
      <template v-if="products.length">
        <v-col
          v-for="product in products"
          :key="product.uuid"
          cols="8"
          sm="6"
          md="4"
          lg="3"
        >
          <ProductCard :product="product" />
        </v-col>
      </template>

      <ProductSkeleton v-if="loading && !products.length" />
    </v-row>

    <div class="text-center py-6">
      <v-btn
        v-if="pagination.page <= pagination.last_page"
        color="primary"
        :loading="loading"
        :disabled="loading"
        @click="loadProducts()"
      >
        Cargar más productos
      </v-btn>
      <p v-else-if="products.length" class="text-grey">
        Has llegado al final de los productos
      </p>
    </div>
  </div>
</template>