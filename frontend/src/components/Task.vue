<template>
  <div>
    <el-form ref="form" :model="form" label-width="300px" class="form">
      <div v-for="(item, index) in items" :key="index">
        <label :for="`data[${index}]name`" class="text">Task: </label>
        <input v-model="item.task" :name="`data[${index}]task`" required class="input">

        <label :for="`data[${index}]email`" class="text">    Agent:</label>
        <el-select v-model="item.agent" placeholder="Please select your agent">
          <el-option label="Agent one" value="Agent one" />
          <el-option label="Agent two" value="Agent two" />
        </el-select>
        &nbsp;
        <button type="button" @click="items.splice(index, 1)">
          &times;
        </button>
        &nbsp;
        <button type="button" @click="items.push({})">
          Add
        </button>
      </div>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          Create
        </el-button>
      </el-form-item>
    </el-form>
    <div>
      <p>
        <router-link :to="{ name: 'TaskStatus' }">
          Check Job Status
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import ApiFactory from '@/api/index';

export default {
  name: 'Task',
  data() {
    return {
      items: [
        {
          task: '',
          agent: '',
        },
      ],
    };
  },
  methods: {
    async onSubmit() {
      const payload = [];
      try {
        if (this.items && this.items.length) {
          this.items.forEach((item) => {
            if (item.task && item.agent) {
              payload.push({
                task: item.task,
                agent: item.agent,
              });
            }
          });
          if (payload.length) {
            const result = await ApiFactory.createJob(payload);
            if (result.status === 200) {
              this.$message({
                message: 'created job successfully',
                type: 'success',
              });
            }
          } else {
            this.$message({
              message: 'Something Went Wrong',
              type: 'error',
            });
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

.text {
  font-size: 30px;
  font-weight: 500;
  font-family: 'Courier New';
}
.form {
    margin-top: 100px;
}
.input {
    width: 200px;
    height: 30px;
}
</style>
