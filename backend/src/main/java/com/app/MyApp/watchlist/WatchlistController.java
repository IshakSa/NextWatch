package com.app.MyApp.watchlist;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/watchlist")
public class WatchlistController {

    private final WatchlistService watchlistService;

    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    @GetMapping
    public ResponseEntity<WatchlistDto> getWatchlist() {
        return new ResponseEntity<>(watchlistService.getWatchlist(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> add(@RequestBody WatchlistAddDto watchlistAddDto) {
        watchlistService.add(watchlistAddDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{contentId}")
    public ResponseEntity<Void> delete(@PathVariable Integer contentId) {
        watchlistService.delete(contentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/status")
    public ResponseEntity<Void> updateStatus(@RequestBody WatchlistUpdateDto watchlistUpdateDto) {
        watchlistService.updateStatus(watchlistUpdateDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
