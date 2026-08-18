package me.nextwatch.NextWatch.watchlist;

import me.nextwatch.NextWatch.content.Content;
import me.nextwatch.NextWatch.content.ContentId;
import me.nextwatch.NextWatch.content.ContentType;
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
        WatchlistItemId watchlistItemId =
                new WatchlistItemId(userId, new ContentId(watchlistAddDto.contentId(), watchlistAddDto.contentType()));

        // TODO: change how already seen content is handled here
        // suggestion: if user adds content to saved, and he already seen it, show seen batch in frontend in saved tab
        if (watchlistAddDto.status().equals(WatchlistStatus.SAVED) && watchlistRepository.existsById(watchlistItemId)) {
            return;
        }

        WatchlistItem currentWatchlistItem =
                watchlistRepository.findById(watchlistItemId).orElse(null);
        boolean watchlistItemExists = currentWatchlistItem != null;

        User user = User.builder().id(userId).build();
        Content content =
                Content.builder().id(watchlistItemId.getEmbeddedContentId()).build();
        WatchlistItem watchlistItem = WatchlistItem.builder()
                .user(user)
                .content(content)
                .id(watchlistItemId)
                .status(watchlistAddDto.status())
                .userRating(watchlistAddDto.userRating())
                .addedTimestamp(watchlistItemExists ? currentWatchlistItem.getAddedTimestamp() : null)
                .watchedTimestamp(watchlistItemExists ? currentWatchlistItem.getWatchedTimestamp() : null)
                .build();

        watchlistRepository.save(watchlistItem);
        userService.updateEmbedding(userId, getWatchlistEntities(userId));
    }

    public void delete(Integer userId, ContentType contentType, Integer contentId) {
        WatchlistItemId watchlistItemId = new WatchlistItemId(userId, new ContentId(contentId, contentType));

        watchlistRepository.deleteById(watchlistItemId);
        userService.updateEmbedding(userId, getWatchlistEntities(userId));
    }

    public WatchlistStatus getStatus(Integer userId, ContentType contentType, Integer contentId) {
        WatchlistItemId watchlistItemId = new WatchlistItemId(userId, new ContentId(contentId, contentType));

        Optional<WatchlistItem> watchlistItemQuery = watchlistRepository.findById(watchlistItemId);
        if (watchlistItemQuery.isEmpty()) {
            return WatchlistStatus.NONE;
        }
        return watchlistItemQuery.get().getStatus();
    }
}
