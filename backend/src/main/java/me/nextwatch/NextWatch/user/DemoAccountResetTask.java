package me.nextwatch.NextWatch.user;

import me.nextwatch.NextWatch.content.ContentType;
import me.nextwatch.NextWatch.watchlist.WatchlistService;
import me.nextwatch.NextWatch.watchlist.WatchlistStatus;
import me.nextwatch.NextWatch.watchlist.dtos.WatchlistAddDto;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
@EnableScheduling
public class DemoAccountResetTask {
    private final UserRepository userRepository;
    private final WatchlistService watchlistService;

    public DemoAccountResetTask(UserRepository userRepository, WatchlistService watchlistService) {
        this.userRepository = userRepository;
        this.watchlistService = watchlistService;
    }

    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void resetDemoAccount() {
        userRepository.findByEmail("test@mail.com").ifPresent(user -> {
            // reset all data
            if (user.getWatchlistItems() != null) {
                user.getWatchlistItems().clear();
            } else {
                user.setWatchlistItems(new ArrayList<>());
            }
            user.setEmbedding(null);

            // apply the data reset
            userRepository.saveAndFlush(user);

            // set default watchlist
            List<WatchlistAddDto> defaultWatchlist = getDefaultWatchlist();
            defaultWatchlist.forEach(item -> watchlistService.add(user.getId(), item));

            userRepository.save(user);
        });
    }

    public List<WatchlistAddDto> getDefaultWatchlist() {
        WatchlistAddDto dune2 = new WatchlistAddDto(693134, ContentType.MOVIE, WatchlistStatus.SAVED, null);
        WatchlistAddDto theBear = new WatchlistAddDto(136315, ContentType.TV, WatchlistStatus.SAVED, null);
        WatchlistAddDto spiderman = new WatchlistAddDto(969681, ContentType.MOVIE, WatchlistStatus.SAVED, null);
        WatchlistAddDto succession = new WatchlistAddDto(76331, ContentType.TV, WatchlistStatus.SAVED, null);
        WatchlistAddDto theOdyssey = new WatchlistAddDto(1368337, ContentType.MOVIE, WatchlistStatus.SAVED, null);

        WatchlistAddDto inception = new WatchlistAddDto(27205, ContentType.MOVIE, WatchlistStatus.WATCHED, 3.5);
        WatchlistAddDto strangerThings = new WatchlistAddDto(66732, ContentType.TV, WatchlistStatus.WATCHED, 1.5);
        WatchlistAddDto breakingBad = new WatchlistAddDto(1396, ContentType.TV, WatchlistStatus.WATCHED, 4.0);
        WatchlistAddDto interstellar = new WatchlistAddDto(157336, ContentType.MOVIE, WatchlistStatus.WATCHED, 5.0);
        WatchlistAddDto parasite = new WatchlistAddDto(496243, ContentType.MOVIE, WatchlistStatus.WATCHED, 4.5);

        return List.of(
                dune2,
                theBear,
                spiderman,
                succession,
                theOdyssey,
                inception,
                strangerThings,
                breakingBad,
                interstellar,
                parasite);
    }
}
