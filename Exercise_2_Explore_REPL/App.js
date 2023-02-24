const crypto = require("crypto");

const id = crypto.randomBytes(4);
console.log(
  `Random ID generated: ${id.toString('hex')}`);
