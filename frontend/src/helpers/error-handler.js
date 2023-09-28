/* eslint-disable import/no-extraneous-dependencies */
import APP_ERROR from './appErrors';

const getErr = APP_ERROR;

class HandleResponses {
  static Status(result) {
    if (result) {
      let text = '';
      const status = (result && result.response && result.response.status) || '';
      const { code, data, message, field } = (result && result.response
        && result.response.data && result.response.data.errors) ?
        result.response.data.errors[0] : { };
      switch (status) {
        case 204:
          return { success: 'OK' };
        case 400:
          if (code && data && data.length) {
            text = getErr[code] + data.toString();
          } else if (code && getErr[code]) {
            text = getErr[code];
          } else if (field && message) {
            text = `${field.replaceAll('_', ' ')} - ${message}`;
          } else if (field || message) {
            text = (field) ? `${field.replaceAll('_', ' ')} ${getErr.REQUIRED_ERROR}` : `${getErr.VALIDATION_FAILS} - ${message}`;
          } else {
            text = getErr['400'];
          }
          return { error: text };

        case 401:
        case 403:
        case 404:
        case 500:
        case 503:
          return { error: getErr[status.toString()] };

        case 409:
          return { error: message };

        default:
          return { error: getErr.GENERAL_ERR };
      }
    }
    return { error: getErr.GENERAL_ERR };
  }
}

export default HandleResponses;
