import * as Crypto from 'expo-crypto';

const generateUniqueId = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = await Crypto.randomUUID();
      resolve(id);
    } catch (error) {
      console.error('Error generating ID:', error);
      reject(error);
    }
  });
};

export default generateUniqueId;
