package com.app.MyApp.watchlist;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WatchlistRepository extends JpaRepository<WatchlistItem, Integer> {
    List<WatchlistItem> findAllByUserId(Integer userId);

    @Transactional
    void deleteByContentId(Integer contentId);
}
