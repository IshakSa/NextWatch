package com.app.MyApp.user;

import com.app.MyApp.security.JwtService;
import com.app.MyApp.user.dtos.LoginDto;
import com.app.MyApp.user.dtos.LoginResponseDto;
import com.app.MyApp.user.dtos.RegisterDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public UserService(
            UserRepository userRepository,
            UserMapper userMapper,
            BCryptPasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public User register(RegisterDto userDto) {
        String hashedPassword = passwordEncoder.encode(userDto.password());
        User user = userMapper.toUserEntity(userDto, hashedPassword);

        userRepository.save(user);
        return user;
    }

    public LoginResponseDto login(LoginDto userDto) {
        UsernamePasswordAuthenticationToken loginToken =
                new UsernamePasswordAuthenticationToken(userDto.email(), userDto.password());

        Authentication authentication = authenticationManager.authenticate(loginToken);

        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(userDto.email(), "USER");
            return new LoginResponseDto(token, jwtService.getExpirationTime());
        } else {
            throw new BadCredentialsException("Invalid email or password");
        }
    }
}
