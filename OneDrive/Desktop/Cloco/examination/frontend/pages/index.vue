<template>
  <navbar />
  <div class="flex flex-col md:flex-row">

    <!-- Sidebar Component -->
    <sidebar />

    <!-- Main Content -->
    <div class="main-content p-4 lg:p-6 w-full bg-gray-100">
      <p class="text-center font-bold text-green-500 text-3xl mb-8">Welcome To Admin Dashboard</p>

      <!-- Section Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <!-- Manage Exams Card -->
        <div class="card bg-blue-500 text-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
          <nuxt-link to="exam" class="flex flex-col items-center">
            <i class="fa-solid fa-book text-4xl mb-4"></i>
            <p class="font-bold text-lg">Manage Exams</p>
            <span class="icon-plus mt-4 text-2xl">+</span>
          </nuxt-link>
        </div>

        <!-- Manage Students Card -->
        <div class="card bg-green-500 text-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
          <nuxt-link to="student" class="flex flex-col items-center">
            <i class="fa-solid fa-school text-4xl mb-4"></i>
            <p class="font-bold text-lg">Manage Students</p>
            <span class="icon-plus mt-4 text-2xl">+</span>
          </nuxt-link>
        </div>

        <!-- View Results Card -->
        <div class="card bg-yellow-500 text-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
          <nuxt-link to="results" class="flex flex-col items-center">
            <i class="fa-solid fa-square-poll-vertical text-4xl mb-4"></i>
            <p class="font-bold text-lg">View Results</p>
            <span class="icon-plus mt-4 text-2xl">+</span>
          </nuxt-link>
        </div>

        <!-- Manage Subjects Card -->
        <div class="card bg-red-500 text-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200">
          <nuxt-link to="subject" class="flex flex-col items-center">
            <i class="fa-solid fa-graduation-cap text-4xl mb-4"></i>
            <p class="font-bold text-lg">Manage Subjects</p>
            <span class="icon-plus mt-4 text-2xl">+</span>
          </nuxt-link>
        </div>

      </div>
    </div>

  </div>
</template>

   
<script setup>
definePageMeta({
  middleware: 'auth'
});
</script>
    
  
  <style scoped>
  
  </style>
  