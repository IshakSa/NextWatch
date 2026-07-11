package com.app.MyApp.watchlist;

import com.app.MyApp.user.User;
import org.springframework.stereotype.Service;

import java.util.List;

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
        List<WatchlistItem> watchlist = watchlistRepository.findAllByUserId(1);

        return watchlistMapper.toWatchlistDto(watchlist);
    }

    public void add(WatchlistAddDto watchlistAddDto) {
        // !: always add to the test account
        User user = User.builder().id(1).build();
        WatchlistItem watchlistItem = WatchlistItem.builder()
                .user(user)
                .contentId(watchlistAddDto.contentId())
                .status(watchlistAddDto.status())
                .contentType(watchlistAddDto.contentType())
                .userRating(watchlistAddDto.userRating())
                .build();

        watchlistRepository.save(watchlistItem);
    }

    public void updateStatus(WatchlistUpdateDto watchlistUpdateDto) {
        WatchlistItem watchlistItem = watchlistRepository.findById(watchlistUpdateDto.id()).orElseThrow(() -> new RuntimeException("watchlistItem not found"));
        watchlistItem.setStatus(watchlistUpdateDto.status());
        watchlistItem.setUserRating(watchlistUpdateDto.userRating());
        watchlistRepository.save(watchlistItem);
    }

    public void delete(Integer contentId) {
        watchlistRepository.deleteByContentId(contentId);
    }

}
