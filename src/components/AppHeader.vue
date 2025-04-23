<script setup>
import { useAuthStore } from '@/modules/auth/store/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

console.log("Encontrando la data", authStore.userData)

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}
</script>


<template>
  <v-app-bar app color="primary" dark>
    <v-btn to="/" >Mi Tienda</v-btn>
    
    <v-spacer></v-spacer>
    
   
    
    <template v-if="authStore.isAuthenticated">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn text v-bind="attrs" v-on="on">
            <v-icon left>mdi-account</v-icon>
            {{ authStore?.name || 'Mi cuenta' }}
          </v-btn> -->
          <v-btn to="/products" text>
        Producto
      </v-btn>
      <v-btn @click="handleLogout"  text>
        Cerrar sesión
      </v-btn>
        </template>
        
    
      </v-menu>
    </template>
    
    <template v-if="!authStore.isAuthenticated">
      <v-btn to="/" text>
        Inicio
      </v-btn>
      <v-btn to="/products" text>
        Producto
      </v-btn>
    
      <v-btn to="/login" text>
        <v-icon left>mdi-login</v-icon>
        Iniciar sesión
      </v-btn>
   

    </template>
  </v-app-bar>
</template>

 <style scoped>
 .v-btn {
   text-transform: none;
   letter-spacing: normal;
 }
 </style>