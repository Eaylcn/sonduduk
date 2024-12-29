export interface Team {
  id: string;
  name: string;
  logo: string;
}

export interface League {
  id: string;
  name: string;
  country: string;
  flag: string;
}

export interface MatchStatistics {
  possession: {
    home: number;
    away: number;
  };
  shots: {
    home: number;
    away: number;
  };
  shotsOnTarget: {
    home: number;
    away: number;
  };
  corners: {
    home: number;
    away: number;
  };
  fouls: {
    home: number;
    away: number;
  };
}

export interface Match {
  id: string;
  status: 'live' | 'scheduled' | 'finished' | 'half_time';
  time: string;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    home: number;
    away: number;
  };
  league: League;
  statistics: MatchStatistics;
} 