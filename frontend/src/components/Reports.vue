<template>
  <div class="hello">
    <el-button type="primary" @click="onSubmit">
      Generate Reports
    </el-button>
    <ul>
      <!-- Loop through users array -->
      <li v-for="file in files" :key="file.file_name">
        Name: {{ file.file_name }}
        <div>&nbsp;</div>
      </li>
    </ul>
  </div>
</template>

<script>
import ApiFactory from '@/api/index';

export default {
  name: 'Reports',
  data() {
    return {

      files: [],
    };
  },
  async created() {
    await this.onSubmit();
  },
  methods: {
    async onSubmit() {
      const result = await ApiFactory.getReports();
      if (result.status === 200) {
        this.files = result.data;
        this.$message({
          message: 'file generated successfully',
          type: 'success',
        });
      }
    },
  },
};
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style>
  .hello {
    /* position: absolute; */
      top: 50%;
      left: 50%;
      /* transform: translate(-50%, -50%); */
      padding: 10px 20px;
      font-size: 16px;
  }
  </style>
