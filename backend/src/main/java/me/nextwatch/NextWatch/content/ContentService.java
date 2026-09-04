package me.nextwatch.NextWatch.content;

import jakarta.annotation.Nullable;
import me.nextwatch.NextWatch.api.AppendToResponse;
import me.nextwatch.NextWatch.api.TmdbApiService;
import me.nextwatch.NextWatch.content.dtos.ContentDetailsDto;
import me.nextwatch.NextWatch.content.dtos.ContentSummaryDto;
import me.nextwatch.NextWatch.recommendation.EmbeddingService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ContentService {

    private final EmbeddingService embeddingService;
    private final ContentRepository contentRepository;
    private final TmdbApiService tmdbApiService;

    public ContentService(
            EmbeddingService embeddingService, ContentRepository contentRepository, TmdbApiService tmdbApiService) {
        this.embeddingService = embeddingService;
        this.contentRepository = contentRepository;
        this.tmdbApiService = tmdbApiService;
    }

    private void saveNewContentAsEmbedding(ContentSummaryDto content) {
        if (contentRepository.existsById(new ContentId(content.id(), content.type()))) {
            return;
        }

        float[] embedding = embeddingService.getContentEmbedding(content);

        Content contentEmbedding = Content.builder()
                .id(new ContentId(content.id(), content.type()))
                .embedding(embedding)
                .build();
        contentRepository.save(contentEmbedding);
    }

    public void saveNewContentAsEmbedding(List<ContentSummaryDto> content) {
        content.forEach(this::saveNewContentAsEmbedding);
    }

    public List<ContentSummaryDto> getUpcoming() {
        LocalDate minDate = LocalDate.now().plusDays(1);
        LocalDate maxDate = LocalDate.now().plusMonths(3);

        List<ContentSummaryDto> response = tmdbApiService.getUpcoming(minDate, maxDate);

        saveNewContentAsEmbedding(response);
        return response;
    }

    public List<ContentSummaryDto> getTopRated(ContentType contentType) {
        List<ContentSummaryDto> response = tmdbApiService.getTopRated(contentType);

        saveNewContentAsEmbedding(response);
        return response;
    }

    public List<ContentSummaryDto> getTrending(TimeWindow timeWindow, boolean includeTrailer) {
        final int MAX_ITEMS_FOR_DAY = 5;
        final int MAX_ITEMS_FOR_WEEK = 10;
        int maxItems = timeWindow.equals(TimeWindow.DAY) ? MAX_ITEMS_FOR_DAY : MAX_ITEMS_FOR_WEEK;

        List<ContentSummaryDto> response = tmdbApiService.getTrending(timeWindow, maxItems, includeTrailer);
        saveNewContentAsEmbedding(response);
        return response;
    }

    public ContentDetailsDto getDetails(Integer id, ContentType contentType, boolean includeSimilar) {
        List<AppendToResponse> appendToResponse = new ArrayList<>(List.of(
                AppendToResponse.TRAILERS,
                AppendToResponse.CREDITS,
                AppendToResponse.WATCH_PROVIDERS,
                AppendToResponse.SEASONS));

        if (includeSimilar) {
            appendToResponse.add(AppendToResponse.SIMILAR);
        }

        return tmdbApiService.getContentDetails(contentType, id, appendToResponse);
    }

    @Nullable
    public ContentSummaryDto getSummary(ContentId contentId, boolean includeTrailer) {
        try {
            ContentSummaryDto response = tmdbApiService.getContentSummary(
                    contentId.getContentType(), contentId.getContentId(), includeTrailer);

            saveNewContentAsEmbedding(response);
            return response;
        } catch (Exception exception) {
            return null;
        }
    }

    public List<ContentSummaryDto> searchByName(String query) {
        if (query.isBlank()) {
            return List.of();
        }

        List<ContentSummaryDto> response = tmdbApiService.searchByName(query);

        saveNewContentAsEmbedding(response);
        return response;
    }
}
