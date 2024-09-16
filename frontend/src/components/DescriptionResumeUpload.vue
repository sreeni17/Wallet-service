<template>
  <div class="container">
    <!-- Left side: Cards -->
    <div class="left-side">
      <div
        v-for="job in job_descriptions"
        :key="job.jobId"
        class="card"
        @click="selectCard(job)"
      >
        {{ job.data }}
      </div>
    </div>

    <!-- Right side: Content -->
    <div class="right-side">
      <div v-if="selectedJob">
        <h2>{{ selectedJob.jobId }}</h2>
        <p>{{ selectedJob.data }}</p>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :file-list="fileList"
        >
          <p>Upload Resumes</p>
      &nbsp;
          <el-button size="small" type="primary">
            Click to upload
          </el-button>
        </el-upload>
      </div>
      <div v-else>
        <p>Please select a Job</p>
      </div>
    </div>
  </div>
</template>

<script>
import ApiFactory from '@/api/index';

export default {
  name: 'DescriptionResumeUpload',
  data() {
    return {
      description: '',
      jobId: '',
      cards: [
        { id: 1, title: 'Card 1', content: 'This is the content for Card 1.' },
        { id: 2, title: 'Card 2', content: 'This is the content for Card 2.' },
        { id: 3, title: 'Card 3', content: 'This is the content for Card 3.' },
      ],
      job_descriptions: [],
      selectedJob: null, // Keeps track of which card is selected
    };
  },
  async created() {
    await this.getAllDescriptions();
  },
  methods: {
    selectCard(job) {
      this.selectedJob = job; // Update selected card when clicked
    },
    async getAllDescriptions() {
      try {
        const result = await ApiFactory.getAllDescriptions();
        if (result.status === 200) {
          if (result.data && result.data.files) {
            this.job_descriptions = result.data.files;
          }
        }
      } catch (err) {
        this.$message({
          message: 'Something Went Wrong',
          type: 'error',
        });
      }
    },
    async onSubmit() {
      const payload = {};
      try {
        payload.jobId = this.jobId;
        payload.data = this.description;
        if (payload) {
          const result = await ApiFactory.createDescription(payload);
          if (result.status === 200) {
            this.$message({
              message: 'created job description successfully',
              type: 'success',
            });
          }
        } else {
          this.$message({
            message: 'Something Went Wrong',
            type: 'error',
          });
        }
      } catch (err) {
        this.$message({
          message: 'Something Went Wrong',
          type: 'error',
        });
      }
    },
  },
};
</script>
  <style>
 .container {
  display: flex;
  height: 100vh;
}

.left-side {
  width: 30%;
  background-color: #f8f9fa;
  padding: 20px;
  border-right: 1px solid #ddd;
}

.card {
  padding: 10px;
  margin-bottom: 10px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.3s;
}

.card:hover {
  background-color: #e2e6ea;
}

.right-side {
  width: 70%;
  padding: 20px;
}

.right-side h2 {
  margin-top: 0;
}
  </style>
