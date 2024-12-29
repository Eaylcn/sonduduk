import { Match } from '@/types/match';

export const filterMatches = (
  matches: Match[],
  filter: 'all' | 'live' | 'favorites',
  favorites: string[] = []
): Match[] => {
  switch (filter) {
    case 'live':
      return matches.filter(match => 
        match.status === 'live' || match.status === 'half_time'
      );
    case 'favorites':
      return matches.filter(match => favorites.includes(match.id));
    default:
      return matches;
  }
}; 