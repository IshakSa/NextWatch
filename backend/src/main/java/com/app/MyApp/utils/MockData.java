package com.app.MyApp.utils;

import com.app.MyApp.content.ContentDetailsDto.*;
import com.app.MyApp.content.ContentSummaryDto;
import com.app.MyApp.content.ContentType;
import com.app.MyApp.user.dtos.RegisterDto;
import com.app.MyApp.watchlist.WatchlistDto;
import com.app.MyApp.watchlist.WatchlistDto.SavedItem;
import com.app.MyApp.watchlist.WatchlistDto.WatchedItem;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class MockData {
    public static RegisterDto mockUser = RegisterDto.builder().username("John").email("john@mail.com")
            .password("John1234!").acceptedTos(true).build();

    public static ContentSummaryDto mockMovie = ContentSummaryDto.builder()
            .id(640146)
            .title("Ant-Man and the Wasp: Quantumania")
            .genres(List.of("Fantasy", "Action"))
            .type(ContentType.MOVIE)
            .overview(
                    "Super-Hero partners Scott Lang and Hope van Dyne, along with with Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter Cassie Lang, find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that will push them beyond the limits of what they thought possible.")
            .length(160)
            .rating(6.5)
            .releaseDate(LocalDate.parse("2023-02-15"))
            .posterPath("/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg")
            .backdropPath("/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg")
            .trailerId("O-b2VfmmbyA")
            .build();

    public static List<ContentSummaryDto> mockDataList = List.of(
            ContentSummaryDto.builder()
                    .id(640146)
                    .title("Ant-Man and the Wasp: Quantumania")
                    .genres(List.of("Fantasy", "Action"))
                    .type(ContentType.MOVIE)
                    .overview(
                            "Super-Hero partners Scott Lang and Hope van Dyne, along with with Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter Cassie Lang, find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that will push them beyond the limits of what they thought possible.")
                    .length(160)
                    .rating(6.5)
                    .releaseDate(LocalDate.parse("2023-02-15"))
                    .posterPath("/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg")
                    .backdropPath("/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg")
                    .trailerId("O-b2VfmmbyA")
                    .build(),

            ContentSummaryDto.builder()
                    .id(502356)
                    .title("The Super Mario Bros. tv")
                    .genres(List.of("Fantasy", "Action"))
                    .type(ContentType.TV)
                    .overview(
                            "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.")
                    .length(10)
                    .rating(7.5)
                    .releaseDate(LocalDate.parse("2023-04-05"))
                    .posterPath("/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg")
                    .backdropPath("/iJQIbOPm81fPEGKt5BPuZmfnA54.jpg")
                    .trailerId("O-b2VfmmbyA")
                    .build(),

            ContentSummaryDto.builder()
                    .id(594767)
                    .title("Shazam! Fury of the Gods")
                    .genres(List.of("Fantasy", "Action"))
                    .type(ContentType.MOVIE)
                    .overview(
                            "Billy Batson and his foster siblings, who transform into superheroes bysaying \"Shazam!\", are forced to get back into action and fight the Daughters of Atlas, who they must stop from using a weapon that could destroy the world.")
                    .length(130).rating(6.8).releaseDate(LocalDate.parse("2023-03-15"))
                    .posterPath("/2VK4d3mqqTc7LVZLnLPeRiPaJ71.jpg")
                    .backdropPath("/nDxJJyA5giRhXx96q1sWbOUjMBI.jpg")
                    .trailerId("O-b2VfmmbyA")
                    .build(),

            ContentSummaryDto.builder().id(76600).title("Avatar: The Way of Water")
                    .genres(List.of("Fantasy", "Action")).type(ContentType.MOVIE)
                    .overview(
                            "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.")
                    .length(192)
                    .rating(7.7)
                    .releaseDate(LocalDate.parse("2022-12-14"))
                    .posterPath("/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg")
                    .backdropPath("/ovM06PdF3M8wvKb06i4sjW3xoww.jpg")
                    .trailerId("O-b2VfmmbyA")
                    .build(),

            ContentSummaryDto.builder()
                    .id(948713)
                    .title("The Last Kingdom: Seven Kings Must Die")
                    .genres(List.of("Action", "History"))
                    .type(ContentType.TV)
                    .overview(
                            "In the wake of King Edward's death, Uhtred of Bebbanburg and his comrades adventure across a fractured kingdom in the hopes of uniting England at last.")
                    .length(24)
                    .rating(7.4)
                    .releaseDate(LocalDate.parse("2023-04-14"))
                    .posterPath("/7yyFEsuaLGTPul5UkHc5BhXnQ0k.jpg")
                    .backdropPath("/xwA90BwZXTh8ke3CVsQlj8EOkFr.jpg")
                    .trailerId("O-b2VfmmbyA")
                    .build(),

            ContentSummaryDto.builder()
                    .id(677179)
                    .title("Creed III")
                    .genres(List.of("Drama", "Action"))
                    .type(ContentType.MOVIE)
                    .overview(
                            "After dominating the boxing world, Adonis Creed has been thriving in both his career and family life. When a childhood friend and former boxing prodigy, Damian Anderson, resurfaces after serving a long sentence in prison, he is eager to prove that he deserves his shot in the ring. The face-off between former friends is more than just a fight. To settle the score, Adonis must put his future on the line to battle Damian — a fighter who has nothing to lose.")
                    .length(116).rating(7.3).releaseDate(LocalDate.parse("2023-03-01"))
                    .posterPath("/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg")
                    .backdropPath("/5i6SjyDbDWqyun8klUuCxrlFbyw.jpg")
                    .build(),

            ContentSummaryDto.builder().id(713704).title("Evil Dead Rise")
                    .genres(List.of("Horror", "Thriller"))
                    .type(ContentType.MOVIE)
                    .overview(
                            "Two sisters find an ancient vinyl that gives birth to bloodthirsty demons that run amok in a Los Angeles apartment building and thrusts them into a primal battle for survival as they face the most nightmarish version of family imaginable.")
                    .length(96).rating(6.9).releaseDate(LocalDate.parse("2023-04-12"))
                    .posterPath("/mIBCtPvKZQlxubxKMeViO2UrP3q.jpg")
                    .backdropPath("/7bWxAsNPv9CXHOhZbJVlj2KxgfP.jpg")
                    .build(),

            ContentSummaryDto.builder().id(638974).title("Murder Mystery tv")
                    .genres(List.of("Comedy", "Mystery")).type(ContentType.MOVIE)
                    .overview(
                            "After starting their own detective agency, Nick and Audrey Spitz land a career-making case when their billionaire pal is kidnapped from his wedding.")
                    .length(8).rating(6.6).releaseDate(LocalDate.parse("2023-03-28"))
                    .posterPath("/s1VzVhXlqsevi8zeCMG9A16nEUf.jpg")
                    .backdropPath("/bT3IpP7OopgiVuy6HCPOWLuaFAd.jpg")
                    .build(),

            ContentSummaryDto.builder().id(315162).title("Puss in Boots: The Animated tv")
                    .genres(List.of("Animation", "Family"))
                    .type(ContentType.TV)
                    .overview(
                            "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.")
                    .length(26).rating(8.3).releaseDate(LocalDate.parse("2022-12-07"))
                    .posterPath("/kuf6dutpsT0vSVehic3EZIqkOBt.jpg")
                    .backdropPath("/ouB7hwclG7QI3INoYJHaZL4vOaa.jpg")
                    .build(),

            ContentSummaryDto.builder().id(603692).title("John Wick: Chapter 4")
                    .genres(List.of("Action", "Thriller")).type(ContentType.MOVIE)
                    .overview(
                            "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.")
                    .length(169).rating(8.0).releaseDate(LocalDate.parse("2023-03-22"))
                    .posterPath("/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg")
                    .backdropPath("/h8gHn0OzBoaefsYseUByqsmEDMY.jpg")
                    .build(),

            ContentSummaryDto.builder().id(1048300).title("Adrenaline")
                    .genres(List.of("Action", "Thriller"))
                    .type(ContentType.MOVIE)
                    .overview(
                            "A female FBI agent holidaying in Eastern Europe with her family gets her life upside down when her daughter is kidnapped. She has to team up with a criminal on the run to save her daughter before time runs out.")
                    .length(95).rating(4.0).releaseDate(LocalDate.parse("2022-12-15"))
                    .posterPath("/qVzRt8c2v4gGBYsnaflXVVeQ9Lh.jpg")
                    .backdropPath("/nDmPjKLqLwWyd4Ssti8HCdhW5cZ.jpg")
                    .build(),

            ContentSummaryDto.builder().id(804150).title("Cocaine Bear")
                    .genres(List.of("Thriller", "Comedy")).type(ContentType.MOVIE)
                    .overview(
                            "Inspired by a true story, an oddball group of cops, criminals, tourists and teens converge in a Georgia forest where a 500-pound black bear goes on a murderous rampage after unintentionally ingesting cocaine.")
                    .length(95).rating(6.4).releaseDate(LocalDate.parse("2023-02-22"))
                    .posterPath("/gOnmaxHo0412UVr1QM5Nekv1xPi.jpg")
                    .backdropPath("/a2tys4sD7xzVaogPntGsT1ypVoT.jpg")
                    .build(),

            ContentSummaryDto.builder().id(1008005).title("The Communion Girl").genres(List.of("Horror"))
                    .type(ContentType.MOVIE)
                    .overview(
                            "Spain, late 1980s. Newcomer Sara tries to fit in with the other teens in this tight-knit small town in the province of Tarragona. If only she were more like her extroverted best friend, Rebe. They go out one night at a nightclub, on the way home, they come upon a little girl holding a doll, dressed for her first communion. And that's when the nightmare begins.")
                    .length(93).rating(6.3).releaseDate(LocalDate.parse("2023-03-02"))
                    .posterPath("/rzRb63TldOKdKydCvWJM8B6EkPM.jpg")
                    .backdropPath("/eSVu1FvGPy86TDo4hQbpuHx55DJ.jpg")
                    .build(),

            ContentSummaryDto.builder().id(946310).title("Pirates Down the Street")
                    .genres(List.of("Family", "Action")).type(ContentType.TV)
                    .overview(
                            "The pirates feel right at home in Sandborough, but the atmosphere cools right down when the ninjas come to live in the street. After all, pirates and ninjas are sworn enemies!  While pirate captain Hector Blunderbuss struggles to get rid of his new neighbours, son Billy and ninja daughter Yuka become friends. The pirates challenge the ninjas to the ultimate battle at the village's annual hexathlon. Who will win the match? Ninjas are faster and more agile of course, but pirates are the best cheats in all of the seven seas...")
                    .length(12).rating(6.2).releaseDate(LocalDate.parse("2022-04-20"))
                    .posterPath("/uDsvma9dAwnDPVuCFi99YpWvBk0.jpg")
                    .backdropPath("/tFaC1Fb1sv1dALB0i9Avi76MHmn.jpg")
                    .build(),

            ContentSummaryDto.builder().id(1104040).title("Gangs of Lagos: The tv")
                    .genres(List.of("Crime", "Drama")).type(ContentType.TV)
                    .overview(
                            "A group of friends who each have to navigate their own destiny, growing up on the bustling streets and neighborhood of Isale Eko, Lagos.")
                    .length(6).rating(5.6).releaseDate(LocalDate.parse("2023-04-07"))
                    .posterPath("/nGwFsB6EXUCr21wzPgtP5juZPSv.jpg")
                    .backdropPath("/rPSJAElGxOTko1zK6uIlYnTMFxN.jpg")
                    .build(),

            ContentSummaryDto.builder().id(758323).title("The Pope's Exorcist")
                    .genres(List.of("Horror", "Thriller")).type(ContentType.MOVIE)
                    .overview(
                            "Father Gabriele Amorth, Chief Exorcist of the Vatican, investigates a young boy's terrifying possession and ends up uncovering a centuries-old conspiracy the Vatican has desperately tried to keep hidden.")
                    .length(103).rating(6.5).releaseDate(LocalDate.parse("2023-04-05"))
                    .posterPath("/9JBEPLTPSm0d1mbEcLxULjJq9Eh.jpg")
                    .backdropPath("/5Y5pz0NX7SZS9036I733F7uNcwK.jpg")
                    .build(),

            ContentSummaryDto.builder().id(842945).title("Supercell")
                    .genres(List.of("Action", "Thriller")).type(ContentType.MOVIE)
                    .overview(
                            "Good-hearted teenager William always lived in hope of following in his late father’s footsteps and becoming a storm chaser. His father’s legacy has now been turned into a storm-chasing tourist business, managed by the greedy and reckless Zane Rogers, who is now using William as the main attraction to lead a group of unsuspecting adventurers deep into the eye of the most dangerous supercell ever seen.")
                    .length(100).rating(6.4).releaseDate(LocalDate.parse("2023-03-17"))
                    .posterPath("/gbGHezV6yrhua0KfAgwrknSOiIY.jpg")
                    .backdropPath("/m1fgGSLK0WvRpzM1AmZu38m0Tx8.jpg")
                    .build(),

            ContentSummaryDto.builder().id(849869).title("Kill Boksoon")
                    .genres(List.of("Action", "Thriller")).type(ContentType.TV)
                    .overview(
                            "At work, she's a renowned assassin. At home, she's a single mom to a teenage daughter. Killing? That's easy. It's parenting that's the hard part.")
                    .length(16).rating(6.8).releaseDate(LocalDate.parse("2023-02-17"))
                    .posterPath("/taYgn3RRpCGlTGdaGQvnSIOzXFy.jpg")
                    .backdropPath("/tYcmm8XtzRdcT6kliCbHuWwLCwB.jpg")
                    .build(),

            ContentSummaryDto.builder().id(1033219).title("Attack on Titan (Sci-Fi Live Action)")
                    .genres(List.of("Sci-Fi", "Action")).type(ContentType.TV)
                    .overview(
                            "As viable water is depleted on Earth, a mission is sent to Saturn's moon Titan to retrieve sustainable H2O reserves from its alien inhabitants. But just as the humans acquire the precious resource, they are attacked by Titan rebels, who don't trust that the Earthlings will leave in peace.")
                    .length(10).rating(6.1).releaseDate(LocalDate.parse("2022-09-30"))
                    .posterPath("/qNz4l8UgTkD8rlqiKZ556pCJ9iO.jpg")
                    .backdropPath("/eNJhWy7xFzR74SYaSJHqJZuroDm.jpg")
                    .build());
    public static CreditsDto creditsDto = CreditsDto.builder()
            .cast(List.of(
                    ActorDto.builder().name("Edward Norton")
                            .profilePath("/8nytsqL59SFJTVYVrN72k6qkGgJ.jpg")
                            .character("The Narrator").order(0).build(),
                    ActorDto.builder().name("Brad Pitt")
                            .profilePath("/huV2cdcolEUwJy37QvH914vup7d.jpg")
                            .character("Tyler Durden").order(1).build(),
                    ActorDto.builder().name("Helena Bonham Carter")
                            .profilePath("/DDeITcCpnBd0CkAIRPhggy9bt5.jpg")
                            .character("Marla Singer").order(2).build(),
                    ActorDto.builder().name("Meat Loaf")
                            .profilePath("/7gKLR1u46OB8WJ6m06LemNBCMx6.jpg")
                            .character("Robert \"Bob\" Paulson").order(3).build(),
                    ActorDto.builder().name("Jared Leto")
                            .profilePath("/ca3x0OfIKbJppZh8S1Alx3GfUZO.jpg")
                            .character("Angel Face").order(4).build(),
                    ActorDto.builder().name("Zach Grenier")
                            .profilePath("/fSyQKZO39sUsqY283GXiScOg3Hi.jpg")
                            .character("Richard Chesler").order(5).build(),
                    ActorDto.builder().name("Holt McCallany")
                            .profilePath("/a5ax2ICLrV6l0T74OSFvzssCQyQ.jpg")
                            .character("The Mechanic").order(6).build(),
                    ActorDto.builder().name("Eion Bailey")
                            .profilePath("/hKqfGq1sPhZdQOlto0bS3igFZdP.jpg")
                            .character("Ricky").order(7).build(),
                    ActorDto.builder().name("Richmond Arquette")
                            .profilePath("/7byGiVac0GjBSVD1h6ylZlVXZK6.jpg")
                            .character("Intern").order(8).build(),
                    ActorDto.builder().name("David Andrews")
                            .profilePath("/36LEerIIN7gpG52mM3Ier7YWDbh.jpg")
                            .character("Thomas").order(9).build()))
            .directors(List.of(
                    DirectorDto.builder().name("David Fincher")
                            .profilePath("/tpEczFclQZeKAiCeKZZ0adRvtfz.jpg")
                            .build()))
            .build();
    public static WatchlistDto userWatchlist = WatchlistDto.builder()
            .saved(getWatchlist())
            .watched(getWatchedList())
            .build();
    static SeasonDto season1 = SeasonDto.builder()
            .seasonNumber(1)
            .episodes(List.of(
                    EpisodeDto.builder().runtime(62).episodeNumber(1).name("Winter Is Coming")
                            .overview("Jon Arryn, the Hand of the King, is dead...")
                            .stillPath("/9hGF3WUkBf7cSjMg0cdMDHJkByd.jpg").build(),
                    EpisodeDto.builder().runtime(56).episodeNumber(2).name("The Kingsroad")
                            .overview("While Bran recovers from his fall, Ned takes only his daughters...")
                            .stillPath("/l0GJx3IR8YasbztTJi5uK0XqkEo.jpg").build(),
                    EpisodeDto.builder().runtime(58).episodeNumber(3).name("Lord Snow")
                            .overview("Lord Stark and his daughters arrive at King's Landing...")
                            .stillPath("/8HjOlb4slc1xusMgOtoNpxuTgSI.jpg").build(),
                    EpisodeDto.builder().runtime(56).episodeNumber(4)
                            .name("Cripples, Bastards, and Broken Things")
                            .overview("Eddard investigates Jon Arryn's murder...")
                            .stillPath("/Ai2UPMWv38xGjOgNBuA1o8w8dUI.jpg").build(),
                    EpisodeDto.builder().runtime(55).episodeNumber(5).name("The Wolf and the Lion")
                            .overview("Catelyn has captured Tyrion and plans to bring him to her sister...")
                            .stillPath("/u7e1qSWE6v8jfY9vGNrckX47DGN.jpg").build(),
                    EpisodeDto.builder().runtime(53).episodeNumber(6).name("A Golden Crown")
                            .overview("While recovering from his battle with Jamie, Eddard is forced...")
                            .stillPath("/6FcfWGFlDyWZ2JvQi8uvkxbDx1z.jpg").build(),
                    EpisodeDto.builder().runtime(58).episodeNumber(7).name("You Win or You Die")
                            .overview("Robert has been injured while hunting and is dying...")
                            .stillPath("/o6ldSDhIINGNKZR62mHf2m64dD.jpg").build(),
                    EpisodeDto.builder().runtime(59).episodeNumber(8).name("The Pointy End")
                            .overview("Eddard and his men are betrayed and captured by the Lannisters...")
                            .stillPath("/hH0U1QISWGGjoFutvCLdw28MGiq.jpg").build(),
                    EpisodeDto.builder().runtime(57).episodeNumber(9).name("Baelor")
                            .overview("Robb goes to war against the Lannisters...")
                            .stillPath("/fAmBhmw1pQc6fucrdmnRM5FOpXD.jpg").build(),
                    EpisodeDto.builder().runtime(53).episodeNumber(10).name("Fire and Blood")
                            .overview("With Ned dead, Robb vows to get revenge on the Lannisters...")
                            .stillPath("/y1BXkhEqBQS3ewQeqqdHpjhTts0.jpg").build()))
            .build();
    static SeasonDto season2 = SeasonDto.builder()
            .seasonNumber(2)
            .episodes(List.of(
                    EpisodeDto.builder().runtime(62).episodeNumber(1).name("Winter Is Coming")
                            .overview("Jon Arryn, the Hand of the King, is dead...")
                            .stillPath("/9hGF3WUkBf7cSjMg0cdMDHJkByd.jpg").build(),
                    EpisodeDto.builder().runtime(56).episodeNumber(2).name("The Kingsroad")
                            .overview("While Bran recovers from his fall, Ned takes only his daughters...")
                            .stillPath("/l0GJx3IR8YasbztTJi5uK0XqkEo.jpg").build(),
                    EpisodeDto.builder().runtime(58).episodeNumber(3).name("Lord Snow")
                            .overview("Lord Stark and his daughters arrive at King's Landing...")
                            .stillPath("/8HjOlb4slc1xusMgOtoNpxuTgSI.jpg").build(),
                    EpisodeDto.builder().runtime(56).episodeNumber(4)
                            .name("Cripples, Bastards, and Broken Things")
                            .overview("Eddard investigates Jon Arryn's murder...")
                            .stillPath("/Ai2UPMWv38xGjOgNBuA1o8w8dUI.jpg").build(),
                    EpisodeDto.builder().runtime(55).episodeNumber(5).name("The Wolf and the Lion")
                            .overview("Catelyn has captured Tyrion and plans to bring him to her sister...")
                            .stillPath("/u7e1qSWE6v8jfY9vGNrckX47DGN.jpg").build(),
                    EpisodeDto.builder().runtime(53).episodeNumber(6).name("A Golden Crown")
                            .overview("While recovering from his battle with Jamie, Eddard is forced...")
                            .stillPath("/6FcfWGFlDyWZ2JvQi8uvkxbDx1z.jpg").build(),
                    EpisodeDto.builder().runtime(58).episodeNumber(7).name("You Win or You Die")
                            .overview("Robert has been injured while hunting and is dying...")
                            .stillPath("/o6ldSDhIINGNKZR62mHf2m64dD.jpg").build(),
                    EpisodeDto.builder().runtime(59).episodeNumber(8).name("The Pointy End")
                            .overview("Eddard and his men are betrayed and captured by the Lannisters...")
                            .stillPath("/hH0U1QISWGGjoFutvCLdw28MGiq.jpg").build(),
                    EpisodeDto.builder().runtime(57).episodeNumber(9).name("Baelor")
                            .overview("Robb goes to war against the Lannisters...")
                            .stillPath("/fAmBhmw1pQc6fucrdmnRM5FOpXD.jpg").build(),
                    EpisodeDto.builder().runtime(53).episodeNumber(10).name("Fire and Blood")
                            .overview("With Ned dead, Robb vows to get revenge on the Lannisters...")
                            .stillPath("/y1BXkhEqBQS3ewQeqqdHpjhTts0.jpg").build()))
            .build();
    public static List<SeasonDto> seasonsList = List.of(season1, season2);
    static ProviderOptionsDto providersDE = ProviderOptionsDto.builder()
            .flatrate(List.of(
                    ProviderDetailsDto.builder().logoPath("/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg")
                            .providerId(337)
                            .providerName("Disney Plus").displayPriority(2).build(),
                    ProviderDetailsDto.builder().logoPath("/2joD3S2goOB6lmepX35A8dmaqgM.jpg")
                            .providerId(421)
                            .providerName("Joyn Plus").displayPriority(49).build()))
            .buy(List.of(
                    ProviderDetailsDto.builder().logoPath("/peURlLlr8jggOwK53fJ5wdQl05y.jpg")
                            .providerId(2)
                            .providerName("Apple TV").displayPriority(4).build(),
                    ProviderDetailsDto.builder().logoPath("/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg")
                            .providerId(10)
                            .providerName("Amazon Video").displayPriority(7).build(),
                    ProviderDetailsDto.builder().logoPath("/tbEdFQDwx5LEVr8WpSeXQSIirVq.jpg")
                            .providerId(3)
                            .providerName("Google Play Movies").displayPriority(8).build()))
            .rent(List.of(
                    ProviderDetailsDto.builder().logoPath("/peURlLlr8jggOwK53fJ5wdQl05y.jpg")
                            .providerId(2)
                            .providerName("Apple TV").displayPriority(4).build(),
                    ProviderDetailsDto.builder().logoPath("/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg")
                            .providerId(10)
                            .providerName("Amazon Video").displayPriority(7).build()))
            .build();
    static ProviderOptionsDto providersUS = ProviderOptionsDto.builder()
            .flatrate(List.of(
                    ProviderDetailsDto.builder().logoPath("/jPXksae158ukMLFhhlNvzsvaEyt.jpg")
                            .providerId(257)
                            .providerName("fuboTV").displayPriority(5).build(),
                    ProviderDetailsDto.builder().logoPath("/zxrVdFjIjLqkfnwyghnfywTn3Lh.jpg")
                            .providerId(15)
                            .providerName("Hulu").displayPriority(6).build()))
            .buy(List.of(
                    ProviderDetailsDto.builder().logoPath("/peURlLlr8jggOwK53fJ5wdQl05y.jpg")
                            .providerId(2)
                            .providerName("Apple TV").displayPriority(4).build(),
                    ProviderDetailsDto.builder().logoPath("/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg")
                            .providerId(10)
                            .providerName("Amazon Video").displayPriority(13).build()))
            .rent(List.of(
                    ProviderDetailsDto.builder().logoPath("/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg")
                            .providerId(10)
                            .providerName("Amazon Video").displayPriority(13).build(),
                    ProviderDetailsDto.builder().logoPath("/tbEdFQDwx5LEVr8WpSeXQSIirVq.jpg")
                            .providerId(3)
                            .providerName("Google Play Movies").displayPriority(14)
                            .build()))
            .build();
    public static Map<String, ProviderOptionsDto> providersMap = Map.of(
            "DE", providersDE,
            "US", providersUS);

    private static List<WatchedItem> getWatchedList() {
        Random random = new Random();
        List<WatchedItem> watchedList = new ArrayList<>();

        // Generate 14 mocked watched items
        watchedList.add(WatchedItem.builder()
                .contentItem(mockDataList.get(random.nextInt(16)))
                .userRating(random.nextInt(11))
                .watchedTimestamp(Instant.parse("2026-01-15T12:00:00Z").getEpochSecond())
                .build());

        watchedList.add(WatchedItem.builder()
                .contentItem(mockDataList.get(random.nextInt(16)))
                .userRating(random.nextInt(11))
                .watchedTimestamp(Instant.parse("2026-02-02T18:30:00Z").getEpochSecond())
                .build());

        watchedList.add(WatchedItem.builder()
                .contentItem(mockDataList.get(random.nextInt(16)))
                .userRating(random.nextInt(11))
                .watchedTimestamp(Instant.parse("2026-02-28T21:15:00Z").getEpochSecond())
                .build());

        watchedList.add(WatchedItem.builder()
                .contentItem(mockDataList.get(random.nextInt(16)))
                .userRating(random.nextInt(11))
                .watchedTimestamp(Instant.parse("2026-03-10T14:45:00Z").getEpochSecond())
                .build());

        watchedList.add(WatchedItem.builder()
                .contentItem(mockDataList.get(random.nextInt(16)))
                .userRating(random.nextInt(11))
                .watchedTimestamp(Instant.parse("2026-03-29T23:00:00Z").getEpochSecond())
                .build());

        watchedList.add(WatchedItem.builder()
                .contentItem(mockDataList.get(random.nextInt(16)))
                .userRating(random.nextInt(11))
                .watchedTimestamp(Instant.parse("2026-04-12T09:15:00Z").getEpochSecond())
                .build());

        watchedList.add(WatchedItem.builder()
                .contentItem(mockDataList.get(random.nextInt(16)))
                .userRating(random.nextInt(11))
                .watchedTimestamp(Instant.parse("2026-04-30T20:00:00Z").getEpochSecond())
                .build());

        watchedList.add(WatchedItem.builder()
                .contentItem(mockDataList.get(random.nextInt(16)))
                .userRating(random.nextInt(11))
                .watchedTimestamp(Instant.parse("2026-05-05T17:10:00Z").getEpochSecond())
                .build());

        watchedList.add(WatchedItem.builder()
                .contentItem(mockDataList.get(random.nextInt(16)))
                .userRating(random.nextInt(11))
                .watchedTimestamp(Instant.parse("2026-05-22T22:40:00Z").getEpochSecond())
                .build());

        watchedList.add(WatchedItem.builder()
                .contentItem(mockDataList.get(random.nextInt(16)))
                .userRating(random.nextInt(11))
                .watchedTimestamp(Instant.parse("2026-06-01T11:00:00Z").getEpochSecond())
                .build());

        watchedList.add(WatchedItem.builder()
                .contentItem(mockDataList.get(random.nextInt(16)))
                .userRating(random.nextInt(11))
                .watchedTimestamp(Instant.parse("2026-06-14T19:25:00Z").getEpochSecond())
                .build());

        watchedList.add(WatchedItem.builder()
                .contentItem(mockDataList.get(random.nextInt(16)))
                .userRating(random.nextInt(11))
                .watchedTimestamp(Instant.parse("2026-06-25T15:50:00Z").getEpochSecond())
                .build());

        watchedList.add(WatchedItem.builder()
                .contentItem(mockDataList.get(random.nextInt(16)))
                .userRating(random.nextInt(11))
                .watchedTimestamp(Instant.parse("2026-07-01T20:10:00Z").getEpochSecond())
                .build());

        watchedList.add(WatchedItem.builder()
                .contentItem(mockDataList.get(random.nextInt(16)))
                .userRating(random.nextInt(11))
                .watchedTimestamp(Instant.parse("2026-07-03T02:00:00Z").getEpochSecond())
                .build());
        return watchedList;
    }

    private static List<SavedItem> getWatchlist() {
        return mockDataList.stream().map(mockData -> {
            Random random = new Random();
            long nowInSeconds = System.currentTimeMillis() / 1000L;
            long randomAddedTimestamp = nowInSeconds - (random.nextInt(30) * 24L * 60L * 60L);

            return SavedItem.builder()
                    .contentItem(ContentSummaryDto.builder()
                            .id(mockData.id())
                            .title(mockData.title())
                            .genres(mockData.genres())
                            .type(mockData.type())
                            .overview(mockData.overview())
                            .length(mockData.length())
                            .rating(mockData.rating())
                            .releaseDate(mockData.releaseDate())
                            .posterPath(mockData.posterPath())
                            .backdropPath(mockData.backdropPath())
                            .build())
                    .addedTimestamp(randomAddedTimestamp)
                    .build();
        }).toList();
    }
}
