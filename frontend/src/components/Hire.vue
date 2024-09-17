<template>
  <div class="description">
    <!-- <p> Job Description</p> -->
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Job Title">
        <el-select v-model="form.title" placeholder="please select Title">
          <el-option v-for="item in jobList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Experience">
        <el-select v-model="form.experience" placeholder="please select Experience">
          <el-option v-for="item in jobList"
                     :key="item.id"
                     :label="item.experience"
                     :value="item.experience"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Skill Set">
        <el-select v-model="form.skill" placeholder="please select Skill Set">
          <el-option v-for="item in skillList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Location">
        <el-select v-model="form.location" placeholder="please select location">
          <el-option v-for="item in locations"
                     :key="item.id"
                     :label="item.name"
                     :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Additional Info">
        <el-input v-model="form.additional_info" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          Create
        </el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ApiFactory from '@/api/index';

export default {
  name: 'Task',
  data() {
    return {
      description: '',
      jobId: '',
      form: {
        title: '',
        experience: '',
        skill: '',
        location: '',
        additional_info: '',
      },
      jobList: [
        {
          id: 1,
          name: 'Software Engineer 1',
          experience: '0-2 Years',
        },
        {
          id: 2,
          name: 'Software Engineer 2',
          experience: '2-5 Years',
        },
        {
          id: 3,
          name: 'Software Engineer 3',
          experience: '5-9 Years',
        },
        {
          id: 4,
          name: 'Senior Software Engineer',
          experience: '9-14 Years',
        },
        {
          id: 5,
          name: 'Staff Software Engineer',
          experience: '14-20 Years',
        },
        {
          id: 6,
          name: 'Principal Software Engineer',
          experience: '20+ Years',
        },
      ],
      skillList: [
        { id: 1, name: 'Programming and Development Skills' },
        { id: 2, name: 'Software Design and Architecture' },
        { id: 3, name: 'Testing and Debugging' },
        { id: 4, name: 'DevOps and Automation' },
        { id: 5, name: 'Problem Solving and Critical Thinking' },
        { id: 6, name: 'Project Management and Collaboration' },
        { id: 7, name: 'Soft Skills' },
        { id: 8, name: 'Security and Best Practices' },
        { id: 9, name: 'Domain-Specific Skills' },
        { id: 10, name: 'Industry Knowledge and Trends' },
      ],
      locations: [
        { id: 1, name: 'Bangalore' },
        { id: 2, name: 'Berlin' },
        { id: 3, name: 'Boston' },
      ],
    };
  },
  methods: {
    async onSubmit() {
      const payload = {};
      try {
        payload.title = this.form.title;
        payload.experience_required = this.form.experience;
        payload.skill = this.form.skill;
        payload.additional_info = this.form.additional_info;
        payload.location = this.form.location;
        console.log(payload);
        const apiData = {
          job_description: JSON.stringify(payload),
        };
        if (payload) {
          const result = await ApiFactory.createDescription(apiData);
          if (result.status === 201) {
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
.description {
 margin: 0 500px 0 600px;
 font-size: 1000px;
 font-weight: 1000;

}
</style>
