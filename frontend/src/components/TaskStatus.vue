<template>
  <div>
    <h2>Check Job Status</h2>

    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Job ID" class="text">
        <el-input v-model="form.job_id" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          Submit
        </el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
      <br>
    </el-form>
    <div class="table">
      <el-table v-if="jobId"
                :data="tableData"
      >
        <el-table-column
          prop="jobId"
          label="JobId"
          width="180"
        />
        <el-table-column
          prop="status"
          label="Status"
          width="180"
        />
        <el-table-column
          prop="url"
          label="URL"
          class="pointer"
        />
      </el-table>
    </div>
  </div>
</template>
<script>
import ApiFactory from '@/api/index';

export default {
  name: 'TaskStatus',
  data() {
    return {
      form: {
        job_id: '',
      },
      jobId: null,
      tableData: [
      ],
    };
  },
  methods: {
    async onSubmit() {
      try {
        if (this.form && this.form.job_id) {
          const payload = {
            jobId: this.form.job_id,
          };
          const result = await ApiFactory.taskStatus(payload);
          if (result.status === 200) {
            this.jobId = this.form.job_id;
            this.$message({
              message: 'Fetched job successfully',
              type: 'success',
            });
            const tableRecord = {
              jobId: this.jobId,
              status: 'ok',
              url: 'aaa',
            };
            this.tableData.push(tableRecord);
          }
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

.pointer {
  cursor: pointer;
}
.table .el-table{
    margin-top: 100px;
    width: 80%;
    margin: auto;
}
.text {
  font-size: 30px;
  font-weight: 500;
  font-family: 'Courier New';
}
</style>
