<script setup lang="ts">
import { useInfiniteProducts } from '../composables/useProducts';
import ProductCard from './ProductCard.vue';
import ProductSkeleton from './ProductSkeleton.vue';

const { products, loading, error, loadProducts } = useInfiniteProducts();
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
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <ProductCard :product="product" />
        </v-col>
      </template>

      <ProductSkeleton v-if="loading && !products.length" />

      <template v-if="loading && products.length">
        <v-col
          v-for="n in 4"
          :key="`loading-${n}`"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card>
            <v-skeleton-loader type="image" height="200px" />
            <v-card-text>
              <v-skeleton-loader type="heading" width="80%" />
              <v-skeleton-loader type="text" width="60%" class="mt-2" />
            </v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>

    <div v-if="!loading && products.length" class="text-center py-4">
      <v-btn
        v-if="!loading"
        color="primary"
        @click="loadProducts"
      >
        Cargar más productos
      </v-btn>
    </div>
  </div>
</template>