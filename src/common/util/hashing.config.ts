import * as cryptoJS from 'crypto-js'
import { env } from '../config/env.config';

export const encryptWithAES = (text) => {
  const passphere = env.PASS_HASH_SECRET
  return cryptoJS.AES.encrypt(text, passphere).toString();
}

export const decryptWithAES = (ciphertext) => {
  const passphrase = env.PASS_HASH_SECRET
  const bytes = cryptoJS.AES.decrypt(ciphertext, passphrase)
  const originalText = bytes.toString(cryptoJS.enc.Utf8)
  return originalText
}