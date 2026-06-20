import { Parser } from "json2csv";

const parser = new Parser();

const csv =
  parser.parse(orders);

return new Response(csv, {
  headers: {
    "Content-Type":
      "text/csv",
  },
});