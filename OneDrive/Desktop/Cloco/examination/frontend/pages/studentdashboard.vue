<template>
  <div>
    <navbar />

    <div class="main-content p-4 lg:p-6 w-full bg-gray-100">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Student Dashboard</h2>

      <!-- Subjects Section with Exam Results -->
      <div class="mb-8">
        <h3 class="text-2xl font-semibold text-gray-700 mb-4">Subjects & Exam Results</h3>
        <ul class="bg-white rounded-lg shadow-md divide-y divide-gray-300">
          <li
            v-for="subject in subjects"
            :key="subject.id"
            class="py-4"
          >
            <div class="flex justify-between items-center">
              <span class="text-lg font-semibold text-gray-700">{{ subject.name }}</span>
              <span class="text-gray-500">Result: {{ subject.result ? subject.result + '%' : 'Not Available' }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Exams Section -->
      <div>
        <h3 class="text-2xl font-semibold text-gray-700 mb-4">Upcoming Exams</h3>
        <ul class="bg-white rounded-lg shadow-md divide-y divide-gray-300">
          <li
            v-for="exam in exams"
            :key="exam.id"
            class="py-4 flex justify-between items-center"
          >
            <span class="text-lg font-semibold text-gray-700">{{ exam.name }}</span>
            <span class="text-gray-500">{{ formatDate(exam.date) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    definePageMeta({
  middleware: 'auth' 
});
    return {
      // Mock data for subjects and student results
      subjects: [
        { id: 1, name: 'Math', result: 85 },
        { id: 2, name: 'Science', result: 92 },
        { id: 3, name: 'History', result: null }, // No result yet
      ],
      // Mock data for upcoming exams
      exams: [
        { id: 1, name: 'Math Exam', date: '2024-09-25' },
        { id: 2, name: 'Science Exam', date: '2024-10-01' },
      ],
    };
  },
  methods: {
    // Method to format date into a readable string
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
/* Additional styling for the dashboard */
.main-content {
  background-color: #f7fafc;
}

h2 {
  color: #2d3748;
}

ul {
  padding: 0;
  list-style: none;
}

li {
  padding: 15px 0;
  border-bottom: 1px solid #e2e8f0;
}
</style>
