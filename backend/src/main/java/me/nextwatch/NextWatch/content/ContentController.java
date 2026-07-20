package me.nextwatch.NextWatch.content;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/content")
public class ContentController {
    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/top-rated/{contentType}")
    public ResponseEntity<List<ContentSummaryDto>> getTopRated(@PathVariable ContentType contentType) {
        return new ResponseEntity<>(contentService.getTopRated(contentType), HttpStatus.OK);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<ContentSummaryDto>> getUpcoming() {
        return new ResponseEntity<>(contentService.getUpcoming(), HttpStatus.OK);
    }

    @GetMapping("/trending/{timeWindow}")
    public ResponseEntity<List<ContentSummaryDto>> getTrending(
            @PathVariable TimeWindow timeWindow, @RequestParam(defaultValue = "false") boolean includeTrailer) {
        return new ResponseEntity<>(contentService.getTrending(timeWindow, includeTrailer), HttpStatus.OK);
    }

    @GetMapping("/{contentType}/{id}")
    public ResponseEntity<ContentDetailsDto> getDetails(
            @PathVariable ContentType contentType,
            @PathVariable Integer id,
            @RequestParam(defaultValue = "false") boolean includeSimilar) {
        return new ResponseEntity<>(contentService.getDetails(id, contentType, includeSimilar), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ContentSummaryDto>> searchByName(@RequestParam String query) {
        return new ResponseEntity<>(contentService.searchByName(query), HttpStatus.OK);
    }
}
