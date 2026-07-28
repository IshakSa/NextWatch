package me.nextwatch.NextWatch.watchlist;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WatchlistRepository extends JpaRepository<WatchlistItem, WatchlistItemId> {
    List<WatchlistItem> findAllByIdUserId(Integer userId);
}
