<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import type { RegisterForm } from '../types';

const authStore = useAuthStore();
const router = useRouter();

const form = ref<RegisterForm>({
  name: '',
  email: '',
  password: '',
  c_password: ''
});

const error = ref<string | null>(null);
const loading = ref(false);

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    await authStore.register(form.value);
    router.push('/dashboard'); // Redirigir tras registro exitoso
    
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error en el registro';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="form.name"
      label="Nombre completo"
      required
    />

    <v-text-field
      v-model="form.email"
      label="Correo electrónico"
      type="email"
      required
    />

    <v-text-field
      v-model="form.password"
      label="Contraseña"
      type="password"
      required
    />

    <v-text-field
      v-model="form.c_password"
      label="Confirmar contraseña"
      type="password"
      required
    />

    <v-btn
      type="submit"
      color="primary"
      :loading="loading"
      :disabled="loading"
      block
    >
      Registrarse
    </v-btn>

    <v-alert
      v-if="error"
      type="error"
      class="mt-4"
    >
      {{ error }}
    </v-alert>
  </v-form>
</template>