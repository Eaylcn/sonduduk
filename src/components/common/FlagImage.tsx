import Image from 'next/image';
import { useState } from 'react';

interface FlagImageProps {
  src: string;
  alt: string;
  className?: string;
}

const getAssetPath = (path: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/sonduduk' : '';
  return `${basePath}${path}`;
};

export default function FlagImage({ src, alt, className }: FlagImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return <div className={`bg-gray-700 ${className}`} />;
  }

  return (
    <Image
      src={getAssetPath(src)}
      alt={alt}
      fill
      className={className}
      onError={() => setError(true)}
    />
  );
} 