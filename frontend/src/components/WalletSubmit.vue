<!-- eslint-disable no-useless-catch -->
<template>
  <div>
    <div id="app">
      <el-form ref="walletForm" :model="walletForm" status-icon :rules="rules">
        <el-form-item label="Wallet User Name" prop="name">
          <el-input v-model="walletForm.name" />
        </el-form-item>
        <el-form-item label="Wallet balance" prop="balance">
          <el-input v-model="walletForm.balance" />
        </el-form-item>
      </el-form>
      <el-button @click="onSumbit">
        Submit Wallet
      </el-button>
      <div v-if="currentWallet && currentWallet.id">
        <p>
          Current Wallet Name: {{ currentWallet.name }}
        </p>
        <p>
          Current Wallet Balance: {{ currentWallet.balance }}
        </p>
        <el-switch v-model="transactionForm.credit"
                   style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                   active-text="Credit"
                   inactive-text="Debit"
        />
        <el-form ref="transactionForm" :model="walletForm" status-icon :rules="rules">
          <el-form-item label="Transaction Amount" prop="name">
            <el-input v-model="transactionForm.amount" min="0"
                      onkeypress="return (event.charCode !=8 && event.charCode ==0 ||
            (event.charCode >= 46 && event.charCode <= 57))"
            />
          </el-form-item>
          <el-form-item label="Transaction description" prop="balance">
            <el-input v-model="transactionForm.description" />
          </el-form-item>
        </el-form>
        <el-button @click="onSumbitTransaction">
          Submit Transaction
        </el-button>
        <div>
          <p>
            <router-link :to="{ name: 'Transactions' }">
              View Transactions
            </router-link>
          </p>
        </div>

        <!-- <router-link to="/transactions">Go to Transaction</router-link> -->
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import ApiFactory from '@/api/index';

export default {
  name: 'WalletSubmit',
  data() {
    return {
      walletForm: {
        name: '',
        balance: null,
      },
      transactionForm: {
        amount: null,
        credit: true,
        description: null,
      },
      currentWallet: null,
    };
  },
  created() {
    const walletData = JSON.parse(localStorage.getItem('wallet'));
    if (walletData.id) {
      this.currentWallet = walletData;
    }
  },
  methods: {
    async onSumbit() {
      try {
        const payloadData = {
          balance: this.walletForm.balance ? this.walletForm.balance : 0,
          name: this.walletForm.name,
        };
        const result = await ApiFactory.setupWallet(payloadData);
        if (result.status === 200) {
          this.$message({
            message: 'Wallet created successfully',
            type: 'success',
          });
          if (result?.data?.data) {
            this.currentWallet = result?.data?.data;
            localStorage.setItem('wallet', JSON.stringify(this.currentWallet));
          }

          this.walletForm = {
            name: '',
            balance: null,
          };
        } else if (result.error) {
          this.$message({
            message: result.error,
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
    async onSumbitTransaction() {
      try {
        const payloadData = {
          amount: this.transactionForm.amount ? this.transactionForm.amount : null,
          description: this.transactionForm.description,
        };
        if (!this.transactionForm.credit) {
          payloadData.amount = -payloadData.amount;
        }
        const result = await ApiFactory.setupTransaction(payloadData, this.currentWallet.id);
        if (result.status === 200) {
          this.$message({
            message: 'Transaction created successfully',
            type: 'success',
          });
          if (result?.data?.data) {
          // this.currentWallet = result?.data?.data;
            const currBalence = result?.data?.data.balance;
            this.currentWallet.balance = currBalence;
            localStorage.setItem('wallet', JSON.stringify(this.currentWallet));
          }

          this.transactionForm = {
            amount: null,
            credit: true,
            description: null,
          };
        } else if (result.error) {
          this.$message({
            message: result.error,
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
    routeTransactions() {
      const router = useRouter();
      router.push({ name: 'Transactions' });
    },
  },
};
</script>
