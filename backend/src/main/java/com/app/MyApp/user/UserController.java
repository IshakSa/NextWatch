package com.app.MyApp.user;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDto> login(@RequestBody LoginDto user) {
        return new ResponseEntity<>(userService.login(user), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterDto> register(@RequestBody RegisterDto user) {
        return new ResponseEntity<>(userService.register(user), HttpStatus.CREATED);
    }

    @GetMapping("/watchlist")
    public ResponseEntity<UserWatchlistDto> getWatchlist() {
        return new ResponseEntity<>(userService.getWatchlist(), HttpStatus.OK);
    }

}
