<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../modules/auth/store/authStore';
import type { RegisterForm } from '../modules/auth/types';

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
    router.push('/store');
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error en el registro';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="auth-card" elevation="4">
      <v-card-title class="text-center text-h5 mb-4">
        Crear cuenta
      </v-card-title>
      
      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.name"
            label="Nombre completo"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            class="mb-3"
            required
          />

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

          <v-text-field
            v-model="form.c_password"
            label="Confirmar contraseña"
            type="password"
            prepend-inner-icon="mdi-lock-check"
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
            Registrarse
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
        <router-link to="/login" class="text-primary">
          ¿Ya tienes cuenta? Inicia sesión
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