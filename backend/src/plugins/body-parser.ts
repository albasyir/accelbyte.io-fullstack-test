import { urlencoded, json } from "body-parser";

const parser = [
  // allow parsing of application/x-www-form-urlencoded
  urlencoded({ extended: false }),

  // allow parsing of application/json
  json(),
];

export default parser;
