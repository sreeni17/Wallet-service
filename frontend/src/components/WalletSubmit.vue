<template>
  <div>
    <div id="app">
    <el-form :model="walletForm" status-icon :rules="rules" ref="walletForm">
      <el-form-item label="Wallet User Name" prop="name">
        <el-input v-model="walletForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Wallet balance" prop="balance">
            <el-input v-model="walletForm.balance"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="onSumbit">Submit Wallet</el-button>
        <div v-if="currentWallet && currentWallet.id">
          <p>
          Current Wallet Name: {{ currentWallet.name }}
          </p>
          <p>
          Current Wallet Balance: {{ currentWallet.balance }}
          </p>
          <el-switch v-model="switchCredit" />
          <el-form :model="walletForm" status-icon :rules="rules" ref="transactionForm">
          <el-form-item label="Transaction Amount" prop="name">
        <el-input v-model="transactionForm.amount"></el-input>
      </el-form-item>
      <!-- <el-form-item label="Transaction Type">
        
          </el-form-item> -->
      <el-form-item label="Transaction description" prop="balance">
            <el-input v-model="transactionForm.description"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="onSumbitTransaction">Submit Transaction</el-button>
          <!-- <router-link to="/transactions">Go to Transaction</router-link> -->
        </div>
    </div>
   </div>
</template>
  <script>
  import ApiFactory from '@/api/index';
  export default {
    name: 'WalletSubmit',
    data() {
      return {
        walletForm: {
        name: "",
        balance: null,
      },
      switchCredit: true,
      transactionForm: {
        amount: null,
        type: 1,
        description: null,
      },
      currentWallet: null
      };
    },
    created() {
      const walletData = JSON.parse(localStorage.getItem('wallet'));
      // console.log('walletData', walletData);
      if(walletData.id) {
        this.currentWallet = walletData;
      }
    },
    methods: {
      async onSumbit() {
        try{
          const payloadData = {
          balance: this.walletForm.balance ? this.walletForm.balance: 0,
          name: this.walletForm.name,
          };
          const result = await ApiFactory.setupWallet(payloadData);
          console.log('result', result);
          if(result.status === 200 ) {
            this.$message({
              message: 'Wallet created successfully',
              type: 'warning'
            });
            if(result?.data?.data) {
              this.currentWallet = result?.data?.data;
              localStorage.setItem('wallet', JSON.stringify(this.currentWallet));
            }
            
            this.walletForm = {
              name: "",
              balance: null,
            }
        }
        }catch(err) {
          throw err;
        }
      },
      async onSumbitTransaction() {
        try{
          // const payloadData = {
          // balance: this.walletForm.balance ? this.walletForm.balance: 0,
          // name: this.walletForm.name,
          // };
          // const result = await ApiFactory.setupWallet(payloadData);
          // if(result.status === 200 ) {
          //   this.$message({
          //     message: 'Wallet created successfully',
          //     type: 'warning'
          //   });
          //   if(result?.data?.data) {
          //     this.currentWallet = result?.data?.data;
          //     localStorage.setItem('wallet', JSON.stringify(this.currentWallet));
          //   }
            
          //   this.walletForm = {
          //     name: "",
          //     balance: null,
          //   }
        // }
        }catch(err) {
          throw err;
        }
      }

    },
  }
  </script>
  