package me.nextwatch.NextWatch.watchlist;

import me.nextwatch.NextWatch.user.User;
import me.nextwatch.NextWatch.user.UserService;
import me.nextwatch.NextWatch.watchlist.dtos.WatchlistAddDto;
import me.nextwatch.NextWatch.watchlist.dtos.WatchlistDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WatchlistService {

    private final WatchlistMapper watchlistMapper;
    private final WatchlistRepository watchlistRepository;
    private final UserService userService;

    public WatchlistService(
            WatchlistRepository watchlistRepository, WatchlistMapper watchlistMapper, UserService userService) {
        this.watchlistRepository = watchlistRepository;
        this.watchlistMapper = watchlistMapper;
        this.userService = userService;
    }

    private List<WatchlistItem> getWatchlistEntities(Integer userId) {
        return watchlistRepository.findAllByIdUserId(userId);
    }

    public WatchlistDto getWatchlist(Integer userId) {
        // !: always get from test account
        List<WatchlistItem> watchlist = watchlistRepository.findAllByIdUserId(userId);

        return watchlistMapper.toWatchlistDto(watchlist);
    }

    public void add(Integer userId, WatchlistAddDto watchlistAddDto) {
        if (watchlistAddDto.status().equals(WatchlistStatus.SAVED)
                && watchlistRepository.existsById(new WatchlistItemId(userId, watchlistAddDto.contentId()))) {
            return;
        }

        User user = User.builder().id(userId).build();
        WatchlistItem watchlistItem = WatchlistItem.builder()
                .user(user)
                .id(new WatchlistItemId(user.getId(), watchlistAddDto.contentId()))
                .status(watchlistAddDto.status())
                .contentType(watchlistAddDto.contentType())
                .userRating(watchlistAddDto.userRating())
                .build();

        watchlistRepository.save(watchlistItem);
        userService.updateEmbedding(userId, getWatchlistEntities(userId));
    }

    public void delete(Integer userId, Integer contentId) {
        watchlistRepository.deleteById(new WatchlistItemId(userId, contentId));
        userService.updateEmbedding(userId, getWatchlistEntities(userId));
    }

    public WatchlistStatus getStatus(Integer userId, int contentId) {
        Optional<WatchlistItem> watchlistItemQuery =
                watchlistRepository.findById(new WatchlistItemId(userId, contentId));
        if (watchlistItemQuery.isEmpty()) {
            return WatchlistStatus.NONE;
        }
        return watchlistItemQuery.get().getStatus();
    }
}
