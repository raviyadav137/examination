<template>
  <div>
    <!-- Navbar and Sidebar -->
    <navbar />
    <div class="flex flex-col md:flex-row">
      <sidebar />

      <!-- Main Content -->
      <div class="main-content p-6 w-full bg-gray-100">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Manage Students</h2>

        <!-- Add Student Button -->
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6"
          @click="openAddModal"
        >
          Add New Student
        </button>

        <!-- Students List -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <ul class="divide-y divide-gray-300">
            <li
              v-for="student in students"
              :key="student.id"
              class="py-4 flex justify-between items-center"
            >
              <span class="text-lg font-semibold text-gray-700">{{ student.name }}</span>
              <div>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
                  @click="openEditModal(student)"
                >
                  Edit
                </button>
                <button
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                  @click="deleteStudent(student.id)"
                >
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Add/Edit Student Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white rounded-lg p-6 w-96">
        <h3 class="text-xl font-bold mb-4">{{ editMode ? 'Edit Student' : 'Add New Student' }}</h3>
        <form @submit.prevent="editMode ? updateStudent() : addStudent()">
          <input
            v-model="studentName"
            class="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Student Name"
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
     middleware: 'auth' // This adds the 'auth' middleware to this page
      });

    return {
      students: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Michael Johnson' }
      ],
      studentName: '',
      isModalOpen: false,
      editMode: false,
      editStudentId: null
    };
  },
  methods: {
    // Open the modal for adding a new student
    openAddModal() {
      this.isModalOpen = true;
      this.editMode = false;
      this.studentName = '';
    },

    // Open the modal for editing an existing student
    openEditModal(student) {
      this.isModalOpen = true;
      this.editMode = true;
      this.studentName = student.name;
      this.editStudentId = student.id;
    },

    // Add a new student
    addStudent() {
      const newId = this.students.length + 1;
      this.students.push({ id: newId, name: this.studentName });
      this.closeModal();
    },

    // Update an existing student
    updateStudent() {
      const student = this.students.find(student => student.id === this.editStudentId);
      student.name = this.studentName;
      this.closeModal();
    },

    // Delete a student
    deleteStudent(id) {
      this.students = this.students.filter(student => student.id !== id);
    },

    // Close the modal
    closeModal() {
      this.isModalOpen = false;
      this.studentName = '';
    }
  }
};
</script>

<style scoped>
/* Customize modal background */
.modal-bg {
  background: rgba(0, 0, 0, 0.8);
}
</style>
