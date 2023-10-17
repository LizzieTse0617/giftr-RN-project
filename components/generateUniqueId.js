import * as Crypto from 'expo-crypto';

const generateUniqueId = () => {
  try {
    const id = Crypto.randomUUID();
    return id;
  } catch (error) {
    console.error('Error generating ID:', error);
    return null;
  }
};

export default generateUniqueId;
