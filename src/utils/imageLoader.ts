export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // Eğer src zaten http veya https ile başlıyorsa, doğrudan döndür
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // Eğer src zaten basePath ile başlıyorsa, doğrudan döndür
  if (src.startsWith(basePath)) {
    return src;
  }

  // Diğer durumda, basePath'i ekle
  return `${basePath}${src}`;
} 