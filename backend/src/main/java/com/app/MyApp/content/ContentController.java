package com.app.MyApp.content;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/content")
public class ContentController {
    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/{contentType}/top-rated")
    public ResponseEntity<List<ContentSummaryDto>> getTopRated(@PathVariable ContentType contentType) {
        return new ResponseEntity<>(contentService.getTopRated(contentType), HttpStatus.OK);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<ContentSummaryDto>> getLatestReleases() {
        return new ResponseEntity<>(contentService.getLatestReleases(), HttpStatus.OK);
    }

    @GetMapping("/trending/{timeWindow}")
    public ResponseEntity<List<ContentSummaryDto>> getTrending(@PathVariable TimeWindow timeWindow) {
        return new ResponseEntity<>(contentService.getTrending(timeWindow), HttpStatus.OK);
    }

    @GetMapping("/{contentType}/{id}")
    public ResponseEntity<ContentDetailsDto> getDetails(@PathVariable ContentType contentType, @PathVariable Integer id,
            @RequestParam(defaultValue = "false") boolean includeSimilar) {
        return new ResponseEntity<>(contentService.getDetails(id, contentType, includeSimilar), HttpStatus.OK);
    }

}
