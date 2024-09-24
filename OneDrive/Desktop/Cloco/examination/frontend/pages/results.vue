<template>
  <div>
    <!-- Navbar and Sidebar -->
    <navbar />
    <div class="flex flex-col md:flex-row">
      <sidebar />

      <!-- Main Content -->
      <div class="main-content p-6 w-full bg-gray-100">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">View Results</h2>

        <!-- Filter and Export Buttons -->
        <div class="flex justify-between items-center mb-6">
          <input
            v-model="searchQuery"
            @input="filterResults"
            placeholder="Search by student name..."
            class="border border-gray-300 rounded p-2 w-1/3"
          />
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            @click="exportResults"
          >
            Export Results
          </button>
        </div>

        <!-- Sort Options -->
        <div class="mb-4">
          <label for="sort" class="font-bold mr-2">Sort by:</label>
          <select v-model="sortOption" @change="sortResults" class="border border-gray-300 rounded p-2">
            <option value="default">Default</option>
            <option value="asc">Score (Ascending)</option>
            <option value="desc">Score (Descending)</option>
          </select>
        </div>

        <!-- Results List -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <ul class="divide-y divide-gray-300">
            <li
              v-for="result in filteredResults"
              :key="result.id"
              class="py-4 flex justify-between items-center"
            >
              <span class="text-lg font-semibold text-gray-700">
                {{ result.student }}: {{ result.score }}%
              </span>
            </li>
          </ul>
        </div>
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
      results: [
        { id: 1, student: "John Doe", score: 85 },
        { id: 2, student: "Jane Doe", score: 90 },
        { id: 3, student: "Michael Johnson", score: 75 },
        { id: 4, student: "Emma Watson", score: 95 },
      ],
      searchQuery: "", // For filtering
      filteredResults: [], // Holds the filtered or sorted results
      sortOption: "default", // Sorting option (asc or desc)
    };
  },
  mounted() {
    // Initialize filteredResults with the original results
    this.filteredResults = this.results;
  },
  methods: {
    // Function to export results (this example alerts, but you can implement CSV export)
    exportResults() {
      const csvContent = this.results
        .map((result) => `${result.student},${result.score}%`)
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "results.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    },

    // Function to filter results based on the search query
    filterResults() {
      const query = this.searchQuery.toLowerCase();
      this.filteredResults = this.results.filter((result) =>
        result.student.toLowerCase().includes(query)
      );
    },

    // Function to sort results based on score
    sortResults() {
      if (this.sortOption === "asc") {
        this.filteredResults.sort((a, b) => a.score - b.score);
      } else if (this.sortOption === "desc") {
        this.filteredResults.sort((a, b) => b.score - a.score);
      } else {
        // Reset to default order
        this.filteredResults = [...this.results];
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Add styles for better spacing and layout */
</style>
