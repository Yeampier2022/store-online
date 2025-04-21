<template>
  <button @click="counter.increment()" class="bg-blue-500 text-white p-2 rounded">
    Count: {{ counter.count }}
  </button>
</template>

<script lang="ts" setup>
  
import { useCounterStore } from '@/stores/counters'
const counter = useCounterStore()

</script>
