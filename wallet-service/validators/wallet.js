const Joi = require('joi');
const { isEmpty } = require('lodash');

class WalletValidation {
  constructor(type) {
    this.type = type;
  }

  listTransactSchema() {
    return Joi.object({
      walletId: Joi.number().required(),
      skip: Joi.number().min(0).optional(),
      limit: Joi.number().min(1).optional(),
    });
  }

  createWalletSchema() {
    return Joi.object({
      balance: Joi.number().required(),
      name: Joi.string().required(),
    });
  }

  transactSchema() {
    return Joi.object({
      amount: Joi.number().required(),
      description: Joi.string().required(),
    });
  }

  validate(data) {
    if (isEmpty(data)) {
      this.errors = [];
      return true;
    }

    let schema = {};
    switch (this.type) {
      case 'create-wallet': {
        schema = this.createWalletSchema();
        break;
      }
      case 'transact-wallet': {
        schema = this.transactSchema();
        break;
      }
      case 'list-transactions': {
        schema = this.listTransactSchema();
        break
      }
    }
    const { error, value } = schema.validate(data);
    if (error) {
      this.value = {};
      this.errors = error;
      return false;
    }
    this.value = value;
    this.errors = [];
    return true;
  }
}

module.exports = WalletValidation;
