import axios from '../../axios';

const setupWallet = async (data) => {
    try {
      const result = await axios.post(`/wallet/setup`, data);
      return result;
    } catch (error) {
      throw error;
    }
  };

export default {
    setupWallet,
}