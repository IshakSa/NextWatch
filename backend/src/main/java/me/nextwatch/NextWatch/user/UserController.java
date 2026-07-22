package me.nextwatch.NextWatch.user;

import me.nextwatch.NextWatch.content.dtos.ContentSummaryDto;
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

    public UserController(UserService userService) {
        this.userService = userService;
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
            @AuthenticationPrincipal UserPrincipal currentUser, @RequestParam(defaultValue = "10") int limit) {
        return new ResponseEntity<>(userService.getRecommendations(currentUser.getId(), limit), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@AuthenticationPrincipal UserPrincipal currentUser) {
        userService.delete(currentUser.getId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
