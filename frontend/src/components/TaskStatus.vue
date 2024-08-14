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
      <el-table
        v-if="jobId"
        :data="tableData"
        header-row-class-name="header-table"
      >
        <el-table-column
          prop="jobId"
          label="Job Id"
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
              status: result.data.job_status,
              url: result.data.url,
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
    margin-top: 30px;
    width: 50%;
    margin-left: 500px;
}
.text {
  font-size: 30px;
  font-weight: 500;
  font-family: 'Courier New';
}
.header-table {
    font-size: 20px;
    font-weight: 10;
}
</style>
