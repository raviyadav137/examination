<template>
  <div>
    <!-- Navbar and Sidebar -->
    <navbar />
    <div class="flex flex-col md:flex-row">
      <sidebar />

      <!-- Main Content -->
      <div class="main-content p-6 w-full bg-gray-100">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Manage Subjects</h2>

        <!-- Add New Subject Button -->
        <div class="flex justify-between items-center mb-6">
          <input
            v-model="searchQuery"
            @input="filterSubjects"
            placeholder="Search by subject name..."
            class="border border-gray-300 rounded p-2 w-1/3"
          />
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            @click="openAddModal"
          >
            Add New Subject
          </button>
        </div>

        <!-- Sort Options -->
        <div class="mb-4">
          <label for="sort" class="font-bold mr-2">Sort by:</label>
          <select v-model="sortOption" @change="sortSubjects" class="border border-gray-300 rounded p-2">
            <option value="default">Default</option>
            <option value="asc">Alphabetically (A-Z)</option>
            <option value="desc">Alphabetically (Z-A)</option>
          </select>
        </div>

        <!-- Subjects List -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <ul class="divide-y divide-gray-300">
            <li
              v-for="subject in filteredSubjects"
              :key="subject.id"
              class="py-4 flex justify-between items-center"
            >
              <span class="text-lg font-semibold text-gray-700">{{ subject.name }}</span>
              <div>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
                  @click="openEditModal(subject)"
                >
                  Edit
                </button>
                <button
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                  @click="deleteSubject(subject.id)"
                >
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </div>

        <!-- Export Button -->
        <button
          class="mt-6 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          @click="exportSubjects"
        >
          Export Subjects to CSV
        </button>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white rounded-lg p-6 w-96">
        <h3 class="text-xl font-bold mb-4">{{ editMode ? 'Edit Subject' : 'Add New Subject' }}</h3>
        <form @submit.prevent="editMode ? updateSubject() : addSubject()">
          <input
            v-model="subjectName"
            class="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Subject Name"
            required
          />
          <div class="flex justify-end">
            <button
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              {{ editMode ? 'Update' : 'Add' }}
            </button>
          </div>
        </form>
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
      subjects: [
        { id: 1, name: 'Math' },
        { id: 2, name: 'Science' },
        { id: 3, name: 'History' }
      ],
      subjectName: '',
      isModalOpen: false,
      editMode: false,
      editSubjectId: null,
      searchQuery: '',
      filteredSubjects: [],
      sortOption: 'default'
    };
  },
  mounted() {
    this.filteredSubjects = this.subjects;
  },
  methods: {
    openAddModal() {
      this.isModalOpen = true;
      this.editMode = false;
      this.subjectName = '';
    },
    openEditModal(subject) {
      this.isModalOpen = true;
      this.editMode = true;
      this.subjectName = subject.name;
      this.editSubjectId = subject.id;
    },
    addSubject() {
      if (this.subjectName.trim() !== '') {
        const newId = this.subjects.length + 1;
        this.subjects.push({ id: newId, name: this.subjectName });
        this.closeModal();
      }
    },
    updateSubject() {
      const subject = this.subjects.find(sub => sub.id === this.editSubjectId);
      if (subject) {
        subject.name = this.subjectName;
      }
      this.closeModal();
    },
    deleteSubject(id) {
      this.subjects = this.subjects.filter(subject => subject.id !== id);
    },
    filterSubjects() {
      const query = this.searchQuery.toLowerCase();
      this.filteredSubjects = this.subjects.filter(subject =>
        subject.name.toLowerCase().includes(query)
      );
    },
    sortSubjects() {
      if (this.sortOption === 'asc') {
        this.filteredSubjects.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.sortOption === 'desc') {
        this.filteredSubjects.sort((a, b) => b.name.localeCompare(a.name));
      } else {
        this.filteredSubjects = [...this.subjects]; // Reset to default order
      }
    },
    exportSubjects() {
      const csvContent = this.subjects
        .map((subject) => `${subject.id},${subject.name}`)
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "subjects.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    },
    closeModal() {
      this.isModalOpen = false;
      this.subjectName = ''; // Reset input field
    }
  }
};
</script>

<style scoped>
/* Basic styling for the modal and buttons */
h2 {
margin-bottom: 20px;
}
form {
margin-bottom: 20px;
}
ul {
list-style-type: none;
padding: 0;
}
li {
margin: 10px 0;
}
button {
margin-left: 10px;
background-color: #007bff;
color: white;
border: none;
padding: 5px 10px;
cursor: pointer;
}
button:hover {
background-color: #0056b3;
}
.modal-bg {
background: rgba(0, 0, 0, 0.5);
}
</style>
