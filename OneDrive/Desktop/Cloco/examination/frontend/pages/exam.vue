<template>
  <div>
    <navbar />
    <div class="flex flex-col md:flex-row">
      <sidebar />

      <div class="main-content p-4 lg:p-6 w-full bg-gray-100">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Manage Exams</h2>

        <button 
          @click="openCreateExamModal" 
          class="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Exam
        </button>

        <ul class="bg-white rounded-lg shadow-md divide-y divide-gray-300">
          <li 
            v-for="exam in exams" 
            :key="exam.id" 
            class="py-4 flex justify-between items-center"
          >
            <div class="flex flex-col">
              <span class="text-lg font-semibold text-gray-700">{{ exam.name }}</span>
              <span class="text-gray-500">{{ formatDate(exam.date) }}</span>
            </div>
            <div>
              <button 
                @click="openEditExamModal(exam)" 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button 
                @click="deleteExam(exam.id)" 
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>

        <!-- Modal for Creating/Editing Exam -->
        <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div class="bg-white rounded-lg p-6 w-96">
            <h3 class="text-xl font-bold mb-4">{{ editMode ? 'Edit Exam' : 'Create New Exam' }}</h3>
            <form @submit.prevent="editMode ? updateExam() : addExam()">
              <input
                v-model="examName"
                class="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Exam Name"
                required
              />
              <input
                type="date"
                v-model="examDate"
                class="w-full p-2 border border-gray-300 rounded mb-4"
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
      exams: [
        { id: 1, name: 'Math Exam', date: '2024-09-25' },
        { id: 2, name: 'Science Exam', date: '2024-10-01' },
      ],
      isModalOpen: false,
      editMode: false,
      examName: '',
      examDate: '',
      currentExamId: null,
    };
  },
  methods: {
    openCreateExamModal() {
      this.isModalOpen = true;
      this.editMode = false;
      this.examName = '';
      this.examDate = '';
    },
    openEditExamModal(exam) {
      this.isModalOpen = true;
      this.editMode = true;
      this.examName = exam.name;
      this.examDate = exam.date;
      this.currentExamId = exam.id;
    },
    addExam() {
      const newExam = {
        id: this.exams.length + 1,
        name: this.examName,
        date: this.examDate,
      };
      this.exams.push(newExam);
      this.closeModal();
    },
    updateExam() {
      const exam = this.exams.find(exam => exam.id === this.currentExamId);
      if (exam) {
        exam.name = this.examName;
        exam.date = this.examDate;
      }
      this.closeModal();
    },
    deleteExam(id) {
      this.exams = this.exams.filter(exam => exam.id !== id);
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    closeModal() {
      this.isModalOpen = false;
      this.examName = '';
      this.examDate = '';
      this.currentExamId = null;
    },
  },
};
</script>

<style scoped>
/* Additional styling for modal and buttons can be added here */
</style>

