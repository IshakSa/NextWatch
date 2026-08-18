package me.nextwatch.NextWatch.recommendation;

import me.nextwatch.NextWatch.content.Content;
import me.nextwatch.NextWatch.content.ContentRepository;
import me.nextwatch.NextWatch.content.ContentService;
import me.nextwatch.NextWatch.content.dtos.ContentSummaryDto;
import me.nextwatch.NextWatch.user.UserRepository;
import me.nextwatch.NextWatch.watchlist.WatchlistItem;
import me.nextwatch.NextWatch.watchlist.WatchlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Stream;

@Service
public class RecommendationService {

    private final UserRepository userRepository;
    private final ContentRepository contentRepository;
    private final ContentService contentService;
    private final WatchlistRepository watchlistRepository;

    public RecommendationService(
            UserRepository userRepository,
            ContentRepository contentRepository,
            ContentService contentService,
            WatchlistRepository watchlistRepository) {
        this.userRepository = userRepository;
        this.contentRepository = contentRepository;
        this.contentService = contentService;
        this.watchlistRepository = watchlistRepository;
    }

    @Transactional
    public List<ContentSummaryDto> getUserRecommendations(Integer userId, List<Integer> seenContentIds, int limit) {
        float[] userEmbedding = userRepository
                .findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getEmbedding();
        List<WatchlistItem> watchlist = watchlistRepository.findAllByIdUserId(userId);

        List<Integer> watchlistContentIds = watchlist.stream()
                .map(watchlistItem ->
                        watchlistItem.getId().getEmbeddedContentId().getContentId())
                .toList();
        List<Integer> excludedIds = Stream.concat(seenContentIds.stream(), watchlistContentIds.stream())
                .distinct()
                .toList();

        contentRepository.setLocalEfSearch();
        List<Content> recommendations = contentRepository.findTopSimilarContent(userEmbedding, excludedIds, limit);

        if (recommendations.isEmpty()) {
            return List.of();
        }

        return recommendations.stream()
                .map(item -> contentService.getContentByContentId(item.getId(), true))
                .toList();
    }
}
