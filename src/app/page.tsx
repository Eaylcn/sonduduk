'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import MatchCard from '@/components/matches/MatchCard';
import { mockMatches, yesterdayMatches, tomorrowMatches } from '@/data/mockMatches';
import { Match } from '@/types/match';
import { filterMatches } from '@/utils/filters';
import { useFavorites } from '@/store/favorites';
import FlagImage from '@/components/common/FlagImage';
import { formatMatchTime } from '@/utils/match';

const LeagueIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41M12 7a5 5 0 110 10 5 5 0 010-10z"
    />
  </svg>
);

const LeagueLogo = ({ league }: { league: Match['league'] }) => {
  return (
    <div className="w-6 h-6 relative flex items-center justify-center">
      <LeagueIcon />
    </div>
  );
};

export default function Home() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'live'>('all');
  const [selectedDate, setSelectedDate] = useState<'yesterday' | 'today' | 'tomorrow' | number>('today');
  const [selectedMonth, setSelectedMonth] = useState(12);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const { favorites, showFavorites, toggleFavorites, clearFavorites } = useFavorites();
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Ay değiştirme fonksiyonları
  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
    setSelectedDate('today');
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
    setSelectedDate('today');
  };

  // Ay ismini getir
  const getMonthName = (month: number) => {
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return months[month - 1];
  };

  // Seçili güne göre maçları getir
  const getMatchesByDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Seçilen tarih bugün mü kontrol et
    const isSelectedDateToday = () => {
      if (typeof selectedDate === 'number') {
        const selectedDateObj = new Date(selectedYear, selectedMonth - 1, selectedDate);
        return selectedDateObj.getTime() === today.getTime();
      }
      return selectedDate === 'today';
    };

    // Seçilen tarih dün mü kontrol et
    const isSelectedDateYesterday = () => {
      if (typeof selectedDate === 'number') {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const selectedDateObj = new Date(selectedYear, selectedMonth - 1, selectedDate);
        return selectedDateObj.getTime() === yesterday.getTime();
      }
      return selectedDate === 'yesterday';
    };

    // Seçilen tarih yarın mı kontrol et
    const isSelectedDateTomorrow = () => {
      if (typeof selectedDate === 'number') {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const selectedDateObj = new Date(selectedYear, selectedMonth - 1, selectedDate);
        return selectedDateObj.getTime() === tomorrow.getTime();
      }
      return selectedDate === 'tomorrow';
    };

    if (isSelectedDateYesterday()) {
      return yesterdayMatches;
    } else if (isSelectedDateToday()) {
      return mockMatches;
    } else if (isSelectedDateTomorrow()) {
      return tomorrowMatches;
    }
    
    return [];
  };

  // Maçları filtrele ve liglere göre grupla
  const filteredMatches = filterMatches(getMatchesByDate(), activeFilter).filter(match => 
    !selectedLeague || match.league.id === selectedLeague
  );
  
  // Favorileri ve normal maçları ayrı ayrı grupla
  const groupMatchesByLeague = (matches: Match[]) => {
    return matches.reduce((acc, match) => {
      const leagueId = match.league.id;
      if (!acc[leagueId]) {
        acc[leagueId] = {
          league: match.league,
          matches: []
        };
      }
      acc[leagueId].matches.push(match);
      return acc;
    }, {} as Record<string, { league: Match['league']; matches: Match[] }>);
  };

  const favoriteMatchesByLeague = groupMatchesByLeague(favorites);
  const matchesByLeague = groupMatchesByLeague(filteredMatches);

  // Takvim günlerine tıklama fonksiyonu
  const handleDateClick = useCallback((day: number) => {
    const clickedDate = new Date(selectedYear, selectedMonth - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (clickedDate.getTime() === yesterday.getTime()) {
      setSelectedDate('yesterday');
    } else if (clickedDate.getTime() === today.getTime()) {
      setSelectedDate('today');
    } else if (clickedDate.getTime() === tomorrow.getTime()) {
      setSelectedDate('tomorrow');
    } else {
      setSelectedDate(day);
    }
  }, [selectedYear, selectedMonth]);

  // Seçili tarihi formatla
  const formatSelectedDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Saati sıfırla

    if (typeof selectedDate === 'number') {
      const date = new Date(selectedYear, selectedMonth - 1, selectedDate);
      return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    }
    
    // Özel günler için (dün, bugün, yarın)
    const date = new Date(today);
    switch (selectedDate) {
      case 'yesterday':
        date.setDate(date.getDate() - 1);
        break;
      case 'tomorrow':
        date.setDate(date.getDate() + 1);
        break;
      default: // today
        break;
    }
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  };

  // Maç olan günleri kontrol et
  const hasMatchesOnDate = (day: number) => {
    const date = new Date(selectedYear, selectedMonth - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return date.getTime() === yesterday.getTime() || 
           date.getTime() === today.getTime() || 
           date.getTime() === tomorrow.getTime();
  };

  // Ayın ilk gününün haftanın hangi günü olduğunu hesapla (0: Pazar, 1: Pazartesi, ...)
  const getFirstDayOfMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Pazartesi'yi 0 yap
  };

  // Ayın kaç gün olduğunu hesapla
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  // Takvim günlerini oluştur
  const generateCalendarDays = () => {
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const days = [];

    // Önceki ayın son günlerini ekle
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: 0, isCurrentMonth: false });
    }

    // Bu ayın günlerini ekle
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    return days;
  };

  // Seçili tarihi kontrol et
  const isSelectedDay = (day: number) => {
    if (typeof selectedDate === 'number') {
      return selectedDate === day;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const selectedDateObj = new Date(selectedYear, selectedMonth - 1, day);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    switch (selectedDate) {
      case 'yesterday':
        return selectedDateObj.getTime() === yesterday.getTime();
      case 'today':
        return selectedDateObj.getTime() === today.getTime();
      case 'tomorrow':
        return selectedDateObj.getTime() === tomorrow.getTime();
      default:
        return false;
    }
  };

  // Bugün mü kontrol et
  const isToday = (day: number) => {
    const today = new Date();
    const currentDate = new Date(selectedYear, selectedMonth - 1, day);
    return currentDate.getDate() === today.getDate() &&
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  return (
    <main className="min-h-screen bg-[#003a1f]">
      <Navbar />
      
      <div className="container mx-auto flex gap-6 p-6">
        {/* Sol Sidebar - Filtreler */}
        <div className="w-[300px] rounded-2xl bg-[#002815]/50 backdrop-blur-sm p-6">
          <div className="space-y-8">
            {/* Takvim */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-white font-medium">Takvim</h3>
                  <button
                    onClick={() => {
                      const today = new Date();
                      setSelectedDate('today');
                      setSelectedMonth(today.getMonth() + 1);
                      setSelectedYear(today.getFullYear());
                    }}
                    className={`
                      text-xs px-2 py-1 rounded-lg transition-all duration-300
                      ${selectedDate === 'today'
                        ? 'bg-white text-[#003a1f]'
                        : 'text-gray-400 hover:text-white hover:bg-[#003a1f]/30'}
                    `}
                  >
                    Bugün
                  </button>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="text-white hover:bg-[#003a1f]/30 rounded-lg px-3 py-1 transition-all duration-300 flex items-center gap-2"
                  >
                    {getMonthName(selectedMonth)} {selectedYear}
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${showDatePicker ? 'rotate-180' : ''}`}
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Tarih Seçici */}
                  {showDatePicker && (
                    <div className="absolute top-full mt-2 right-0 bg-[#002815] rounded-xl shadow-lg shadow-black/20 p-3 min-w-[200px] z-50">
                      <div className="flex items-center justify-between mb-3">
                        <button
                          onClick={() => setSelectedYear(prev => prev - 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#003a1f]/30 transition-all duration-300"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <span className="text-white font-medium">{selectedYear}</span>
                        <button
                          onClick={() => setSelectedYear(prev => prev + 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#003a1f]/30 transition-all duration-300"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <button
                            key={month}
                            onClick={() => {
                              setSelectedMonth(month);
                              setShowDatePicker(false);
                            }}
                            className={`
                              p-2 rounded-lg text-sm transition-all duration-300
                              ${selectedMonth === month
                                ? 'bg-white text-[#003a1f]'
                                : 'text-gray-300 hover:text-white hover:bg-[#003a1f]/30'}
                            `}
                          >
                            {getMonthName(month).slice(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Takvim Grid */}
              <div className="grid grid-cols-7 gap-1 text-center mb-3">
                {['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pa'].map((day) => (
                  <div key={day} className="text-gray-400 text-xs font-medium">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {generateCalendarDays().map((dayInfo, index) => {
                  if (!dayInfo.isCurrentMonth) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

                  const day = dayInfo.day;
                  const isSelected = isSelectedDay(day);
                  const isTodayDate = isToday(day);
                  const hasMatches = hasMatchesOnDate(day);

                  const hasFavoriteMatches = favorites.some(match => {
                    // Burada gerçek veri ile kontrol yapılacak
                    return false;
                  });
                  
                  return (
                    <button
                      key={`day-${day}`}
                      onClick={() => handleDateClick(day)}
                      className={`
                        aspect-square rounded-lg flex items-center justify-center text-sm transition-all duration-300 relative group
                        ${isSelected
                          ? 'bg-white text-[#003a1f] font-medium shadow-lg shadow-white/20' 
                          : isTodayDate
                            ? 'ring-2 ring-white/50 text-white hover:bg-[#003a1f]/30'
                            : hasMatches
                              ? 'text-white bg-[#003a1f]/30 hover:bg-[#003a1f]/50 cursor-pointer font-medium'
                              : 'text-gray-500 hover:bg-[#003a1f]/10 hover:text-gray-300 cursor-pointer'}
                        ${hasFavoriteMatches ? 'ring-2 ring-yellow-500/50' : ''}
                      `}
                    >
                      {day}
                      {hasFavoriteMatches && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full" />
                      )}
                      {hasMatches && !isSelected && !isTodayDate && (
                        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Favoriler Notu */}
              {favorites.length > 0 && (
                <div className="mt-4 flex items-center gap-2 bg-[#003a1f]/30 rounded-xl p-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="text-xs text-gray-400">Favori maçlarınız var</span>
                </div>
              )}
            </div>

            {/* Filtreler */}
            <div>
              <h3 className="text-white font-medium mb-4">Filtreler</h3>
              <div className="bg-[#003a1f]/30 p-1 rounded-full flex relative">
                <div 
                  className="absolute inset-y-1 transition-all duration-500 ease-in-out rounded-full bg-white"
                  style={{
                    width: 'calc(50% - 4px)',
                    left: activeFilter === 'all' ? '4px' : 'calc(50% + 4px)',
                  }}
                />
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`
                    flex-1 rounded-full py-1.5 text-sm transition-all duration-500 font-medium relative z-10
                    ${activeFilter === 'all' ? 'text-[#003a1f]' : 'text-gray-300 hover:text-white'}
                  `}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setActiveFilter('live')}
                  className={`
                    flex-1 rounded-full py-1.5 text-sm transition-all duration-500 font-medium flex items-center justify-center gap-1.5 relative z-10
                    ${activeFilter === 'live' ? 'text-[#003a1f]' : 'text-gray-300 hover:text-white'}
                  `}
                >
                  <div className="relative flex items-center">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full absolute animate-ping" />
                  </div>
                  <span>Canlı</span>
                </button>
              </div>
            </div>

            {/* Ligler */}
            <div>
              <h3 className="text-white font-medium mb-4">Popüler Ligler</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedLeague(null)}
                  className={`
                    w-full rounded-xl p-3 text-sm transition-all flex items-center gap-3
                    ${!selectedLeague 
                      ? 'bg-white text-[#003a1f]' 
                      : 'text-gray-300 bg-[#003a1f]/30 hover:bg-[#003a1f]/50 hover:text-white'}
                  `}
                >
                  <div className="w-6 h-6 relative flex items-center justify-center text-current">
                    <LeagueIcon />
                  </div>
                  <span>Tüm Ligler</span>
                </button>

                {[
                  { id: 'champions-league', name: 'Şampiyonlar Ligi' },
                  { id: 'europa-league', name: 'Avrupa Ligi' },
                  { id: 'super-lig', name: 'Süper Lig' },
                  { id: 'premier-league', name: 'Premier Lig' },
                  { id: 'la-liga', name: 'La Liga' },
                  { id: 'bundesliga', name: 'Bundesliga' },
                  { id: 'serie-a', name: 'Serie A' },
                  { id: 'ligue-1', name: 'Ligue 1' }
                ].map((league) => (
                  <button 
                    key={league.id}
                    onClick={() => setSelectedLeague(league.id)}
                    className={`
                      w-full rounded-xl p-3 text-sm transition-all flex items-center gap-3
                      ${selectedLeague === league.id
                        ? 'bg-white text-[#003a1f]' 
                        : 'text-gray-300 bg-[#003a1f]/30 hover:bg-[#003a1f]/50 hover:text-white'}
                    `}
                  >
                    <div className="w-6 h-6 relative flex items-center justify-center text-current">
                      <LeagueIcon />
                    </div>
                    <span>{league.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ana İçerik Container */}
        <div className="flex-1 relative">
          <div 
            className={`
              transition-all duration-500 ease-in-out
              ${selectedMatch ? 'mr-[400px]' : ''}
            `}
          >
            <div className="space-y-8">
              {/* Favoriler - Sadece favori maç varsa göster */}
              {favorites.length > 0 && (
                <div className="bg-[#002815]/50 backdrop-blur-sm rounded-2xl overflow-hidden">
                  <div 
                    onClick={toggleFavorites}
                    className="p-4 flex items-center justify-between text-white cursor-pointer hover:bg-[#003a1f]/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <svg 
                        viewBox="0 0 24 24" 
                        className="w-5 h-5" 
                        fill="currentColor" 
                        stroke="none"
                      >
                        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                      <span className="font-medium">Favoriler</span>
                      <svg 
                        viewBox="0 0 24 24" 
                        className={`w-5 h-5 transition-transform duration-500 ${showFavorites ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearFavorites();
                      }}
                      className="text-sm text-gray-300 hover:text-white hover:bg-[#003a1f]/30 transition-all duration-300 rounded-xl px-3 py-2"
                    >
                      Favorileri Temizle
                    </button>
                  </div>

                  <div 
                    className={`
                      transition-all duration-500 ease-in-out origin-top
                      ${showFavorites ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
                    `}
                  >
                    {Object.values(favoriteMatchesByLeague).map(({ league, matches }) => (
                      <div key={`fav-${league.id}`} className="p-4 pt-0 space-y-6">
                        {/* Lig Başlığı */}
                        <div className="mb-4 flex items-center gap-3">
                          <div className="w-6 h-6 relative flex items-center justify-center">
                            <FlagImage
                              src={league.flag}
                              alt={league.country}
                              className="w-full h-full rounded-full transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-400 text-xs transition-all duration-300 group-hover:text-gray-300">
                              {league.country}
                            </span>
                            <h3 className="text-white font-medium leading-tight transition-all duration-300 group-hover:translate-x-0.5">
                              {league.name}
                            </h3>
                          </div>
                        </div>

                        {/* Maçlar */}
                        <div className="grid gap-3 md:grid-cols-2">
                          {matches.map((match) => (
                            <div key={match.id} className="relative">
                              <MatchCard
                                match={match}
                                onClick={() => setSelectedMatch(selectedMatch?.id === match.id ? null : match)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Normal Maçlar */}
              {Object.entries(matchesByLeague).length > 0 ? (
                <div className="transition-all duration-500 ease-in-out">
                  {Object.values(matchesByLeague).map(({ league, matches }) => (
                    <div key={league.id}>
                      {/* Lig Başlığı */}
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 relative">
                            <FlagImage
                              src={league.flag}
                              alt={league.country}
                              className="w-full h-full rounded-full"
                            />
                          </div>
                          <div className="w-6 h-6 relative flex items-center justify-center text-gray-400">
                            <LeagueIcon />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-400 text-xs transition-all duration-300 group-hover:text-gray-300">
                            {league.country}
                          </span>
                          <h3 className="text-white font-medium leading-tight transition-all duration-300 group-hover:translate-x-0.5">
                            {league.name}
                          </h3>
                        </div>
                      </div>

                      {/* Maçlar */}
                      <div className="grid gap-3 md:grid-cols-2 mb-8">
                        {matches.map((match) => (
                          <div key={match.id} className="relative">
                            <MatchCard
                              match={match}
                              onClick={() => setSelectedMatch(selectedMatch?.id === match.id ? null : match)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 transition-all duration-500 ease-in-out">
                  <div className="text-gray-400 mb-2">
                    {activeFilter === 'live' 
                      ? 'Şu anda canlı maç bulunmuyor' 
                      : `${formatSelectedDate()} tarihinde maç bulunmuyor`}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Maç Detayları */}
          <div 
            className={`
              absolute top-0 right-0 w-[400px] h-full
              transition-all duration-500 ease-in-out
              ${selectedMatch ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            {selectedMatch && (
              <div className="p-4">
                <div className="rounded-2xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 relative flex items-center justify-center">
                          <LeagueIcon />
                        </div>
                        <h3 className="text-white text-xl font-bold">{selectedMatch.league.name}</h3>
                      </div>
                      <button
                        onClick={() => setSelectedMatch(null)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#002815]/50 transition-all"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="flex justify-between items-center bg-[#002815]/50 backdrop-blur-sm rounded-2xl p-6">
                        <div className="text-center flex-1">
                          <div className="w-20 h-20 relative mx-auto mb-3">
                            <Image
                              src={selectedMatch.homeTeam.logo}
                              alt={selectedMatch.homeTeam.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="text-white font-medium">
                            {selectedMatch.homeTeam.name}
                          </div>
                        </div>

                        <div className="text-center px-6">
                          <div className="text-4xl font-bold text-white mb-2">
                            {selectedMatch.score.home} - {selectedMatch.score.away}
                          </div>
                          <div className="text-gray-300">{formatMatchTime(selectedMatch.time)}</div>
                        </div>

                        <div className="text-center flex-1">
                          <div className="w-20 h-20 relative mx-auto mb-3">
                            <Image
                              src={selectedMatch.awayTeam.logo}
                              alt={selectedMatch.awayTeam.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="text-white font-medium">
                            {selectedMatch.awayTeam.name}
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#002815]/50 backdrop-blur-sm rounded-2xl p-6">
                        <h4 className="text-white font-medium mb-6">İstatistikler</h4>
                        
                        <div className="space-y-5">
                          <div className="flex items-center">
                            <span className="text-gray-300 w-24">Top Kontrolü</span>
                            <div className="flex-1 h-2 bg-[#003a1f] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-white shadow-lg shadow-white/20"
                                style={{
                                  width: `${selectedMatch.statistics.possession.home}%`,
                                }}
                              />
                            </div>
                            <span className="text-white w-16 text-right">
                              {selectedMatch.statistics.possession.home}%
                            </span>
                          </div>

                          <div className="flex items-center">
                            <span className="text-gray-300 w-24">Şut</span>
                            <span className="text-white w-16">
                              {selectedMatch.statistics.shots.home}
                            </span>
                            <div className="flex-1 text-center text-white">-</div>
                            <span className="text-white w-16 text-right">
                              {selectedMatch.statistics.shots.away}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <span className="text-gray-300 w-24">İsabetli Şut</span>
                            <span className="text-white w-16">
                              {selectedMatch.statistics.shotsOnTarget.home}
                            </span>
                            <div className="flex-1 text-center text-white">-</div>
                            <span className="text-white w-16 text-right">
                              {selectedMatch.statistics.shotsOnTarget.away}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <span className="text-gray-300 w-24">Korner</span>
                            <span className="text-white w-16">
                              {selectedMatch.statistics.corners.home}
                            </span>
                            <div className="flex-1 text-center text-white">-</div>
                            <span className="text-white w-16 text-right">
                              {selectedMatch.statistics.corners.away}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <span className="text-gray-300 w-24">Faul</span>
                            <span className="text-white w-16">
                              {selectedMatch.statistics.fouls.home}
                            </span>
                            <div className="flex-1 text-center text-white">-</div>
                            <span className="text-white w-16 text-right">
                              {selectedMatch.statistics.fouls.away}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
