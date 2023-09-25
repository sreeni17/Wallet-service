/* eslint-disable no-useless-catch */
import axios from '../../axios';

const setupWallet = async (data) => {
  try {
    const result = await axios.post('/wallet/setup', data);
    return result;
  } catch (error) {
    throw error;
  }
};

const setupTransaction = async (data, walletId) => {
  try {
    const result = await axios.post(`/transact/${walletId}`, data);
    return result;
  } catch (error) {
    throw error;
  }
};

const getTransaction = async (queryParams) => {
  try {
    const result = await axios.get(`/transactions?${queryParams}`);
    return result;
  } catch (error) {
    throw error;
  }
};

const exportTransaction = async (walletId) => {
  try {
    const result = await axios({
      url: `/transactions_export/${walletId}`,
      method: 'GET',
      responseType: 'blob',
    });
    if (result) {
      const url = window.URL.createObjectURL(new Blob([result]));
      const link = document.createElement('a');
      link.href = url;
      const now = new Date().toISOString();
      link.setAttribute('download', `transactions-${now}.xlsx`);
      document.body.appendChild(link);
      link.click();
    }
    return true;
  } catch (error) {
    throw error;
  }
};

export default {
  setupWallet,
  setupTransaction,
  getTransaction,
  exportTransaction,
};
