package me.nextwatch.NextWatch.user;

import me.nextwatch.NextWatch.content.dtos.ContentSummaryDto;
import me.nextwatch.NextWatch.recommendation.RecommendationService;
import me.nextwatch.NextWatch.security.UserPrincipal;
import me.nextwatch.NextWatch.user.dtos.LoginDto;
import me.nextwatch.NextWatch.user.dtos.LoginResponseDto;
import me.nextwatch.NextWatch.user.dtos.RegisterDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final RecommendationService recommendationService;

    public UserController(UserService userService, RecommendationService recommendationService) {
        this.userService = userService;
        this.recommendationService = recommendationService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto userDto) {
        return new ResponseEntity<>(userService.login(userDto), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterDto userDto) {
        return new ResponseEntity<>(userService.register(userDto), HttpStatus.OK);
    }

    @GetMapping("/recommendations")
    public ResponseEntity<List<ContentSummaryDto>> getRecommendations(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") List<Integer> seenContentIds) {
        return new ResponseEntity<>(
                recommendationService.getUserRecommendations(currentUser.getId(), seenContentIds, limit),
                HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@AuthenticationPrincipal UserPrincipal currentUser) {
        userService.delete(currentUser.getId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
