import Image from 'next/image';
import { useState } from 'react';

interface FlagImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function FlagImage({ src, alt, className }: FlagImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return <div className={`bg-gray-700 ${className}`} />;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const imagePath = src.startsWith('/') ? `${basePath}${src}` : src;

  return (
    <Image
      src={imagePath}
      alt={alt}
      fill
      className={className}
      onError={() => setError(true)}
    />
  );
} 