import Image from 'next/image';
import { Match } from '@/types/match';

interface MatchCardProps {
  match: Match;
  onClick: () => void;
}

export default function MatchCard({ match, onClick }: MatchCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-[#005c34] rounded-lg p-4 cursor-pointer hover:bg-[#006b3d] transition-colors"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 relative">
            <Image
              src={match.league.flag}
              alt={match.league.country}
              fill
              className="object-cover rounded-full"
            />
          </div>
          <span className="text-sm text-gray-300">{match.league.name}</span>
          <span className="text-xs text-gray-400">({match.league.country})</span>
        </div>
        <span className="text-sm text-gray-300">{match.time}'</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 flex-1">
          <div className="w-8 h-8 relative">
            <Image
              src={match.homeTeam.logo}
              alt={match.homeTeam.name}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-white font-medium">{match.homeTeam.name}</span>
        </div>
        
        <div className="px-4">
          <div className="flex space-x-3 text-white font-bold">
            <span>{match.score.home}</span>
            <span>-</span>
            <span>{match.score.away}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 flex-1 justify-end">
          <span className="text-white font-medium">{match.awayTeam.name}</span>
          <div className="w-8 h-8 relative">
            <Image
              src={match.awayTeam.logo}
              alt={match.awayTeam.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 