/**
 * @author Nicholas Vorie - github.com/nickvorie
 */

module.exports = {
  process(src, filename) {
    //Encode the source file to hex (to avoid escape issues with the code below)
    let encoded = Buffer.from(src, 'utf-8').toString('hex');

    //Generate transformer code that decodes an exports the hex string
    let code = `module.exports = Buffer.from("${encoded}", "hex").toString("utf-8")`;

    return { code };
  },
};
