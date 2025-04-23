<script setup lang="ts">
import type { Products } from '../types';

defineProps<{
    product: Product;
}>();
</script>

<template>
    <v-card hover height="100%">
        <v-img
            :src="product?.image?.url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-MbtF2cr2WZrB4ddm07pg3pvTbmxS48er4A&s'"
            height="200" cover lazy-src="https://via.placeholder.com/300?text=Cargando...">
            <template v-slot:placeholder>
                <v-skeleton-loader type="image" />
            </template>
        </v-img>

        <v-card-title class="text-subtitle-1">{{ product?.name }}</v-card-title>

        <v-card-text>
            <v-card-title class="text-subtitle-1">{{ product?.description }}</v-card-title>


            <div class="text-h6 text-primary">${{ product?.price }}</div>
        </v-card-text>
    </v-card>
</template>

