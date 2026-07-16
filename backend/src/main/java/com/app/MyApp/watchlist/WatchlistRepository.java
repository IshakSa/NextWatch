package com.app.MyApp.watchlist;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WatchlistRepository extends JpaRepository<WatchlistItem, WatchlistItemId> {
    List<WatchlistItem> findAllByIdUserId(Integer userId);

    //    @Transactional
    //    void deleteByIdContentId(Integer contentId);
    //
    //    Optional<WatchlistItem> findByIdContentId(int id);
}
