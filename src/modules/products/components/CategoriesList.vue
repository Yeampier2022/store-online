<script setup lang="ts">
import { useCategories } from '../composables/useCategories';
import { onMounted } from 'vue';

const { categories, loading, error } = useCategories();
</script>

<template>
  <div>
    <v-alert v-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-progress-linear v-if="loading" indeterminate />

    <v-row v-else>
      <v-col
        v-for="category in categories"
        :key="category.uuid"
        cols="6"
        sm="4"
        md="3"
        lg="2"
      >
        <v-card hover>
          <v-img
            :src="category.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-MbtF2cr2WZrB4ddm07pg3pvTbmxS48er4A&s'"
            height="120"
            cover
            class="align-end"
          >
            <v-card-title class="text-white text-shadow">
              {{ category?.name }}
            </v-card-title>
          </v-img>
          
          <v-card-text class="text-center">
            <v-btn 
              :to="`/categories/${category?.slug}`" 
              variant="text"
              color="primary"
              small
            >
              Ver productos
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style>
.text-shadow {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
}
</style>