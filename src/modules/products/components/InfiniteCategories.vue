<script setup lang="ts">
import { useInfiniteCategories } from '../composables/useInfiniteCategories';
import { onMounted, onUnmounted } from 'vue';

const { categories, loading, error, loadCategories, hasMore } = useInfiniteCategories();

const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 200 && hasMore.value && !loading.value) {
    loadCategories();
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div>
    <!-- Mismo template que CategoriesList.vue -->
    <!-- Agregar al final: -->
    <div v-if="loading && categories.length" class="text-center py-4">
      <v-progress-circular indeterminate />
    </div>
  </div>
</template>