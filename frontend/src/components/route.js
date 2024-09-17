import WalletSubmit from './WalletSubmit.vue';
import WalletTransactions from './WalletTransactions.vue';
import Task from './Task.vue';
import Hire from './Hire.vue';
import TaskStatus from './TaskStatus.vue';
import DescriptionResumeUpload from './DescriptionResumeUpload.vue';
import Reports from './Reports.vue';

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
    path: '/hire',
    name: 'Hire',
    component: Hire,
    meta: {
      title: 'Hire',
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
  {
    path: '/task/status',
    name: 'TaskStatus',
    component: TaskStatus,
    meta: {
      title: 'TaskStatus',
    },
  },
  {
    path: '/resume-upload',
    name: 'Resume Upload',
    component: DescriptionResumeUpload,
    meta: {
      title: 'Resume Upload',
    },
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
    meta: {
      title: 'Reports',
    },
  },
];
export default routes;
