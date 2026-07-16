package com.app.MyApp.user;

import com.app.MyApp.user.dtos.LoginDto;
import com.app.MyApp.user.dtos.RegisterDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody LoginDto userDto) {
        return new ResponseEntity<>(userService.login(userDto), HttpStatus.OK);
    }

    // ! Endpoint currently deactivated for development
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterDto userDto) {
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
    
}
