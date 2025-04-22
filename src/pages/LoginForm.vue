<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../modules/auth/store/authStore';

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
    router.push('/');
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error al iniciar sesión';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="auth-card" elevation="4">
      <v-card-title class="text-center text-h5 mb-4">
        Iniciar sesión
      </v-card-title>
      
      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.email"
            label="Correo electrónico"
            type="email"
            prepend-inner-icon="mdi-email"
            variant="outlined"
            class="mb-3"
            required
          />

          <v-text-field
            v-model="form.password"
            label="Contraseña"
            type="password"
            prepend-inner-icon="mdi-lock"
            variant="outlined"
            class="mb-3"
            required
          />

          <v-btn
            type="submit"
            color="primary"
            :loading="loading"
            :disabled="loading"
            block
            size="large"
            class="mt-2"
          >
            Iniciar sesión
          </v-btn>

          <v-alert
            v-if="error"
            type="error"
            class="mt-4"
            variant="tonal"
          >
            {{ error }}
          </v-alert>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-center">
        <router-link to="/register" class="text-primary">
          ¿No tienes cuenta? Regístrate
        </router-link>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.auth-card {
  width: 100%;
  max-width: 500px;
  padding: 24px;
  margin: 16px;
}

@media (max-width: 600px) {
  .auth-card {
    padding: 16px;
    margin: 8px;
    box-shadow: none !important;
  }
}
</style>