const CryptoJS = require('ts.cryptojs256');

/**
 * Return a base64 URL
 *
 * @param {string} data - some data to be base64 encoded
 * @return {string} A base64url encoded string
 */
function base64url (data) {
  return CryptoJS.enc.Base64
    .stringify(data)
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Create a very basic JWT signature
 *
 * @param {Object} data - the data object you want to have signed
 * @param {string} secret - secret to use to sign token with
 * @param {Object} options - JWT header options
 * @return {string} JSON Web Token that has been signed
 */
function sign (data, secret, options = {}) {
  const defaultOptions = {
    alg: 'HS256',
    typ: 'JWT'
  };
  const header = Object.assign(defaultOptions, options);
  if (header.alg !== 'HS256' && header.typ !== 'JWT') {
    throw new Error('jwt-encode only support the HS256 algorithm and the JWT type of hash');
  }

  const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);

  const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
  const encodedData = base64url(stringifiedData);

  let signature = `${encodedHeader}.${encodedData}`;
  signature = CryptoJS.HmacSHA256(signature, secret);
  signature = base64url(signature);
  return `${encodedHeader}.${encodedData}.${signature}`;
}

module.exports = sign;
