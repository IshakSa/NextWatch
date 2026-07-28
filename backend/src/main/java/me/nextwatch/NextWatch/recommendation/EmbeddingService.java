package me.nextwatch.NextWatch.recommendation;

import me.nextwatch.NextWatch.content.Content;
import me.nextwatch.NextWatch.content.ContentId;
import me.nextwatch.NextWatch.content.ContentRepository;
import me.nextwatch.NextWatch.content.dtos.ContentSummaryDto;
import me.nextwatch.NextWatch.watchlist.WatchlistItem;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmbeddingService {
    private final EmbeddingModel embeddingModel;
    private final ContentRepository contentRepository;

    public EmbeddingService(EmbeddingModel embeddingModel, ContentRepository contentRepository) {
        this.embeddingModel = embeddingModel;
        this.contentRepository = contentRepository;
    }

    private String extractContentFeatures(ContentSummaryDto content) {
        return String.format(
                "Title: %s. Genre: %s. Type: %s. Overview: %s",
                content.title(), content.genres(), content.type(), content.overview());
    }

    public float[] getContentEmbedding(ContentSummaryDto content) {
        return embeddingModel.embed(extractContentFeatures(content));
    }

    public float[] getUserEmbedding(List<WatchlistItem> watchlist) {
        if (watchlist == null || watchlist.isEmpty()) {
            return new float[0];
        }

        List<ContentId> contentIds = watchlist.stream()
                .map(item -> new ContentId(item.getId().getContentId(), item.getContentType()))
                .toList();
        List<Content> content = contentRepository.findAllById(contentIds);
        List<float[]> embeddings = content.stream().map(Content::getEmbedding).toList();

        return getNormalizedVector(getAveragedEmbedding(embeddings));
    }

    private float[] getAveragedEmbedding(List<float[]> embeddings) {
        if (embeddings.isEmpty()) {
            throw new IllegalArgumentException("Embeddings cannot be empty");
        }

        int dimensions = embeddings.getFirst().length;
        int totalEmbeddings = embeddings.size();
        float[] result = new float[dimensions];

        for (float[] embedding : embeddings) {
            for (int i = 0; i < dimensions; i++) {
                result[i] += embedding[i];
            }
        }

        for (int i = 0; i < dimensions; i++) {
            result[i] /= totalEmbeddings;
        }

        return result;
    }

    private float[] getNormalizedVector(float[] vector) {
        double vectorLength = 0;
        for (float num : vector) {
            vectorLength += Math.pow(num, 2);
        }

        vectorLength = Math.sqrt(vectorLength);

        float[] normalized = new float[vector.length];
        if (vectorLength > 0) {
            for (int i = 0; i < vector.length; i++) {
                normalized[i] = vector[i] / (float) vectorLength;
            }
        }

        return normalized;
    }
}
