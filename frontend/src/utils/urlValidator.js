export const isValidUrl = (url) => {
  if (!url) return false;

  try {
    // Essayer de créer un nouvel objet URL
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const isSecureUrl = (url) => {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    // Vérifier si le protocole est HTTPS
    return urlObj.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

export const isLocalUrl = (url) => {
  if (!url) return false;
  
  // URL relative
  if (url.startsWith('/')) return true;
  
  try {
    const urlObj = new URL(url);
    // Vérifier si le domaine est localhost ou une IP locale
    return urlObj.hostname === 'localhost' ||
           urlObj.hostname === '127.0.0.1' ||
           urlObj.hostname === '[::1]';
  } catch (e) {
    return false;
  }
};
