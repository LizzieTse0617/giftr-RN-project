import * as Crypto from 'expo-crypto';

// Function to generate a unique ID
const generateUniqueId = async () => {
  try {
    // Generate a unique string (e.g., a random UUID-like string)
    const uniqueString = `${Date.now()}-${Math.random()}`;
    
    // Calculate the SHA-256 hash of the unique string
    const id = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      uniqueString
    );

    // Create a shortened ID using the first 16 characters of the hash
    const formattedId = `${id.substring(0, 8)}-${id.substring(8, 12)}-${id.substring(12, 16)}-${id.substring(16, 20)}-${id.substring(20, 32)}`;
  
    return formattedId;
  } catch (error) {
    console.error('Error generating ID:', error);
    return null;
  }
};

export default generateUniqueId;
