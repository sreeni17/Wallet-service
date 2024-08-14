import WalletSubmit from './WalletSubmit.vue';
import WalletTransactions from './WalletTransactions.vue';
import Task from './Task.vue';
import TaskStatus from './TaskStatus.vue';

const routes = [
  {
    path: '/',
    name: 'Wallet',
    component: WalletSubmit,
    meta: {
      title: 'Wallet',
    },
  },
  {
    path: '/task',
    name: 'Task',
    component: Task,
    meta: {
      title: 'Task',
    },
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: WalletSubmit,
    meta: {
      title: 'Wallet',
    },
  },
  {
    path: '/wallet/transactions',
    name: 'Transactions',
    component: WalletTransactions,
    meta: {
      title: 'Transactions',
    },
  },
  {
    path: '/task/status',
    name: 'TaskStatus',
    component: TaskStatus,
    meta: {
      title: 'TaskStatus',
    },
  },
];
export default routes;
