package com.app.MyApp.watchlist;

import com.app.MyApp.user.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WatchlistService {

    private final WatchlistMapper watchlistMapper;
    private final WatchlistRepository watchlistRepository;

    public WatchlistService(WatchlistRepository watchlistRepository, WatchlistMapper watchlistMapper) {
        this.watchlistRepository = watchlistRepository;
        this.watchlistMapper = watchlistMapper;
    }

    public WatchlistDto getWatchlist() {
        // !: always get from test account
        List<WatchlistItem> watchlist = watchlistRepository.findAllByIdUserId(1);

        return watchlistMapper.toWatchlistDto(watchlist);
    }

    public void add(WatchlistAddDto watchlistAddDto) {

        if (watchlistRepository.existsById(new WatchlistItemId(1, watchlistAddDto.contentId()))) {
            return;
        }

        // !: always add to the test account
        User user = User.builder().id(1).build();
        WatchlistItem watchlistItem = WatchlistItem.builder()
                .user(user)
                .id(new WatchlistItemId(user.getId(), watchlistAddDto.contentId()))
                .status(watchlistAddDto.status())
                .contentType(watchlistAddDto.contentType())
                .userRating(watchlistAddDto.userRating())
                .build();

        watchlistRepository.save(watchlistItem);
    }

    public void updateStatus(WatchlistUpdateDto watchlistUpdateDto) {
        WatchlistItem watchlistItem = watchlistRepository
                .findById(new WatchlistItemId(1, watchlistUpdateDto.id()))
                .orElseThrow(() -> new RuntimeException("watchlistItem not found"));
        watchlistItem.setStatus(watchlistUpdateDto.status());
        watchlistItem.setUserRating(watchlistUpdateDto.userRating());
        watchlistRepository.save(watchlistItem);
    }

    public void delete(Integer contentId) {
        watchlistRepository.deleteById(new WatchlistItemId(1, contentId));
    }

    public WatchlistStatus getStatus(int contentId) {
        Optional<WatchlistItem> watchlistItemQuery = watchlistRepository.findById(new WatchlistItemId(1, contentId));
        if (watchlistItemQuery.isEmpty()) {
            return WatchlistStatus.NONE;
        }
        return watchlistItemQuery.get().getStatus();
    }
}
