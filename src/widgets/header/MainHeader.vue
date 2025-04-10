<script setup lang="ts">
import { ref } from 'vue';
import { SelectCurrency } from '@/features/currency';
import { PROJECT_NAME } from '@/shared/config/const';


const drawer = ref(false)


</script>

<style scoped lang="scss">
</style>
<template>
  <!-- Добавляем v-app -->
    <v-app-bar
      class="!bg-gray-200 shadow-md"
      app
    >
      <div class='flex md:hidden'>
        <v-app-bar-nav-icon  variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon> 
      </div>
      <v-container class="d-flex align-center">
        <!-- Title -->
        <router-link to="/" class="hidden md:flex text-decoration-none">
          <v-toolbar-title class="text-xl font-semibold tracking-tight tw-bg-blue-600 ">
            {{ PROJECT_NAME }}
          </v-toolbar-title>
        </router-link>

        <v-spacer></v-spacer>


        <!-- Navigation (Desktop) -->
        <div class="hidden md:flex space-x-6">  
          <router-link to="/" class="hover:text-gray-500 transition-colors duration-200 mx-2">
            Главная
          </router-link>
          <router-link to="/convert" class="hover:text-gray-500 transition-colors duration-200 mx-2">
            Конвертация
          </router-link>
        </div>
        <!-- Currency Dropdown -->
        <SelectCurrency />

      </v-container>
    </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            temporary
        >
            <v-list>
            <v-list-item link to="/" @click="drawer = false">
              <v-list-item-title>Главная</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/convert" @click="drawer = false">
              <v-list-item-title>Конвертация</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
    <v-main>
    </v-main>

</template>

