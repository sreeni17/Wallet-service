<template>
  <div class="description">
    <p>Job Description</p>
    <el-input
      v-model="textarea"
      type="textarea"
      :rows="10"
      placeholder="Please input job Description"
    />
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
</template>

<script>
export default {
  name: 'Task',
  data() {
    return {
      textarea: '',
    };
  },
};
</script>
<style>
.description {
 margin: 0 500px 0 500px;

}
</style>
