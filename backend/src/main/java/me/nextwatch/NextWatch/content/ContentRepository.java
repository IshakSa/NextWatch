package me.nextwatch.NextWatch.content;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContentRepository extends JpaRepository<Content, ContentId> {
    @Query(value = """
        SELECT * FROM content
        ORDER BY embedding <=> cast(:userVector as vector)
        LIMIT :limit
        """, nativeQuery = true)
    List<Content> findTopSimilarContent(@Param("userVector") float[] userVector, @Param("limit") int limit);
}
