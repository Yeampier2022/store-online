<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();


const form = ref({
  email: '',
  password: ''
});

const error = ref<string | null>(null);
const loading = ref(false);

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = null;

    await authStore.login(form.value);
    router.push('/store'); // Redirige tras login exitoso

  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error al iniciar sesión';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field v-model="form.email" label="Correo electrónico" type="email" required></v-text-field>

    <v-text-field v-model="form.password" label="Contraseña" type="password" required></v-text-field>

    <v-btn type="submit" color="primary" :loading="loading" :disabled="loading">
      Iniciar sesión
    </v-btn>

    <v-alert v-if="error" type="error" class="mt-4">
      {{ error }}
    </v-alert>
  </v-form>
</template>