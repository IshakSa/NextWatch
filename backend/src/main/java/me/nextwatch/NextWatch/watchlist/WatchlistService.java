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
        List<WatchlistItem> watchlist = watchlistRepository.findAllByIdUserId(userId);

        return watchlistMapper.toWatchlistDto(watchlist);
    }

    public void add(Integer userId, WatchlistAddDto watchlistAddDto) {
        // TODO: change how already seen content is handled here
        // suggestion: if user adds content to saved, and he already seen it, show seen batch in frontend in saved tab
        if (watchlistAddDto.status().equals(WatchlistStatus.SAVED)
                && watchlistRepository.existsById(new WatchlistItemId(userId, watchlistAddDto.contentId()))) {
            return;
        }

        WatchlistItem currentWatchlistItem = watchlistRepository
                .findById(new WatchlistItemId(userId, watchlistAddDto.contentId()))
                .orElse(null);
        boolean watchlistItemExists = currentWatchlistItem != null;

        User user = User.builder().id(userId).build();
        WatchlistItem watchlistItem = WatchlistItem.builder()
                .user(user)
                .id(new WatchlistItemId(user.getId(), watchlistAddDto.contentId()))
                .status(watchlistAddDto.status())
                .contentType(watchlistAddDto.contentType())
                .userRating(watchlistAddDto.userRating())
                .addedTimestamp(watchlistItemExists ? currentWatchlistItem.getAddedTimestamp() : null)
                .watchedTimestamp(watchlistItemExists ? currentWatchlistItem.getWatchedTimestamp() : null)
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
