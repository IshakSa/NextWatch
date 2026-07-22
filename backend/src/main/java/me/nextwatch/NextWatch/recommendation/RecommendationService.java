package me.nextwatch.NextWatch.recommendation;

import me.nextwatch.NextWatch.content.Content;
import me.nextwatch.NextWatch.content.ContentRepository;
import me.nextwatch.NextWatch.content.ContentService;
import me.nextwatch.NextWatch.content.dtos.ContentSummaryDto;
import me.nextwatch.NextWatch.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {

    private final UserRepository userRepository;
    private final ContentRepository contentRepository;
    private final ContentService contentService;

    public RecommendationService(
            UserRepository userRepository, ContentRepository contentRepository, ContentService contentService) {
        this.userRepository = userRepository;
        this.contentRepository = contentRepository;
        this.contentService = contentService;
    }

    public List<ContentSummaryDto> getUserRecommendations(Integer userId, int limit) {
        float[] userEmbedding = userRepository
                .findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getEmbedding();

        List<Content> recommendations = contentRepository.findTopSimilarContent(userEmbedding, limit);

        return recommendations.stream()
                .map(item -> contentService.getContentByIdAndByType(
                        item.getId().getContentId(), item.getId().getContentType(), true))
                .toList();
    }
}
