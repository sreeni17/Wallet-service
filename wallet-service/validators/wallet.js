const Joi = require('joi');
const { isEmpty } = require('lodash');

class WalletValidation {
    constructor(type) {
        this.type = type;
      }
      createWalletSchema() {
        return Joi.object({
            balance: Joi.number(),
            name: Joi.string().required(),
        });
      }
    validate(data) {
        if (isEmpty(data)) {
          this.errors = [];
          return true;
        }

        let schema = {};
        switch(this.type) {
            case 'create-wallet': {
                schema = this.createWalletSchema();
                break;
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
