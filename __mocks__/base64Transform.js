/* eslint-disable @typescript-eslint/no-var-requires */
const { Base64 } = require('js-base64');
const fs = require('fs');

module.exports = {
  process(_src, filename) {
    let buffer = fs.readFileSync(filename);
    const encoded = Base64.encode(buffer);
    return { code: `module.exports = '${encoded}';` };
  },
};
