<template>
  <div>
    <h2>Transactions</h2>
    <div v-if="currentWallet && currentWallet.id">
      <p>
        Current Wallet Name: {{ currentWallet.name }}
      </p>
      <p>
        Current Wallet Balance: {{ currentWallet.balance }}
      </p>
      <p>
        <el-button type="info" @click="routeTransactions">
          Export Transactions
        </el-button>
      </p>
    </div>
    <div>
      <el-table :data="transactionsData" style="width: 100%">
        <el-table-column prop="date" label="Date" sortable width="180" />
        <el-table-column prop="type" label="Type" width="180" />
        <el-table-column prop="description" label="Description" width="200" />
        <el-table-column prop="amount" label="Amount" sortable width="180" />
        <el-table-column prop="balance" label="Balance" />
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="totalTransactions"
        :page-size="limit"
        @current-change="setPage"
      />
    </div>
  </div>
</template>

<script>

import ApiFactory from '@/api/index';

export default {
  name: 'WalletTransactions',
  data() {
    return {
      currentWallet: null,
      transactionsData: [],
      limit: 10,
      page: 1,
    };
  },
  computed: {
    totalTransactions() {
      if (this.transactionsData?.length) {
        return this.transactionsData[0]?.totalCount;
      }
      return 0;
    },
  },
  async created() {
    const walletData = JSON.parse(localStorage.getItem('wallet'));
    if (walletData.id) {
      this.currentWallet = walletData;
      const skip = (this.page - 1) * this.limit;
      const query = `walletId=${walletData.id}&skip=${skip}&limit=${this.limit}`;
      const transactData = await ApiFactory.getTransaction(query);
      if (transactData?.data?.data) {
        this.transactionsData = transactData?.data?.data;
      }
    }
  },
  methods: {
    async setPage(page) {
      if (this.currentWallet && page) {
        const skip = (page - 1) * this.limit;
        const query = `walletId=${this.currentWallet.id}&skip=${skip}&limit=${this.limit}`;
        const transactData = await ApiFactory.getTransaction(query);
        if (transactData?.data?.data) {
          this.transactionsData = transactData?.data?.data;
        }
      }
    },
    async routeTransactions() {
      if (this.currentWallet) {
        const result = await ApiFactory.exportTransaction(this.currentWallet.id);
        if (result) {
          this.$message({
            message: 'Export Transactions successfull',
            type: 'success',
          });
        }
      }
    },
  },
};
</script>
