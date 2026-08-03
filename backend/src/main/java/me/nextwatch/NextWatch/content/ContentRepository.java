package me.nextwatch.NextWatch.content;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContentRepository extends JpaRepository<Content, ContentId> {

    // Sets HNSW exploration depth. A higher value ensures Postgres digs deeper
    // into the vector graph, preventing empty results when matching against large exclusion lists.
    // ! ONLY VALUES FROM 1 TO 1000 ARE ALLOWED
    @Modifying
    @Query(value = "SET LOCAL hnsw.ef_search = 500", nativeQuery = true)
    void setLocalEfSearch();

    @Query(value = """
        SELECT * FROM content
        WHERE content_Id NOT IN :excludedIds
        ORDER BY embedding <=> cast(:userVector as vector)
        LIMIT :limit;
        """, nativeQuery = true)
    List<Content> findTopSimilarContent(
            @Param("userVector") float[] userVector,
            @Param("excludedIds") List<Integer> excludedIds,
            @Param("limit") int limit);
}
