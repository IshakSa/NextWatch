export interface ContentItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  length: string;
  genres: string[];
  type: "movie" | "tv";
}

interface BasePerson {
  name: string;
  profile_path: string;
}

export interface Actor extends BasePerson {
  character: string;
  order: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Director extends BasePerson {}

export interface Credits {
  cast: Actor[];
  director: Director[];
}

export interface ProviderInfo {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface ProviderOptions {
  [countryCode: string]: {
    link: string;
    rent?: ProviderInfo[];
    flatrate?: ProviderInfo[];
    buy?: ProviderInfo[];
  };
}

export interface Season {
  season_number: number;
  episodes: Episode[];
}

export interface Episode {
  episode_number: number;
  overview: string;
  name: string;
  runtime: number;
  still_path: string;
}

export const ImageSizes = {
  hero: 1920,
  poster: 500,
  backdrop: 500,
  still: 500,
  provider: 154,
  credits: 185,
} as const;

export const providers: ProviderOptions = {
  DE: {
    link: "https://www.themoviedb.org/movie/550-fight-club/watch?locale=DE",
    flatrate: [
      {
        logo_path: "/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg",
        provider_id: 337,
        provider_name: "Disney Plus",
        display_priority: 2,
      },
      {
        logo_path: "/2joD3S2goOB6lmepX35A8dmaqgM.jpg",
        provider_id: 421,
        provider_name: "Joyn Plus",
        display_priority: 49,
      },
    ],
    buy: [
      {
        logo_path: "/peURlLlr8jggOwK53fJ5wdQl05y.jpg",
        provider_id: 2,
        provider_name: "Apple TV",
        display_priority: 4,
      },
      {
        logo_path: "/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg",
        provider_id: 10,
        provider_name: "Amazon Video",
        display_priority: 7,
      },
      {
        logo_path: "/tbEdFQDwx5LEVr8WpSeXQSIirVq.jpg",
        provider_id: 3,
        provider_name: "Google Play Movies",
        display_priority: 8,
      },
      {
        logo_path: "/oIkQkEkwfmcG7IGpRR1NB8frZZM.jpg",
        provider_id: 192,
        provider_name: "YouTube",
        display_priority: 10,
      },
      {
        logo_path: "/2pCbao1J9s0DMak2KKnEzmzHni8.jpg",
        provider_id: 130,
        provider_name: "Sky Store",
        display_priority: 11,
      },
      {
        logo_path: "/5GEbAhFW2S5T8zVc1MNvz00pIzM.jpg",
        provider_id: 35,
        provider_name: "Rakuten TV",
        display_priority: 13,
      },
      {
        logo_path: "/2PTFxgrswnEuK0szl87iSd8Yszz.jpg",
        provider_id: 20,
        provider_name: "maxdome Store",
        display_priority: 16,
      },
      {
        logo_path: "/uULoezj2skPc6amfwru72UPjYXV.jpg",
        provider_id: 178,
        provider_name: "MagentaTV",
        display_priority: 24,
      },
      {
        logo_path: "/shq88b09gTBYC4hA7K7MUL8Q4zP.jpg",
        provider_id: 68,
        provider_name: "Microsoft Store",
        display_priority: 34,
      },
    ],
    rent: [
      {
        logo_path: "/peURlLlr8jggOwK53fJ5wdQl05y.jpg",
        provider_id: 2,
        provider_name: "Apple TV",
        display_priority: 4,
      },
      {
        logo_path: "/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg",
        provider_id: 10,
        provider_name: "Amazon Video",
        display_priority: 7,
      },
      {
        logo_path: "/tbEdFQDwx5LEVr8WpSeXQSIirVq.jpg",
        provider_id: 3,
        provider_name: "Google Play Movies",
        display_priority: 8,
      },
      {
        logo_path: "/oIkQkEkwfmcG7IGpRR1NB8frZZM.jpg",
        provider_id: 192,
        provider_name: "YouTube",
        display_priority: 10,
      },
      {
        logo_path: "/2pCbao1J9s0DMak2KKnEzmzHni8.jpg",
        provider_id: 130,
        provider_name: "Sky Store",
        display_priority: 11,
      },
      {
        logo_path: "/5GEbAhFW2S5T8zVc1MNvz00pIzM.jpg",
        provider_id: 35,
        provider_name: "Rakuten TV",
        display_priority: 13,
      },
      {
        logo_path: "/2PTFxgrswnEuK0szl87iSd8Yszz.jpg",
        provider_id: 20,
        provider_name: "maxdome Store",
        display_priority: 16,
      },
      {
        logo_path: "/uULoezj2skPc6amfwru72UPjYXV.jpg",
        provider_id: 178,
        provider_name: "MagentaTV",
        display_priority: 24,
      },
    ],
  },
  US: {
    link: "https://www.themoviedb.org/movie/550-fight-club/watch?locale=US",
    rent: [
      {
        logo_path: "/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg",
        provider_id: 10,
        provider_name: "Amazon Video",
        display_priority: 13,
      },
      {
        logo_path: "/tbEdFQDwx5LEVr8WpSeXQSIirVq.jpg",
        provider_id: 3,
        provider_name: "Google Play Movies",
        display_priority: 14,
      },
      {
        logo_path: "/oIkQkEkwfmcG7IGpRR1NB8frZZM.jpg",
        provider_id: 192,
        provider_name: "YouTube",
        display_priority: 15,
      },
      {
        logo_path: "/21dEscfO8n1tL35k4DANixhffsR.jpg",
        provider_id: 7,
        provider_name: "Vudu",
        display_priority: 42,
      },
      {
        logo_path: "/shq88b09gTBYC4hA7K7MUL8Q4zP.jpg",
        provider_id: 68,
        provider_name: "Microsoft Store",
        display_priority: 53,
      },
      {
        logo_path: "/gbyLHzl4eYP0oP9oJZ2oKbpkhND.jpg",
        provider_id: 279,
        provider_name: "Redbox",
        display_priority: 54,
      },
      {
        logo_path: "/xL9SUR63qrEjFZAhtsipskeAMR7.jpg",
        provider_id: 358,
        provider_name: "DIRECTV",
        display_priority: 58,
      },
      {
        logo_path: "/kJlVJLgbNPvKDYC0YMp3yA2OKq2.jpg",
        provider_id: 352,
        provider_name: "AMC on Demand",
        display_priority: 137,
      },
    ],
    flatrate: [
      {
        logo_path: "/jPXksae158ukMLFhhlNvzsvaEyt.jpg",
        provider_id: 257,
        provider_name: "fuboTV",
        display_priority: 5,
      },
      {
        logo_path: "/zxrVdFjIjLqkfnwyghnfywTn3Lh.jpg",
        provider_id: 15,
        provider_name: "Hulu",
        display_priority: 6,
      },
      {
        logo_path: "/xbhHHa1YgtpwhC8lb1NQ3ACVcLd.jpg",
        provider_id: 531,
        provider_name: "Paramount Plus",
        display_priority: 16,
      },
      {
        logo_path: "/3E0RkIEQrrGYazs63NMsn3XONT6.jpg",
        provider_id: 582,
        provider_name: "Paramount+ Amazon Channel",
        display_priority: 23,
      },
      {
        logo_path: "/hoqk74y8HTJTMWcVes1ZVwohCue.jpg",
        provider_id: 583,
        provider_name: "MGM Plus Amazon Channel",
        display_priority: 24,
      },
      {
        logo_path: "/qlVSrZgfXlFw0Jj6hsYq2zi70JD.jpg",
        provider_id: 633,
        provider_name: "Paramount+ Roku Premium Channel",
        display_priority: 31,
      },
      {
        logo_path: "/3sE2JNYZJRD9Le1P8B6oVEqarad.jpg",
        provider_id: 636,
        provider_name: "MGM Plus Roku Premium Channel",
        display_priority: 35,
      },
      {
        logo_path: "/xL9SUR63qrEjFZAhtsipskeAMR7.jpg",
        provider_id: 358,
        provider_name: "DIRECTV",
        display_priority: 58,
      },
      {
        logo_path: "/6A1gRIJqLfFHOoTvbTxDAbuU2nQ.jpg",
        provider_id: 34,
        provider_name: "MGM Plus",
        display_priority: 64,
      },
    ],
    buy: [
      {
        logo_path: "/peURlLlr8jggOwK53fJ5wdQl05y.jpg",
        provider_id: 2,
        provider_name: "Apple TV",
        display_priority: 4,
      },
      {
        logo_path: "/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg",
        provider_id: 10,
        provider_name: "Amazon Video",
        display_priority: 13,
      },
      {
        logo_path: "/tbEdFQDwx5LEVr8WpSeXQSIirVq.jpg",
        provider_id: 3,
        provider_name: "Google Play Movies",
        display_priority: 14,
      },
      {
        logo_path: "/oIkQkEkwfmcG7IGpRR1NB8frZZM.jpg",
        provider_id: 192,
        provider_name: "YouTube",
        display_priority: 15,
      },
      {
        logo_path: "/21dEscfO8n1tL35k4DANixhffsR.jpg",
        provider_id: 7,
        provider_name: "Vudu",
        display_priority: 42,
      },
      {
        logo_path: "/shq88b09gTBYC4hA7K7MUL8Q4zP.jpg",
        provider_id: 68,
        provider_name: "Microsoft Store",
        display_priority: 53,
      },
      {
        logo_path: "/gbyLHzl4eYP0oP9oJZ2oKbpkhND.jpg",
        provider_id: 279,
        provider_name: "Redbox",
        display_priority: 54,
      },
      {
        logo_path: "/xL9SUR63qrEjFZAhtsipskeAMR7.jpg",
        provider_id: 358,
        provider_name: "DIRECTV",
        display_priority: 58,
      },
      {
        logo_path: "/kJlVJLgbNPvKDYC0YMp3yA2OKq2.jpg",
        provider_id: 352,
        provider_name: "AMC on Demand",
        display_priority: 137,
      },
    ],
  },
};

export const credits: Credits = {
  cast: [
    {
      name: "Edward Norton",
      profile_path: "/8nytsqL59SFJTVYVrN72k6qkGgJ.jpg",
      character: "The Narrator",
      order: 0,
    },
    {
      name: "Brad Pitt",
      profile_path: "/huV2cdcolEUwJy37QvH914vup7d.jpg",
      character: "Tyler Durden",
      order: 1,
    },
    {
      name: "Helena Bonham Carter",
      profile_path: "/DDeITcCpnBd0CkAIRPhggy9bt5.jpg",
      character: "Marla Singer",
      order: 2,
    },
    {
      name: "Meat Loaf",
      profile_path: "/7gKLR1u46OB8WJ6m06LemNBCMx6.jpg",
      character: 'Robert "Bob" Paulson',
      order: 3,
    },
    {
      name: "Jared Leto",
      profile_path: "/ca3x0OfIKbJppZh8S1Alx3GfUZO.jpg",
      character: "Angel Face",
      order: 4,
    },
    {
      name: "Zach Grenier",
      profile_path: "/fSyQKZO39sUsqY283GXiScOg3Hi.jpg",
      character: "Richard Chesler",
      order: 5,
    },
    {
      name: "Holt McCallany",
      profile_path: "/a5ax2ICLrV6l0T74OSFvzssCQyQ.jpg",
      character: "The Mechanic",
      order: 6,
    },
    {
      name: "Eion Bailey",
      profile_path: "/hKqfGq1sPhZdQOlto0bS3igFZdP.jpg",
      character: "Ricky",
      order: 7,
    },
    {
      name: "Richmond Arquette",
      profile_path: "/7byGiVac0GjBSVD1h6ylZlVXZK6.jpg",
      character: "Intern",
      order: 8,
    },
    {
      name: "David Andrews",
      profile_path: "/36LEerIIN7gpG52mM3Ier7YWDbh.jpg",
      character: "Thomas",
      order: 9,
    },
  ],
  director: [
    {
      name: "David Fincher",
      profile_path: "/tpEczFclQZeKAiCeKZZ0adRvtfz.jpg",
    },
  ],
};

export const seasons: Season[] = [
  {
    season_number: 1,
    episodes: [
      {
        runtime: 62,
        episode_number: 1,
        name: "Winter Is Coming",
        overview:
          "Jon Arryn, the Hand of the King, is dead. King Robert Baratheon plans to ask his oldest friend, Eddard Stark, to take Jon's place. Across the sea, Viserys Targaryen plans to wed his sister to a nomadic warlord in exchange for an army.",
        still_path: "/9hGF3WUkBf7cSjMg0cdMDHJkByd.jpg",
      },
      {
        runtime: 56,
        episode_number: 2,
        name: "The Kingsroad",
        overview:
          "While Bran recovers from his fall, Ned takes only his daughters to Kings Landing. Jon Snow goes with his uncle Benjen to The Wall. Tyrion joins them.",
        still_path: "/l0GJx3IR8YasbztTJi5uK0XqkEo.jpg",
      },
      {
        runtime: 58,
        episode_number: 3,
        name: "Lord Snow",
        overview:
          "Lord Stark and his daughters arrive at King's Landing to discover the intrigues of the king's realm.",
        still_path: "/8HjOlb4slc1xusMgOtoNpxuTgSI.jpg",
      },
      {
        runtime: 56,
        episode_number: 4,
        name: "Cripples, Bastards, and Broken Things",
        overview:
          "Eddard investigates Jon Arryn's murder. Jon befriends Samwell Tarly, a coward who has come to join the Night's Watch.",
        still_path: "/Ai2UPMWv38xGjOgNBuA1o8w8dUI.jpg",
      },
      {
        runtime: 55,
        episode_number: 5,
        name: "The Wolf and the Lion",
        overview:
          "Catelyn has captured Tyrion and plans to bring him to her sister, Lysa Arryn, at The Vale, to be tried for his, supposed, crimes against Bran. Robert plans to have Daenerys killed, but Eddard refuses to be a part of it and quits.",
        still_path: "/u7e1qSWE6v8jfY9vGNrckX47DGN.jpg",
      },
      {
        runtime: 53,
        episode_number: 6,
        name: "A Golden Crown",
        overview:
          "While recovering from his battle with Jamie, Eddard is forced to run the kingdom while Robert goes hunting. Tyrion demands a trial by combat for his freedom. Viserys is losing his patience with Drogo.",
        still_path: "/6FcfWGFlDyWZ2JvQi8uvkxbDx1z.jpg",
      },
      {
        runtime: 58,
        episode_number: 7,
        name: "You Win or You Die",
        overview:
          "Robert has been injured while hunting and is dying. Jon and the others finally take their vows to the Night's Watch. A man, sent by Robert, is captured for trying to poison Daenerys. Furious, Drogo vows to attack the Seven Kingdoms.",
        still_path: "/o6ldSDhIINGNKZR62mHf2m64dD.jpg",
      },
      {
        runtime: 59,
        episode_number: 8,
        name: "The Pointy End",
        overview:
          "Eddard and his men are betrayed and captured by the Lannisters. When word reaches Robb, he plans to go to war to rescue them. The White Walkers attack The Wall. Tyrion returns to his father with some new friends.",
        still_path: "/hH0U1QISWGGjoFutvCLdw28MGiq.jpg",
      },
      {
        runtime: 57,
        episode_number: 9,
        name: "Baelor",
        overview:
          "Robb goes to war against the Lannisters. Jon finds himself struggling on deciding if his place is with Robb or the Night's Watch. Drogo has fallen ill from a fresh battle wound. Daenerys is desperate to save him.",
        still_path: "/fAmBhmw1pQc6fucrdmnRM5FOpXD.jpg",
      },
      {
        runtime: 53,
        episode_number: 10,
        name: "Fire and Blood",
        overview:
          "With Ned dead, Robb vows to get revenge on the Lannisters. Jon must officially decide if his place is with Robb or the Night's Watch. Daenerys says her final goodbye to Drogo.",
        still_path: "/y1BXkhEqBQS3ewQeqqdHpjhTts0.jpg",
      },
    ],
  },
  {
    season_number: 2,
    episodes: [
      {
        runtime: 62,
        episode_number: 1,
        name: "Winter Is Coming",
        overview:
          "Jon Arryn, the Hand of the King, is dead. King Robert Baratheon plans to ask his oldest friend, Eddard Stark, to take Jon's place. Across the sea, Viserys Targaryen plans to wed his sister to a nomadic warlord in exchange for an army.",
        still_path: "/9hGF3WUkBf7cSjMg0cdMDHJkByd.jpg",
      },
      {
        runtime: 56,
        episode_number: 2,
        name: "The Kingsroad",
        overview:
          "While Bran recovers from his fall, Ned takes only his daughters to Kings Landing. Jon Snow goes with his uncle Benjen to The Wall. Tyrion joins them.",
        still_path: "/l0GJx3IR8YasbztTJi5uK0XqkEo.jpg",
      },
      {
        runtime: 58,
        episode_number: 3,
        name: "Lord Snow",
        overview:
          "Lord Stark and his daughters arrive at King's Landing to discover the intrigues of the king's realm.",
        still_path: "/8HjOlb4slc1xusMgOtoNpxuTgSI.jpg",
      },
      {
        runtime: 56,
        episode_number: 4,
        name: "Cripples, Bastards, and Broken Things",
        overview:
          "Eddard investigates Jon Arryn's murder. Jon befriends Samwell Tarly, a coward who has come to join the Night's Watch.",
        still_path: "/Ai2UPMWv38xGjOgNBuA1o8w8dUI.jpg",
      },
      {
        runtime: 55,
        episode_number: 5,
        name: "The Wolf and the Lion",
        overview:
          "Catelyn has captured Tyrion and plans to bring him to her sister, Lysa Arryn, at The Vale, to be tried for his, supposed, crimes against Bran. Robert plans to have Daenerys killed, but Eddard refuses to be a part of it and quits.",
        still_path: "/u7e1qSWE6v8jfY9vGNrckX47DGN.jpg",
      },
      {
        runtime: 53,
        episode_number: 6,
        name: "A Golden Crown",
        overview:
          "While recovering from his battle with Jamie, Eddard is forced to run the kingdom while Robert goes hunting. Tyrion demands a trial by combat for his freedom. Viserys is losing his patience with Drogo.",
        still_path: "/6FcfWGFlDyWZ2JvQi8uvkxbDx1z.jpg",
      },
      {
        runtime: 58,
        episode_number: 7,
        name: "You Win or You Die",
        overview:
          "Robert has been injured while hunting and is dying. Jon and the others finally take their vows to the Night's Watch. A man, sent by Robert, is captured for trying to poison Daenerys. Furious, Drogo vows to attack the Seven Kingdoms.",
        still_path: "/o6ldSDhIINGNKZR62mHf2m64dD.jpg",
      },
      {
        runtime: 59,
        episode_number: 8,
        name: "The Pointy End",
        overview:
          "Eddard and his men are betrayed and captured by the Lannisters. When word reaches Robb, he plans to go to war to rescue them. The White Walkers attack The Wall. Tyrion returns to his father with some new friends.",
        still_path: "/hH0U1QISWGGjoFutvCLdw28MGiq.jpg",
      },
      {
        runtime: 57,
        episode_number: 9,
        name: "Baelor",
        overview:
          "Robb goes to war against the Lannisters. Jon finds himself struggling on deciding if his place is with Robb or the Night's Watch. Drogo has fallen ill from a fresh battle wound. Daenerys is desperate to save him.",
        still_path: "/fAmBhmw1pQc6fucrdmnRM5FOpXD.jpg",
      },
      {
        runtime: 53,
        episode_number: 10,
        name: "Fire and Blood",
        overview:
          "With Ned dead, Robb vows to get revenge on the Lannisters. Jon must officially decide if his place is with Robb or the Night's Watch. Daenerys says her final goodbye to Drogo.",
        still_path: "/y1BXkhEqBQS3ewQeqqdHpjhTts0.jpg",
      },
    ],
  },
  {
    season_number: 3,
    episodes: [
      {
        runtime: 62,
        episode_number: 1,
        name: "Winter Is Coming",
        overview:
          "Jon Arryn, the Hand of the King, is dead. King Robert Baratheon plans to ask his oldest friend, Eddard Stark, to take Jon's place. Across the sea, Viserys Targaryen plans to wed his sister to a nomadic warlord in exchange for an army.",
        still_path: "/9hGF3WUkBf7cSjMg0cdMDHJkByd.jpg",
      },
      {
        runtime: 56,
        episode_number: 2,
        name: "The Kingsroad",
        overview:
          "While Bran recovers from his fall, Ned takes only his daughters to Kings Landing. Jon Snow goes with his uncle Benjen to The Wall. Tyrion joins them.",
        still_path: "/l0GJx3IR8YasbztTJi5uK0XqkEo.jpg",
      },
      {
        runtime: 58,
        episode_number: 3,
        name: "Lord Snow",
        overview:
          "Lord Stark and his daughters arrive at King's Landing to discover the intrigues of the king's realm.",
        still_path: "/8HjOlb4slc1xusMgOtoNpxuTgSI.jpg",
      },
      {
        runtime: 56,
        episode_number: 4,
        name: "Cripples, Bastards, and Broken Things",
        overview:
          "Eddard investigates Jon Arryn's murder. Jon befriends Samwell Tarly, a coward who has come to join the Night's Watch.",
        still_path: "/Ai2UPMWv38xGjOgNBuA1o8w8dUI.jpg",
      },
      {
        runtime: 55,
        episode_number: 5,
        name: "The Wolf and the Lion",
        overview:
          "Catelyn has captured Tyrion and plans to bring him to her sister, Lysa Arryn, at The Vale, to be tried for his, supposed, crimes against Bran. Robert plans to have Daenerys killed, but Eddard refuses to be a part of it and quits.",
        still_path: "/u7e1qSWE6v8jfY9vGNrckX47DGN.jpg",
      },
      {
        runtime: 53,
        episode_number: 6,
        name: "A Golden Crown",
        overview:
          "While recovering from his battle with Jamie, Eddard is forced to run the kingdom while Robert goes hunting. Tyrion demands a trial by combat for his freedom. Viserys is losing his patience with Drogo.",
        still_path: "/6FcfWGFlDyWZ2JvQi8uvkxbDx1z.jpg",
      },
      {
        runtime: 58,
        episode_number: 7,
        name: "You Win or You Die",
        overview:
          "Robert has been injured while hunting and is dying. Jon and the others finally take their vows to the Night's Watch. A man, sent by Robert, is captured for trying to poison Daenerys. Furious, Drogo vows to attack the Seven Kingdoms.",
        still_path: "/o6ldSDhIINGNKZR62mHf2m64dD.jpg",
      },
      {
        runtime: 59,
        episode_number: 8,
        name: "The Pointy End",
        overview:
          "Eddard and his men are betrayed and captured by the Lannisters. When word reaches Robb, he plans to go to war to rescue them. The White Walkers attack The Wall. Tyrion returns to his father with some new friends.",
        still_path: "/hH0U1QISWGGjoFutvCLdw28MGiq.jpg",
      },
      {
        runtime: 57,
        episode_number: 9,
        name: "Baelor",
        overview:
          "Robb goes to war against the Lannisters. Jon finds himself struggling on deciding if his place is with Robb or the Night's Watch. Drogo has fallen ill from a fresh battle wound. Daenerys is desperate to save him.",
        still_path: "/fAmBhmw1pQc6fucrdmnRM5FOpXD.jpg",
      },
      {
        runtime: 53,
        episode_number: 10,
        name: "Fire and Blood",
        overview:
          "With Ned dead, Robb vows to get revenge on the Lannisters. Jon must officially decide if his place is with Robb or the Night's Watch. Daenerys says her final goodbye to Drogo.",
        still_path: "/y1BXkhEqBQS3ewQeqqdHpjhTts0.jpg",
      },
    ],
  },
  {
    season_number: 4,
    episodes: [
      {
        runtime: 62,
        episode_number: 1,
        name: "Winter Is Coming",
        overview:
          "Jon Arryn, the Hand of the King, is dead. King Robert Baratheon plans to ask his oldest friend, Eddard Stark, to take Jon's place. Across the sea, Viserys Targaryen plans to wed his sister to a nomadic warlord in exchange for an army.",
        still_path: "/9hGF3WUkBf7cSjMg0cdMDHJkByd.jpg",
      },
      {
        runtime: 56,
        episode_number: 2,
        name: "The Kingsroad",
        overview:
          "While Bran recovers from his fall, Ned takes only his daughters to Kings Landing. Jon Snow goes with his uncle Benjen to The Wall. Tyrion joins them.",
        still_path: "/l0GJx3IR8YasbztTJi5uK0XqkEo.jpg",
      },
      {
        runtime: 58,
        episode_number: 3,
        name: "Lord Snow",
        overview:
          "Lord Stark and his daughters arrive at King's Landing to discover the intrigues of the king's realm.",
        still_path: "/8HjOlb4slc1xusMgOtoNpxuTgSI.jpg",
      },
      {
        runtime: 56,
        episode_number: 4,
        name: "Cripples, Bastards, and Broken Things",
        overview:
          "Eddard investigates Jon Arryn's murder. Jon befriends Samwell Tarly, a coward who has come to join the Night's Watch.",
        still_path: "/Ai2UPMWv38xGjOgNBuA1o8w8dUI.jpg",
      },
      {
        runtime: 55,
        episode_number: 5,
        name: "The Wolf and the Lion",
        overview:
          "Catelyn has captured Tyrion and plans to bring him to her sister, Lysa Arryn, at The Vale, to be tried for his, supposed, crimes against Bran. Robert plans to have Daenerys killed, but Eddard refuses to be a part of it and quits.",
        still_path: "/u7e1qSWE6v8jfY9vGNrckX47DGN.jpg",
      },
      {
        runtime: 53,
        episode_number: 6,
        name: "A Golden Crown",
        overview:
          "While recovering from his battle with Jamie, Eddard is forced to run the kingdom while Robert goes hunting. Tyrion demands a trial by combat for his freedom. Viserys is losing his patience with Drogo.",
        still_path: "/6FcfWGFlDyWZ2JvQi8uvkxbDx1z.jpg",
      },
      {
        runtime: 58,
        episode_number: 7,
        name: "You Win or You Die",
        overview:
          "Robert has been injured while hunting and is dying. Jon and the others finally take their vows to the Night's Watch. A man, sent by Robert, is captured for trying to poison Daenerys. Furious, Drogo vows to attack the Seven Kingdoms.",
        still_path: "/o6ldSDhIINGNKZR62mHf2m64dD.jpg",
      },
      {
        runtime: 59,
        episode_number: 8,
        name: "The Pointy End",
        overview:
          "Eddard and his men are betrayed and captured by the Lannisters. When word reaches Robb, he plans to go to war to rescue them. The White Walkers attack The Wall. Tyrion returns to his father with some new friends.",
        still_path: "/hH0U1QISWGGjoFutvCLdw28MGiq.jpg",
      },
      {
        runtime: 57,
        episode_number: 9,
        name: "Baelor",
        overview:
          "Robb goes to war against the Lannisters. Jon finds himself struggling on deciding if his place is with Robb or the Night's Watch. Drogo has fallen ill from a fresh battle wound. Daenerys is desperate to save him.",
        still_path: "/fAmBhmw1pQc6fucrdmnRM5FOpXD.jpg",
      },
      {
        runtime: 53,
        episode_number: 10,
        name: "Fire and Blood",
        overview:
          "With Ned dead, Robb vows to get revenge on the Lannisters. Jon must officially decide if his place is with Robb or the Night's Watch. Daenerys says her final goodbye to Drogo.",
        still_path: "/y1BXkhEqBQS3ewQeqqdHpjhTts0.jpg",
      },
    ],
  },
];

export const movieData: ContentItem[] = [
  {
    adult: false,
    backdrop_path: "/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
    genre_ids: [28, 12, 878],
    id: 640146,
    original_language: "en",
    original_title: "Ant-Man and the Wasp: Quantumania",
    overview:
      "Super-Hero partners Scott Lang and Hope van Dyne, along with with Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter Cassie Lang, find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that will push them beyond the limits of what they thought possible.",
    popularity: 9272.643,
    poster_path: "/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg",
    release_date: "2023-02-15",
    title: "Ant-Man and the Wasp: Quantumania",
    video: false,
    vote_average: 6.5,
    vote_count: 1856,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/iJQIbOPm81fPEGKt5BPuZmfnA54.jpg",
    genre_ids: [16, 12, 10751, 14, 35],
    id: 502356,
    original_language: "en",
    original_title: "The Super Mario Bros. Movie",
    overview:
      "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
    popularity: 7212.464,
    poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    release_date: "2023-04-05",
    title: "The Super Mario Bros. Movie",
    video: false,
    vote_average: 7.5,
    vote_count: 1435,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/nDxJJyA5giRhXx96q1sWbOUjMBI.jpg",
    genre_ids: [28, 35, 14],
    id: 594767,
    original_language: "en",
    original_title: "Shazam! Fury of the Gods",
    overview:
      'Billy Batson and his foster siblings, who transform into superheroes by saying "Shazam!", are forced to get back into action and fight the Daughters of Atlas, who they must stop from using a weapon that could destroy the world.',
    popularity: 4319.273,
    poster_path: "/2VK4d3mqqTc7LVZLnLPeRiPaJ71.jpg",
    release_date: "2023-03-15",
    title: "Shazam! Fury of the Gods",
    video: false,
    vote_average: 6.8,
    vote_count: 1203,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/ovM06PdF3M8wvKb06i4sjW3xoww.jpg",
    genre_ids: [878, 12, 28],
    id: 76600,
    original_language: "en",
    original_title: "Avatar: The Way of Water",
    overview:
      "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    popularity: 3471.132,
    poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    release_date: "2022-12-14",
    title: "Avatar: The Way of Water",
    video: false,
    vote_average: 7.7,
    vote_count: 7519,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/xwA90BwZXTh8ke3CVsQlj8EOkFr.jpg",
    genre_ids: [28, 12, 36, 18, 10752],
    id: 948713,
    original_language: "en",
    original_title: "The Last Kingdom: Seven Kings Must Die",
    overview:
      "In the wake of King Edward's death, Uhtred of Bebbanburg and his comrades adventure across a fractured kingdom in the hopes of uniting England at last.",
    popularity: 3162.414,
    poster_path: "/7yyFEsuaLGTPul5UkHc5BhXnQ0k.jpg",
    release_date: "2023-04-14",
    title: "The Last Kingdom: Seven Kings Must Die",
    video: false,
    vote_average: 7.4,
    vote_count: 226,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/5i6SjyDbDWqyun8klUuCxrlFbyw.jpg",
    genre_ids: [18, 28],
    id: 677179,
    original_language: "en",
    original_title: "Creed III",
    overview:
      "After dominating the boxing world, Adonis Creed has been thriving in both his career and family life. When a childhood friend and former boxing prodigy, Damian Anderson, resurfaces after serving a long sentence in prison, he is eager to prove that he deserves his shot in the ring. The face-off between former friends is more than just a fight. To settle the score, Adonis must put his future on the line to battle Damian — a fighter who has nothing to lose.",
    popularity: 2865.256,
    poster_path: "/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg",
    release_date: "2023-03-01",
    title: "Creed III",
    video: false,
    vote_average: 7.3,
    vote_count: 1183,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/7bWxAsNPv9CXHOhZbJVlj2KxgfP.jpg",
    genre_ids: [27, 53],
    id: 713704,
    original_language: "en",
    original_title: "Evil Dead Rise",
    overview:
      "Two sisters find an ancient vinyl that gives birth to bloodthirsty demons that run amok in a Los Angeles apartment building and thrusts them into a primal battle for survival as they face the most nightmarish version of family imaginable.",
    popularity: 1898.367,
    poster_path: "/mIBCtPvKZQlxubxKMeViO2UrP3q.jpg",
    release_date: "2023-04-12",
    title: "Evil Dead Rise",
    video: false,
    vote_average: 6.9,
    vote_count: 192,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/bT3IpP7OopgiVuy6HCPOWLuaFAd.jpg",
    genre_ids: [35, 9648, 28],
    id: 638974,
    original_language: "en",
    original_title: "Murder Mystery 2",
    overview:
      "After starting their own detective agency, Nick and Audrey Spitz land a career-making case when their billionaire pal is kidnapped from his wedding.",
    popularity: 1855.858,
    poster_path: "/s1VzVhXlqsevi8zeCMG9A16nEUf.jpg",
    release_date: "2023-03-28",
    title: "Murder Mystery 2",
    video: false,
    vote_average: 6.6,
    vote_count: 856,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/ouB7hwclG7QI3INoYJHaZL4vOaa.jpg",
    genre_ids: [16, 10751, 14, 12, 35, 18],
    id: 315162,
    original_language: "en",
    original_title: "Puss in Boots: The Last Wish",
    overview:
      "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.",
    popularity: 1407.152,
    poster_path: "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
    release_date: "2022-12-07",
    title: "Puss in Boots: The Last Wish",
    video: false,
    vote_average: 8.3,
    vote_count: 5326,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/h8gHn0OzBoaefsYseUByqsmEDMY.jpg",
    genre_ids: [28, 53, 80],
    id: 603692,
    original_language: "en",
    original_title: "John Wick: Chapter 4",
    overview:
      "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
    popularity: 1312.743,
    poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    release_date: "2023-03-22",
    title: "John Wick: Chapter 4",
    video: false,
    vote_average: 8,
    vote_count: 1202,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/nDmPjKLqLwWyd4Ssti8HCdhW5cZ.jpg",
    genre_ids: [28],
    id: 1048300,
    original_language: "en",
    original_title: "Adrenaline",
    overview:
      "A female FBI agent holidaying in Eastern Europe with her family gets her life upside down when her daughter is kidnapped. She has to team up with a criminal on the run to save her daughter before time runs out.",
    popularity: 1269.765,
    poster_path: "/qVzRt8c2v4gGBYsnaflXVVeQ9Lh.jpg",
    release_date: "2022-12-15",
    title: "Adrenaline",
    video: false,
    vote_average: 4,
    vote_count: 4,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/a2tys4sD7xzVaogPntGsT1ypVoT.jpg",
    genre_ids: [53, 35, 80],
    id: 804150,
    original_language: "en",
    original_title: "Cocaine Bear",
    overview:
      "Inspired by a true story, an oddball group of cops, criminals, tourists and teens converge in a Georgia forest where a 500-pound black bear goes on a murderous rampage after unintentionally ingesting cocaine.",
    popularity: 1223.954,
    poster_path: "/gOnmaxHo0412UVr1QM5Nekv1xPi.jpg",
    release_date: "2023-02-22",
    title: "Cocaine Bear",
    video: false,
    vote_average: 6.4,
    vote_count: 873,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/54IXMMEQKlkPXHqPExWy98UBmtE.jpg",
    genre_ids: [27],
    id: 1008005,
    original_language: "es",
    original_title: "La niña de la comunión",
    overview:
      "Spain, late 1980s. Newcomer Sara tries to fit in with the other teens in this tight-knit small town in the province of Tarragona. If only she were more like her extroverted best friend, Rebe. They go out one night at a nightclub, on the way home, they come upon a little girl holding a doll, dressed for her first communion. And that's when the nightmare begins.",
    popularity: 1191.393,
    poster_path: "/sP6AO11a7jWgsmT9T8j9EGIWAaZ.jpg",
    release_date: "2023-02-10",
    title: "The Communion Girl",
    video: false,
    vote_average: 6.3,
    vote_count: 55,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/eSVu1FvGPy86TDo4hQbpuHx55DJ.jpg",
    genre_ids: [878, 12, 53, 28],
    id: 700391,
    original_language: "en",
    original_title: "65",
    overview:
      "65 million years ago, the only 2 survivors of a spaceship from Somaris that crash-landed on Earth must fend off dinosaurs and reach the escape vessel in time before an imminent asteroid strike threatens to destroy the planet.",
    popularity: 1189.997,
    poster_path: "/rzRb63TldOKdKydCvWJM8B6EkPM.jpg",
    release_date: "2023-03-02",
    title: "65",
    video: false,
    vote_average: 6.3,
    vote_count: 752,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/tFaC1Fb1sv1dALB0i9Avi76MHmn.jpg",
    genre_ids: [10751, 28, 12],
    id: 946310,
    original_language: "nl",
    original_title: "De Piraten van Hiernaast II: De Ninja's van de Overkant",
    overview:
      "The pirates feel right at home in Sandborough, but the atmosphere cools right down when the ninjas come to live in the street. After all, pirates and ninjas are sworn enemies!  While pirate captain Hector Blunderbuss struggles to get rid of his new neighbours, son Billy and ninja daughter Yuka become friends. The pirates challenge the ninjas to the ultimate battle at the village's annual hexathlon. Who will win the match? Ninjas are faster and more agile of course, but pirates are the best cheats in all of the seven seas...",
    popularity: 1145.777,
    poster_path: "/uDsvma9dAwnDPVuCFi99YpWvBk0.jpg",
    release_date: "2022-04-20",
    title: "Pirates Down the Street II: The Ninjas from Across",
    video: false,
    vote_average: 6.2,
    vote_count: 21,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/rPSJAElGxOTko1zK6uIlYnTMFxN.jpg",
    genre_ids: [80],
    id: 1104040,
    original_language: "en",
    original_title: "Gangs of Lagos",
    overview:
      "A group of friends who each have to navigate their own destiny, growing up on the bustling streets and neighborhood of Isale Eko, Lagos.",
    popularity: 1133.317,
    poster_path: "/nGwFsB6EXUCr21wzPgtP5juZPSv.jpg",
    release_date: "2023-04-07",
    title: "Gangs of Lagos",
    video: false,
    vote_average: 5.6,
    vote_count: 20,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/5Y5pz0NX7SZS9036I733F7uNcwK.jpg",
    genre_ids: [27, 53],
    id: 758323,
    original_language: "en",
    original_title: "The Pope's Exorcist",
    overview:
      "Father Gabriele Amorth, Chief Exorcist of the Vatican, investigates a young boy's terrifying possession and ends up uncovering a centuries-old conspiracy the Vatican has desperately tried to keep hidden.",
    popularity: 1103.242,
    poster_path: "/9JBEPLTPSm0d1mbEcLxULjJq9Eh.jpg",
    release_date: "2023-04-05",
    title: "The Pope's Exorcist",
    video: false,
    vote_average: 6.5,
    vote_count: 142,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/m1fgGSLK0WvRpzM1AmZu38m0Tx8.jpg",
    genre_ids: [28],
    id: 842945,
    original_language: "en",
    original_title: "Supercell",
    overview:
      "Good-hearted teenager William always lived in hope of following in his late father’s footsteps and becoming a storm chaser. His father’s legacy has now been turned into a storm-chasing tourist business, managed by the greedy and reckless Zane Rogers, who is now using William as the main attraction to lead a group of unsuspecting adventurers deep into the eye of the most dangerous supercell ever seen.",
    popularity: 962.106,
    poster_path: "/gbGHezV6yrhua0KfAgwrknSOiIY.jpg",
    release_date: "2023-03-17",
    title: "Supercell",
    video: false,
    vote_average: 6.4,
    vote_count: 122,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/tYcmm8XtzRdcT6kliCbHuWwLCwB.jpg",
    genre_ids: [28, 80, 53],
    id: 849869,
    original_language: "ko",
    original_title: "길복순",
    overview:
      "At work, she's a renowned assassin. At home, she's a single mom to a teenage daughter. Killing? That's easy. It's parenting that's the hard part.",
    popularity: 956.601,
    poster_path: "/taYgn3RRpCGlTGdaGQvnSIOzXFy.jpg",
    release_date: "2023-02-17",
    title: "Kill Boksoon",
    video: false,
    vote_average: 6.8,
    vote_count: 184,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
  {
    adult: false,
    backdrop_path: "/eNJhWy7xFzR74SYaSJHqJZuroDm.jpg",
    genre_ids: [28, 878],
    id: 1033219,
    original_language: "en",
    original_title: "Attack on Titan",
    overview:
      "As viable water is depleted on Earth, a mission is sent to Saturn's moon Titan to retrieve sustainable H2O reserves from its alien inhabitants. But just as the humans acquire the precious resource, they are attacked by Titan rebels, who don't trust that the Earthlings will leave in peace.",
    popularity: 875.796,
    poster_path: "/qNz4l8UgTkD8rlqiKZ556pCJ9iO.jpg",
    release_date: "2022-09-30",
    title: "Attack on Titan",
    video: false,
    vote_average: 6.1,
    vote_count: 104,
    length: "2h40m",
    genres: ["Fantasy", "Action"],
    type: "movie",
  },
];
