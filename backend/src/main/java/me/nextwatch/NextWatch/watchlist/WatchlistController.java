package me.nextwatch.NextWatch.watchlist;

import me.nextwatch.NextWatch.content.ContentType;
import me.nextwatch.NextWatch.security.UserPrincipal;
import me.nextwatch.NextWatch.watchlist.dtos.WatchlistAddDto;
import me.nextwatch.NextWatch.watchlist.dtos.WatchlistDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/watchlist")
public class WatchlistController {

    private final WatchlistService watchlistService;

    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    @GetMapping
    public ResponseEntity<WatchlistDto> getWatchlist(@AuthenticationPrincipal UserPrincipal currentUser) {
        return new ResponseEntity<>(watchlistService.getWatchlist(currentUser.getId()), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> add(
            @AuthenticationPrincipal UserPrincipal currentUser, @RequestBody WatchlistAddDto watchlistAddDto) {
        watchlistService.add(currentUser.getId(), watchlistAddDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{contentType}/{contentId}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PathVariable ContentType contentType,
            @PathVariable Integer contentId) {
        watchlistService.delete(currentUser.getId(), contentType, contentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{contentType}/{contentId}/status")
    public ResponseEntity<WatchlistStatus> getStatus(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @PathVariable ContentType contentType,
            @PathVariable Integer contentId) {
        return new ResponseEntity<>(
                watchlistService.getStatus(currentUser.getId(), contentType, contentId), HttpStatus.OK);
    }
}
