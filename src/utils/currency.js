export const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  // Ambil angka saja, misal "85K" -> 85, "100K / level" -> 100
  // Hapus karakter non-digit kecuali K
  let cleanStr = priceStr.toUpperCase().replace(/[^0-9K]/g, '');
  
  // Jika ada K, kalikan 1000
  if (cleanStr.includes('K')) {
    let number = parseFloat(cleanStr.replace('K', ''));
    return number * 1000;
  }
  
  return parseInt(cleanStr) || 0;
};

export const formatIDR = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};
