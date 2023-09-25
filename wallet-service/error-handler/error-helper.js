function errorParser(error) {
    return { field: error.path[0], message: error.message.replace(/"([^"]+(?="))"/g, '$1') };
}

class JoiValidationError {
    static construct(error) {
      return error.details.map((err) => errorParser(err));
    }
  }
  
module.exports = JoiValidationError;