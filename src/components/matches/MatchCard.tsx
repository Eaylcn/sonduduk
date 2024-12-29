import Image from 'next/image';
import { Match } from '@/types/match';
import { formatMatchTime } from '@/utils/match';
import { useFavorites } from '@/store/favorites';
import DefaultTeamLogo from '@/components/icons/DefaultTeamLogo';
import { useState } from 'react';

interface MatchCardProps {
  match: Match;
  onClick: () => void;
}

const TeamLogo = ({ logo, name }: { logo?: string; name: string }) => {
  const [error, setError] = useState(false);

  if (!logo || error) {
    return <Image
      src="/teams/default-team.svg"
      alt={name}
      fill
      sizes="24px"
      className="object-contain"
    />;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const imagePath = logo.startsWith('/') ? `${basePath}${logo}` : logo;

  return (
    <Image
      src={imagePath}
      alt={name}
      fill
      sizes="24px"
      className="object-contain"
      onError={() => setError(true)}
    />
  );
};

export default function MatchCard({ match, onClick }: MatchCardProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some(m => m.id === match.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(match);
  };

  const isHomeWinning = match.status !== 'scheduled' && match.score.home > match.score.away;
  const isAwayWinning = match.status !== 'scheduled' && match.score.away > match.score.home;

  return (
    <div className="relative">
      <div 
        onClick={onClick}
        className="w-full bg-[#002815]/50 backdrop-blur-sm rounded-2xl p-4 text-left transition-all duration-300 hover:bg-[#002815]/80 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#002815]/50 group cursor-pointer"
      >
        <div className="flex items-center gap-4">
          {/* Zaman */}
          <div className="w-[60px] text-center">
            <div className="text-white font-medium group-hover:scale-105 transition-transform duration-300">
              {formatMatchTime(match.time)}
            </div>
            {match.status === 'live' && (
              <div className="text-xs text-red-500 font-medium flex items-center justify-center gap-1 mt-0.5">
                <div className="relative flex">
                  <div className="w-1.5 h-1.5 bg-current rounded-full" />
                  <div className="w-1.5 h-1.5 bg-current rounded-full absolute animate-ping" />
                </div>
                <span>CANLI</span>
              </div>
            )}
          </div>

          {/* Dikey Çizgi */}
          <div className="w-0.5 self-stretch bg-[#003a1f] group-hover:bg-[#004e2a] transition-colors duration-300" />

          {/* Takımlar ve Skor */}
          <div className="flex-1 space-y-2">
            {/* Ev Sahibi */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 relative flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-300">
                <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} />
              </div>
              <span className={`text-white font-medium flex-1 group-hover:translate-x-1 transition-all duration-300 ${!isHomeWinning && match.status !== 'scheduled' ? 'text-opacity-50' : ''}`}>
                {match.homeTeam.name}
              </span>
              {match.status !== 'scheduled' && (
                <span className={`text-white font-medium transition-all duration-300 ${isHomeWinning ? 'text-opacity-100 group-hover:scale-110' : 'text-opacity-50'}`}>
                  {match.score.home}
                </span>
              )}
            </div>

            {/* Deplasman */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 relative flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-300">
                <TeamLogo logo={match.awayTeam.logo} name={match.awayTeam.name} />
              </div>
              <span className={`text-white font-medium flex-1 group-hover:translate-x-1 transition-all duration-300 ${!isAwayWinning && match.status !== 'scheduled' ? 'text-opacity-50' : ''}`}>
                {match.awayTeam.name}
              </span>
              {match.status !== 'scheduled' && (
                <span className={`text-white font-medium transition-all duration-300 ${isAwayWinning ? 'text-opacity-100 group-hover:scale-110' : 'text-opacity-50'}`}>
                  {match.score.away}
                </span>
              )}
            </div>
          </div>

          {/* Dikey Çizgi */}
          <div className="w-0.5 self-stretch bg-[#003a1f] group-hover:bg-[#004e2a] transition-colors duration-300" />

          {/* Favori Butonu */}
          <button
            onClick={handleFavoriteClick}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 relative
              ${isFavorite 
                ? 'text-yellow-500 hover:text-yellow-400 hover:scale-110 hover:rotate-12' 
                : 'text-gray-300 hover:text-white hover:scale-110 hover:rotate-12'}
            `}
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5 transition-transform duration-500" 
              fill={isFavorite ? 'currentColor' : 'none'} 
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 