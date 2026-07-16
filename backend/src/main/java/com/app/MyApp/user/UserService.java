package com.app.MyApp.user;

import com.app.MyApp.user.dtos.LoginDto;
import com.app.MyApp.user.dtos.RegisterDto;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public Boolean register(RegisterDto userDto) {
        userRepository.save(userMapper.toUserEntity(userDto));
        return true;
    }

    public Boolean login(LoginDto userDto) {
        User user = userRepository.findByEmail(userDto.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getPassword().equals(userDto.password())) {
            return true;
        } else {
            throw new RuntimeException("Credentials wrong");

        }
    }

}
