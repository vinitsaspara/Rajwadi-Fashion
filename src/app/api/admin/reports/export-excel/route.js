import ExcelJS from "exceljs";

const workbook =
  new ExcelJS.Workbook();

const worksheet =
  workbook.addWorksheet("Orders");

const buffer =
  await workbook.xlsx.writeBuffer();

return new Response(buffer, {
  headers: {
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition":
      'attachment; filename="orders.xlsx"',
  },
});