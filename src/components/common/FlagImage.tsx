import Image from 'next/image';
import { useState } from 'react';
import DefaultFlag from '@/components/icons/DefaultFlag';

interface FlagImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function FlagImage({ src, alt, className = '' }: FlagImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center text-gray-400 ${className}`}>
        <DefaultFlag />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
} 