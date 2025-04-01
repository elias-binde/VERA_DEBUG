import * as Crypto from 'expo-crypto'
import CryptoJS from 'crypto-js'

function generateWordArray(bytes: number) {
    const randomBytes = Crypto.getRandomBytes(bytes)
    return CryptoJS.lib.WordArray.create(randomBytes)
}

export function encryptString(secret: string, saltStr: string) {
    const plainText = `${secret}::${new Date().toString()}`

    const salt = generateWordArray(16)
    const iv = generateWordArray(16)

    console.log(salt)
    const key = CryptoJS.PBKDF2(saltStr, salt, {
        hasher: CryptoJS.algo.SHA512,
        keySize: 64 / 8,
        iterations: 999,
    })

    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv,
    })

    const data = {
        amtext: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
        slam_ltol: CryptoJS.enc.Hex.stringify(salt),
        iavmol: CryptoJS.enc.Hex.stringify(iv),
    }

    return btoa(JSON.stringify(data));
}
