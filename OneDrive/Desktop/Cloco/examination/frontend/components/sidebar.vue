<template>
  <aside class="w-64 h-[610px] bg-blue-950 text-white flex flex-col lg:flex">
    <!-- Navigation Links -->
    <nav class="flex-1 mt-4">
      <ul class="space-y-4">
        <nuxt-link to="/">
          <li class="flex items-center space-x-3 p-4 hover:bg-blue-700 cursor-pointer">
            <i class="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </li>
        </nuxt-link>
        <nuxt-link to="/student">
          <li class="flex items-center space-x-3 p-4 hover:bg-blue-700 cursor-pointer">
            <i class="fa-solid fa-school"></i>
            <span>Students</span>
          </li>
        </nuxt-link>
        <nuxt-link to="/exam">
          <li class="flex items-center space-x-3 p-4 hover:bg-blue-700 cursor-pointer">
            <i class="fa-solid fa-book"></i>
            <span>Exams</span>
          </li>
        </nuxt-link>
        <nuxt-link to="/results">
          <li class="flex items-center space-x-3 p-4 hover:bg-blue-700 cursor-pointer">
            <i class="fa-solid fa-square-poll-vertical "></i>
            <span>Results</span>
          </li>
        </nuxt-link>
        <nuxt-link to="/subject">
          <li class="flex items-center space-x-3 p-4 hover:bg-blue-700 cursor-pointer">
            <i class="fa-solid fa-graduation-cap "></i>
            <span>Subjects</span>
          </li>
        </nuxt-link>
        <li @click="logout" class="flex items-center space-x-3 p-4 hover:bg-blue-700 cursor-pointer">
          <i class="fas fa-sign-out-alt"></i>
          <span>Signout</span>
        </li>
      </ul>
    </nav>
  </aside>
</template>


<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  alert("Logout Scucssfully")

  localStorage.removeItem('isLoggedIn');

 
  router.push('/login');
};
</script>

  <style scoped>
  .aside_bar{
    height: calc(100vh - 64px);
  }
</style>
  