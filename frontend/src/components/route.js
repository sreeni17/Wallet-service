import WalletSubmit from '@/components/WalletSubmit';
import WalletTransactions from '@/components/WalletTransactions';

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
];
export default routes;
