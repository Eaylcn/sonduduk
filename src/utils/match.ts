import { Match } from '@/types/match';

export const getMatchStatusColor = (status: Match['status']) => {
  switch (status) {
    case 'LIVE':
      return 'text-green-400';
    case 'FINISHED':
      return 'text-gray-400';
    case 'SCHEDULED':
      return 'text-yellow-400';
    default:
      return 'text-gray-400';
  }
};

export const formatMatchTime = (time: string): string => {
  // Zaten formatlanmış değerleri olduğu gibi döndür
  if (time === 'İY' || time === 'MS') {
    return time;
  }

  // Uzatma dakikalarını kontrol et (örn: 45+2')
  if (time.includes('+')) {
    return time;
  }

  // Normal dakikaları formatla (örn: 67')
  if (time.includes('\'')) {
    return time;
  }

  // Başlangıç saatini olduğu gibi döndür (örn: 21:45)
  return time;
}; 