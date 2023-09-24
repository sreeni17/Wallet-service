const xlsx = require('xlsx');

class ExcelGenerator {
  constructor(data, sheetName) {
    this.data = data;
    this.sheetName = sheetName;
  }

  generateXls(options = { cellDates: true, dateNF: 'dd/MM/yyyy' }) {
    try {
      const workBook = xlsx.utils.book_new();
      const workSheet = xlsx.utils.json_to_sheet(this.data, options);
      xlsx.utils.book_append_sheet(workBook, workSheet, this.sheetName);
      return xlsx.write(workBook, { type: 'buffer', bookType: 'xlsx', compression: true });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ExcelGenerator;
