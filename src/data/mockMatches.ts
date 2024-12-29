import { Match } from '@/types/match';

// Bugünün maçları
export const mockMatches: Match[] = [
  {
    id: '1',
    status: 'live',
    time: '45+2\'',
    homeTeam: {
      id: 'bjk',
      name: 'Beşiktaş',
      logo: '/teams/besiktas.png'
    },
    awayTeam: {
      id: 'ts',
      name: 'Trabzonspor',
      logo: '/teams/trabzonspor.png'
    },
    score: {
      home: 2,
      away: 1
    },
    league: {
      id: 'super-lig',
      name: 'Süper Lig',
      country: 'Türkiye',
      flag: '/flags/tr.svg'
    },
    statistics: {
      possession: {
        home: 55,
        away: 45
      },
      shots: {
        home: 8,
        away: 6
      },
      shotsOnTarget: {
        home: 4,
        away: 3
      },
      corners: {
        home: 5,
        away: 2
      },
      fouls: {
        home: 6,
        away: 8
      }
    }
  },
  {
    id: '2',
    status: 'half_time',
    time: 'İY',
    homeTeam: {
      id: 'fb',
      name: 'Fenerbahçe',
      logo: '/teams/fenerbahce.png'
    },
    awayTeam: {
      id: 'gs',
      name: 'Galatasaray',
      logo: '/teams/galatasaray.png'
    },
    score: {
      home: 1,
      away: 1
    },
    league: {
      id: 'super-lig',
      name: 'Süper Lig',
      country: 'Türkiye',
      flag: '/flags/tr.svg'
    },
    statistics: {
      possession: {
        home: 48,
        away: 52
      },
      shots: {
        home: 7,
        away: 9
      },
      shotsOnTarget: {
        home: 3,
        away: 4
      },
      corners: {
        home: 4,
        away: 3
      },
      fouls: {
        home: 7,
        away: 5
      }
    }
  },
  {
    id: '7',
    status: 'scheduled',
    time: '21:00',
    homeTeam: {
      id: 'antalya',
      name: 'Antalyaspor',
      logo: '/teams/antalyaspor.png'
    },
    awayTeam: {
      id: 'basaksehir',
      name: 'Başakşehir',
      logo: '/teams/basaksehir.png'
    },
    score: {
      home: 0,
      away: 0
    },
    league: {
      id: 'super-lig',
      name: 'Süper Lig',
      country: 'Türkiye',
      flag: '/flags/tr.svg'
    },
    statistics: {
      possession: {
        home: 0,
        away: 0
      },
      shots: {
        home: 0,
        away: 0
      },
      shotsOnTarget: {
        home: 0,
        away: 0
      },
      corners: {
        home: 0,
        away: 0
      },
      fouls: {
        home: 0,
        away: 0
      }
    }
  },
  {
    id: '3',
    status: 'finished',
    time: 'MS',
    homeTeam: {
      id: 'arsenal',
      name: 'Arsenal',
      logo: '/teams/arsenal.png'
    },
    awayTeam: {
      id: 'chelsea',
      name: 'Chelsea',
      logo: '/teams/chelsea.png'
    },
    score: {
      home: 3,
      away: 1
    },
    league: {
      id: 'premier-league',
      name: 'Premier Lig',
      country: 'İngiltere',
      flag: '/flags/en.svg'
    },
    statistics: {
      possession: {
        home: 60,
        away: 40
      },
      shots: {
        home: 12,
        away: 5
      },
      shotsOnTarget: {
        home: 6,
        away: 2
      },
      corners: {
        home: 7,
        away: 3
      },
      fouls: {
        home: 8,
        away: 10
      }
    }
  },
  {
    id: '5',
    status: 'scheduled',
    time: '21:45',
    homeTeam: {
      id: 'manu',
      name: 'Manchester United',
      logo: '/teams/manchester-united.png'
    },
    awayTeam: {
      id: 'city',
      name: 'Manchester City',
      logo: '/teams/manchester-city.png'
    },
    score: {
      home: 0,
      away: 0
    },
    league: {
      id: 'premier-league',
      name: 'Premier Lig',
      country: 'İngiltere',
      flag: '/flags/en.svg'
    },
    statistics: {
      possession: {
        home: 0,
        away: 0
      },
      shots: {
        home: 0,
        away: 0
      },
      shotsOnTarget: {
        home: 0,
        away: 0
      },
      corners: {
        home: 0,
        away: 0
      },
      fouls: {
        home: 0,
        away: 0
      }
    }
  },
  {
    id: '4',
    status: 'live',
    time: '90+3\'',
    homeTeam: {
      id: 'real',
      name: 'Real Madrid',
      logo: '/teams/real-madrid.png'
    },
    awayTeam: {
      id: 'barca',
      name: 'Barcelona',
      logo: '/teams/barcelona.png'
    },
    score: {
      home: 3,
      away: 2
    },
    league: {
      id: 'la-liga',
      name: 'La Liga',
      country: 'İspanya',
      flag: '/flags/esp.svg'
    },
    statistics: {
      possession: {
        home: 45,
        away: 55
      },
      shots: {
        home: 10,
        away: 13
      },
      shotsOnTarget: {
        home: 5,
        away: 6
      },
      corners: {
        home: 4,
        away: 6
      },
      fouls: {
        home: 12,
        away: 9
      }
    }
  },
  {
    id: '6',
    status: 'live',
    time: '67\'',
    homeTeam: {
      id: 'atletico',
      name: 'Atletico Madrid',
      logo: '/teams/atletico-madrid.png'
    },
    awayTeam: {
      id: 'sevilla',
      name: 'Sevilla',
      logo: '/teams/sevilla.png'
    },
    score: {
      home: 0,
      away: 2
    },
    league: {
      id: 'la-liga',
      name: 'La Liga',
      country: 'İspanya',
      flag: '/flags/esp.svg'
    },
    statistics: {
      possession: {
        home: 60,
        away: 40
      },
      shots: {
        home: 15,
        away: 6
      },
      shotsOnTarget: {
        home: 3,
        away: 4
      },
      corners: {
        home: 8,
        away: 2
      },
      fouls: {
        home: 10,
        away: 14
      }
    }
  }
];

// Dünün maçları
export const yesterdayMatches: Match[] = [
  {
    id: '8',
    status: 'finished',
    time: 'MS',
    homeTeam: {
      id: 'kayseri',
      name: 'Kayserispor',
      logo: '/teams/kayserispor.png'
    },
    awayTeam: {
      id: 'konya',
      name: 'Konyaspor',
      logo: '/teams/konyaspor.png'
    },
    score: {
      home: 2,
      away: 0
    },
    league: {
      id: 'super-lig',
      name: 'Süper Lig',
      country: 'Türkiye',
      flag: '/flags/tr.svg'
    },
    statistics: {
      possession: {
        home: 55,
        away: 45
      },
      shots: {
        home: 12,
        away: 8
      },
      shotsOnTarget: {
        home: 6,
        away: 2
      },
      corners: {
        home: 7,
        away: 4
      },
      fouls: {
        home: 10,
        away: 12
      }
    }
  },
  {
    id: '9',
    status: 'finished',
    time: 'MS',
    homeTeam: {
      id: 'liverpool',
      name: 'Liverpool',
      logo: '/teams/liverpool.png'
    },
    awayTeam: {
      id: 'tottenham',
      name: 'Tottenham',
      logo: '/teams/tottenham.png'
    },
    score: {
      home: 3,
      away: 1
    },
    league: {
      id: 'premier-league',
      name: 'Premier Lig',
      country: 'İngiltere',
      flag: '/flags/en.svg'
    },
    statistics: {
      possession: {
        home: 60,
        away: 40
      },
      shots: {
        home: 15,
        away: 7
      },
      shotsOnTarget: {
        home: 8,
        away: 3
      },
      corners: {
        home: 8,
        away: 3
      },
      fouls: {
        home: 9,
        away: 11
      }
    }
  }
];

// Yarının maçları
export const tomorrowMatches: Match[] = [
  {
    id: '10',
    status: 'scheduled',
    time: '20:00',
    homeTeam: {
      id: 'alanya',
      name: 'Alanyaspor',
      logo: '/teams/alanyaspor.png'
    },
    awayTeam: {
      id: 'rize',
      name: 'Çaykur Rizespor',
      logo: '/teams/rizespor.png'
    },
    score: {
      home: 0,
      away: 0
    },
    league: {
      id: 'super-lig',
      name: 'Süper Lig',
      country: 'Türkiye',
      flag: '/flags/tr.svg'
    },
    statistics: {
      possession: {
        home: 0,
        away: 0
      },
      shots: {
        home: 0,
        away: 0
      },
      shotsOnTarget: {
        home: 0,
        away: 0
      },
      corners: {
        home: 0,
        away: 0
      },
      fouls: {
        home: 0,
        away: 0
      }
    }
  },
  {
    id: '11',
    status: 'scheduled',
    time: '22:00',
    homeTeam: {
      id: 'valencia',
      name: 'Valencia',
      logo: '/teams/valencia.png'
    },
    awayTeam: {
      id: 'villarreal',
      name: 'Villarreal',
      logo: '/teams/villarreal.png'
    },
    score: {
      home: 0,
      away: 0
    },
    league: {
      id: 'la-liga',
      name: 'La Liga',
      country: 'İspanya',
      flag: '/flags/esp.svg'
    },
    statistics: {
      possession: {
        home: 0,
        away: 0
      },
      shots: {
        home: 0,
        away: 0
      },
      shotsOnTarget: {
        home: 0,
        away: 0
      },
      corners: {
        home: 0,
        away: 0
      },
      fouls: {
        home: 0,
        away: 0
      }
    }
  }
]; 