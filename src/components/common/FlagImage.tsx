import Image from 'next/image';
import { useState } from 'react';
import imageLoader from '@/utils/imageLoader';

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

  return (
    <Image
      loader={imageLoader}
      src={src}
      alt={alt}
      fill
      className={className}
      onError={() => setError(true)}
    />
  );
} 